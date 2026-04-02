import React from "react";
import { Text, Table as ChakraTable } from "@chakra-ui/react";
interface  CustomHeaderProps {
  headers: string[];
}
export const CustomHeader = ({ headers }: CustomHeaderProps) => {
  return (
    <ChakraTable.Header>
      <ChakraTable.Row bg="#F8F9FF">
        {headers.map((head) => (
          <ChakraTable.ColumnHeader key={head}>
            <Text fontSize="13px" color="gray.600">
              {head}
            </Text>
          </ChakraTable.ColumnHeader>
        ))}
      </ChakraTable.Row>
    </ChakraTable.Header>
  );
};
