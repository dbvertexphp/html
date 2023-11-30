import { Card, Grid, GridItem } from "@chakra-ui/react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <Grid templateColumns="repeat(4, 1fr)">
      <GridItem
        as="aside"
        colSpan={{ base: "4", md: "1" }}
        m="5"
        ml={{ md: "20" }}
      >
        <SideBar />
      </GridItem>
      <GridItem
        as="main"
        colSpan={{ base: "4", md: "3" }}
        m="5"
        mr={{ md: "20" }}
      >
        <Outlet />
      </GridItem>
    </Grid>
  );
}
