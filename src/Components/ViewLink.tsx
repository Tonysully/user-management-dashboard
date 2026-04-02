import React from "react";
import { Text } from "@chakra-ui/react";

const ViewLink = () => (
  <Text
    color="#0275D8"
    fontWeight="500"
    cursor="pointer"
    _hover={{ textDecoration: "underline" }}
  >
    View
  </Text>
);

export default ViewLink;