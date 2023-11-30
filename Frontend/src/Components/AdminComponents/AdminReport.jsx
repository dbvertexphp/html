import {
  Container,
  Button,
  Text,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import React from "react";
import AdminTransactions from "./AdminTransactions";

const AdminSupport = () => {
  return (
    <Container
      maxW="container"
      borderRadius="5px"
      minH={"610px"}
      padding={"20px"}
      backgroundColor={"white"}
    >
      <Tabs
        position="relative"
        variant="enclosed"
        colorScheme="blue"
        background={"white"}
        p="2"
        borderRadius="5px"
      >
        <TabList></TabList>

        <TabPanels>
          <TabPanel p={0}>
            <AdminTransactions />
          </TabPanel>
          <TabPanel p={0}>
            <Report />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default AdminSupport;
