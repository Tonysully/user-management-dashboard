import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Input,
  HStack,
  Icon,
  useDisclosure,
  Image,
  Skeleton,
} from "@chakra-ui/react";
import { Table } from "@chakra-ui/react";
import { FiSearch, FiMoreVertical } from "react-icons/fi";
import TabButton from "./Components/TabButton";
import SummaryCard from "./Components/SummaryCard";
import StatusBadge from "./Components/StatusBadge";
import AdminUserRow from "./Components/AdminUserRow";
import AddUserModal from "./Components/AddUserModal";
import { CustomHeader } from "./Components/TableHeader";

import { mockSummary, mockBanks, mockBankAdmins, mockIswAdmins } from "./MockData/mockData";
import { IBank, IUser } from "./Types/usermanagementTypes";

const pageSize = 10;

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState<
    "banks" | "bankAdmin" | "iswAdmin"
  >("banks");
  const { open, onOpen, onClose } = useDisclosure();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [summary, setSummary] = useState<{
    users: number;
    bankAdmin: number;
    superAdmin: number;
  } | null>(null);

  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [bankCount, setBankCount] = useState<number>(0);
  const [banks, setBanks] = useState<IBank[]>([]);
  const [banksLoading, setBanksLoading] = useState(false);

  const isLoading = false;
  const isError = false;

  // Get users based on active tab
  const allUsers: IUser[] = activeTab === "bankAdmin" ? mockBankAdmins : mockIswAdmins;

  // Filter users based on debounced search
  const filteredUsers = allUsers.filter((user) =>
    `${user.firstName} ${user.lastName} ${user.email}`
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase())
  );

  // Filter banks based on debounced search
  const filteredBanks = banks.filter((bank) =>
    `${bank.name} ${bank.code} ${bank.address}`
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase())
  );

  // Paginate based on active tab
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const paginatedBanks = filteredBanks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Calculate totals based on active tab
  const totalElements = activeTab === "banks" ? filteredBanks.length : filteredUsers.length;
  const totalPages = Math.ceil(totalElements / pageSize) || 1;

  const startItem = totalElements === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalElements);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleTabChange = (tab: "banks" | "bankAdmin" | "iswAdmin") => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSearchTerm("");
    setDebouncedSearch("");
  };

  // Debounce effect for search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const renderSkeletonRows = () => {
    const columnCount = activeTab === "banks" ? 8 : 6;
    return Array.from({ length: 8 }).map((_, rowIdx) => (
      <Table.Row key={rowIdx}>
        {Array.from({ length: columnCount }).map((__, cellIdx) => (
          <Table.Cell key={cellIdx}>
            <Skeleton height="16px" />
          </Table.Cell>
        ))}
      </Table.Row>
    ));
  };

  const renderBankRows = () =>
    paginatedBanks.map((bank) => {
      const admin = bank.bankAdmins?.[0];

      return (
        <Table.Row key={bank.id}>
          <Table.Cell>
            {bank.image ? (
              <Image
                src={`data:image/jpeg;base64,${bank.image}`}
                alt={bank.name}
                boxSize="40px"
                borderRadius="md"
              />
            ) : (
              <Box
                bg="purple.600"
                color="white"
                px={3}
                py={2}
                borderRadius="md"
                fontSize="xs"
                fontWeight="bold"
              >
                {bank.name?.charAt(0)}
              </Box>
            )}
          </Table.Cell>

          <Table.Cell>{bank.name}</Table.Cell>

          <Table.Cell>{bank.code}</Table.Cell>

          <Table.Cell>{bank.address}</Table.Cell>

          <Table.Cell>
            {admin ? `${admin.firstName} ${admin.lastName}` : "N/A"}
          </Table.Cell>

          <Table.Cell>
            <StatusBadge isActive={bank.isActive} />
          </Table.Cell>

          <Table.Cell>
            <Icon as={FiMoreVertical} cursor="pointer" />
          </Table.Cell>
        </Table.Row>
      );
    });

  const renderTableRows = () => {
    if (
      (activeTab === "banks" && banksLoading) ||
      (!banks && activeTab === "banks")
    ) {
      return renderSkeletonRows();
    }

    if (activeTab === "banks") {
      if (paginatedBanks.length === 0)
        return (
          <tr>
            <td colSpan={8}>No banks found</td>
          </tr>
        );
      return renderBankRows();
    }

    // For user tabs
    if (banksLoading) return renderSkeletonRows();
    if (paginatedUsers.length === 0) {
      return (
        <tr>
          <td colSpan={6}>No users found</td>
        </tr>
      );
    }

    return paginatedUsers.map((user) => (
      <AdminUserRow key={user.id} user={user} />
    ));
  };

  const tableHeaders =
    activeTab === "banks"
      ? [
          "Bank Logo",
          "Bank Name",
          "Bank ID",
          "Address",
          "Date Created",
          "Bank Super Admin",
          "Status",
          "",
        ]
      : ["Name", "Role", "Email Address", "Date Created", "Status", ""];

  // Load initial data
  useEffect(() => {
    setIsSummaryLoading(true);
    setBanksLoading(true);

    setTimeout(() => {
      setSummary(mockSummary);
      setBankCount(mockBanks.length);
      setBanks(mockBanks);
      setIsSummaryLoading(false);
      setBanksLoading(false);
    }, 800);
  }, []);

  return (
    <Box bg="white">
      <Box
        borderColor="gray.200"
        px={6}
        py={4}
        borderBottom="1px solid #E2E8F0"
      >
        <Heading fontSize="23px" fontWeight="700" color="#4B4B4B">
          User Management
        </Heading>
      </Box>
      <Box bg="#F7F9FB" p={6} pb={10} minH="calc(100vh - 70px)" overflowY="auto">
        <Box bg="white" borderRadius="md" p={6} mb={6} shadow="sm">
          <Flex gap={6}>
            <SummaryCard
              title="Created Banks"
              value={bankCount}
              isLoading={isSummaryLoading}
            />

            <SummaryCard
              title="Bank Admin User"
              value={summary?.bankAdmin}
              isLoading={isSummaryLoading}
            />

            <SummaryCard
              title="ISW Admin User"
              value={summary?.superAdmin}
              isLoading={isSummaryLoading}
            />
          </Flex>
        </Box>

        <Flex justify="space-between" align="center" mb={4}>
          <HStack gap={0}>
            <TabButton
              active={activeTab === "banks"}
              onClick={() => handleTabChange("banks")}
              isFirst
            >
              Banks
            </TabButton>
            <TabButton
              active={activeTab === "bankAdmin"}
              onClick={() => handleTabChange("bankAdmin")}
            >
              Bank Admin
            </TabButton>
            <TabButton
              active={activeTab === "iswAdmin"}
              onClick={() => handleTabChange("iswAdmin")}
              isLast
            >
              ISW Admin
            </TabButton>
          </HStack>

          <HStack>
            <Flex position="relative" width="250px">
              <Icon
                as={FiSearch}
                position="absolute"
                left="12px"
                top="50%"
                transform="translateY(-50%)"
                color="gray.400"
                zIndex="1"
              />
              <Input
                placeholder="Search"
                borderRadius="full"
                bg="white"
                pl="40px"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Flex>

            {activeTab === "banks" && (
              <Button
                bg="#0275D8"
                color="white"
                borderRadius="15px"
                fontSize="14px"
                fontWeight="600px"
              >
                New Bank
              </Button>
            )}

            {activeTab === "iswAdmin" && (
              <Button
                bg="#0275D8"
                color="white"
                borderRadius="15px"
                fontSize="14px"
                fontWeight="600"
                onClick={onOpen}
              >
                Create User
              </Button>
            )}
          </HStack>
        </Flex>

        <Box bg="white" borderRadius="lg" shadow="sm" p={4}>
          <Table.Root size="sm" variant="outline">
            {isError ? (
              <Text color="red.500">Error fetching users</Text>
            ) : (
              <>
                <CustomHeader headers={tableHeaders} />
                <Table.Body>{renderTableRows()}</Table.Body>
              </>
            )}
          </Table.Root>
          <Flex justify="space-between" align="center" mt={4} p={2}>
            <Text fontSize="sm" color="gray.600">
              Showing {startItem}–{endItem} of {totalElements} {activeTab === "banks" ? "banks" : "users"}
            </Text>
            <HStack>
              <Button
                size="sm"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Text>
                Page {currentPage} of {totalPages}
              </Text>
              <Button
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </HStack>
          </Flex>
        </Box>

        <AddUserModal isOpen={open} onClose={onClose} />
      </Box>
    </Box>
  );
};

export default UserManagement;
