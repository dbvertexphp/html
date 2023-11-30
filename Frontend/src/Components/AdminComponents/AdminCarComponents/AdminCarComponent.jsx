import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import BodyTypeTable from "./BodyType/BodyTypeTable";
import CarModelTable from "./CarModel/CarModelTable";
import MakeTable from "./Make/MakeTable";
import ColorTable from "./Color/ColorTable";
import LocationTable from "./Location/LocationTable";
import CarNameTable from "./CarName/CarNameTable";

const AdminCarComponent = () => {
  return (
    <Container
      maxW="container"
      borderRadius="5px"
      minH={"610px"}
      backgroundColor={"white"}
    >
      <Tabs
        position="relative"
        variant="enclosed"
        colorScheme="blue"
        background={"white"}
        py="5"
        borderRadius="5px"
        isLazy
      >
        <TabList overflowX="auto" whiteSpace="nowrap">
          <Tab>Brands</Tab>
          <Tab>Car Name</Tab>
          <Tab>Car Model</Tab>
          <Tab>Body Type</Tab>
          <Tab>Colors</Tab>
          <Tab>Location</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <MakeTable />
          </TabPanel>
          <TabPanel>
            <CarNameTable />
          </TabPanel>
          <TabPanel>
            <CarModelTable />
          </TabPanel>
          <TabPanel>
            <BodyTypeTable />
          </TabPanel>
          <TabPanel>
            <ColorTable />
          </TabPanel>
          <TabPanel>
            <LocationTable />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default AdminCarComponent;
