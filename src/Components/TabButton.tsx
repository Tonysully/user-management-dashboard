import React from "react";
import { Button } from "@chakra-ui/react";

type TabButtonProps = {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
   isFirst?: boolean;
  isLast?: boolean;
};

const TabButton = ({ children, active, onClick ,isFirst,
  isLast, }: TabButtonProps) => {
  return (
    <Button
      fontSize="15px"
      fontWeight="400px"
      border="1px solid"
      borderColor={active ? "#0172CB" : "#7F91A8"}
      onClick={onClick} 
      bg={active ? "#d4e5f5" : "white"}
      color={active ? "#096DD9" : "#7F91A8"}
      _hover={{ bg: active ? "#c0dbf7" : "#d4e5f5" }}

       borderRadius="0"
      borderLeftRadius={isFirst ? "6px" : "0"}
      borderRightRadius={isLast ? "6px" : "0"}
      ml="-1px"  
    >
      {children}
    </Button>
  );
};

export default TabButton;
