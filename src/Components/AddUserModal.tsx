import React, { useEffect, useState } from "react";
import {
  DialogRoot,
  DialogBackdrop,
  DialogPositioner,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogCloseTrigger,
  Grid,
  GridItem,
  Text,
  Input,
  Button,
  NativeSelect,
} from "@chakra-ui/react";

type AddUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddUserModal = ({ isOpen, onClose }: AddUserModalProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isPending, setIsPending] = useState(false);

  // Reset form whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setRole("");
    }
  }, [isOpen]);

  const emailRegex = /^[^\s@]+@[^\s@.]+\.[a-zA-Z]{2,}$/;
  const isEmailValid = emailRegex.test(email);

  const isFormValid =
    firstName.trim() &&
    lastName.trim() &&
    role.trim() &&
    email.trim() &&
    isEmailValid;

  // Mock save function
  const handleSave = () => {
    setIsPending(true);
    setTimeout(() => {
      alert(`User ${firstName} ${lastName} created successfully (mock)`);
      setIsPending(false);
      onClose();
    }, 1000); // simulate API delay
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose}>
      <DialogBackdrop />

      <DialogPositioner>
        <DialogContent borderRadius="12px" maxW="lg">
          <DialogHeader display="flex" flexDirection="column" alignItems="flex-start">
            <Text fontWeight={700} fontSize="22px">
              Add New User
            </Text>
            <Text fontSize="13px" fontWeight="400" color="gray.500">
              Enter user details
            </Text>
          </DialogHeader>

          <DialogCloseTrigger />

          <DialogBody>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <GridItem>
                <Text mb={2}>First Name</Text>
                <Input
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <Text mt={4} mb={2}>
                  Email Address
                </Text>
                <Input
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {email && !isEmailValid && (
                  <Text color="red.500" fontSize="12px" mt={1}>
                    Please enter a valid email address
                  </Text>
                )}
              </GridItem>

              <GridItem>
                <Text mb={2}>Last Name</Text>
                <Input
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />

                <Text mt={4} mb={2}>
                  Role
                </Text>
                <NativeSelect.Root>
                  <NativeSelect.Field
                    placeholder="Select role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="user">user</option>
                    <option value="bank_admin">bank_admin</option>
                    <option value="super_admin">super_admin</option>
                  </NativeSelect.Field>
                </NativeSelect.Root>
              </GridItem>
            </Grid>
          </DialogBody>

          <DialogFooter justifyContent="space-between">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <Button colorScheme="blue" disabled={!isFormValid} loading={isPending} onClick={handleSave}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
};

export default AddUserModal;