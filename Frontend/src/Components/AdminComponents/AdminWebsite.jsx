import {
  Container,
  Text,
  Flex,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useColorModeValue,
} from "@chakra-ui/react";

import HompageBanner from "./WebsiteTabs/HomepageBanner";
import TestimonialSection from "./WebsiteTabs/TestimonialSection";
import BrandSection from "./WebsiteTabs/BrandSection";

import React, { useState } from "react";

const AdminWebsite = () => {
  const colors = useColorModeValue(
    ["blue.50", "teal.50", "blue.50", "purple.50"],
    ["blue.900", "teal.900", "blue.900", "purple.50"]
  );
  const [tabIndex, setTabIndex] = useState(0);
  const bg = colors[tabIndex];
  return (
    <Container
      maxW="container"
      borderRadius="5px"
      minH={"610px"}
      padding={"20px"}
      backgroundColor={"white"}
    >
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Text
          mb="2"
          p={"10px"}
          fontWeight={"500"}
          fontSize={{ base: "1.3rem", md: "2rem" }}
        >
          Website Management
        </Text>
        <Flex gap={2}></Flex>
      </Flex>
      <Box width={"full"}>
        <Tabs onChange={(index) => setTabIndex(index)}>
          <TabList>
            <Tab>Homepage Banner</Tab>
            <Tab>Brands</Tab>
            <Tab>Testimonials</Tab>
          </TabList>
          <TabPanels py="1rem">
            <TabPanel bg={bg}>
              <HompageBanner />
            </TabPanel>
            <TabPanel bg={bg}>
              <BrandSection />
            </TabPanel>
            <TabPanel bg={colors[2]}>
              <TestimonialSection />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default AdminWebsite;
