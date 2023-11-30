import { Outlet } from "react-router-dom";
import { Card } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";

export default function WebsiteLayout() {
  return (
    <>
      <Header />
      <Card borderRadius="0">
        <Outlet />
      </Card>
      <Footer />
    </>
  );
}
