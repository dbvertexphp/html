import { Td, Text, Tr } from "@chakra-ui/react";
import React from "react";

const NoTableDataFound = ({ elem }) => {
  return (
    <Tr>
      <Td colSpan={"20"}>
        <center>
          <Text>No {elem} Found</Text>
        </center>
      </Td>
    </Tr>
  );
};

export default NoTableDataFound;
