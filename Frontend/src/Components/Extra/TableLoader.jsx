import { Spinner, Td, Tr } from "@chakra-ui/react";
import React from "react";

const TableLoader = () => {
  return (
    <Tr>
      <Td colSpan={"12"}>
        <center>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.50"
            color="black.100"
            size="xl"
          />
        </center>
      </Td>
    </Tr>
  );
};

export default TableLoader;
