import React from "react";
import { Box, Flex, Text, Skeleton } from "@chakra-ui/react";

type SummaryCardProps = {
  title: string;
  value?: number;
  isLoading?: boolean;
};

const SummaryCard = ({ title, value, isLoading }: SummaryCardProps) => {
  return (
     <Skeleton loading={isLoading}  flex="1" borderRadius="lg">
    <Flex
      bg="#F2F5F8"
      p={5}
      borderRadius="lg"
      shadow="sm"
      justify="space-between"
      align="center"
    >
      <Box>
        <Text fontSize="16px" color="black" fontWeight="600">
          {title}
        </Text>

       
        <Text fontSize="xs" color="gray.400" mt={3}>
          Total Number
        </Text>

        <Text fontSize="2xl" fontWeight="bold" >
          {value || "N/A"}
        </Text>
      </Box>

      <Box
        bg="blue.50"
        p={3}
        borderRadius="md"
        fontSize="lg"
        fontWeight="bold"
      >
        🏦
      </Box>
    </Flex>
    </Skeleton>
  );
};

export default SummaryCard;

