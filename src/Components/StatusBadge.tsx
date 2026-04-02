import React from "react";
import { Box, Badge, HStack } from "@chakra-ui/react";

type StatusBadgeProps = {
  isActive: boolean;
};

const StatusBadge = ({ isActive }: StatusBadgeProps) => (
  <HStack gap={2}>
    <Box
      w="8px"
      h="8px"
      borderRadius="full"
      bg={isActive ? "green.500" : "red.500"}
    />
    <Badge colorScheme={isActive ? "green" : "red"} borderRadius="full">
      {isActive ? "Active" : "Inactive"}
    </Badge>
  </HStack>
);

export default StatusBadge;