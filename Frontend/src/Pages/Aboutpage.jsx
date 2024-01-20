import {
  Avatar,
  Box,
  Center,
  Flex,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import banner from "../assets/banner.jpg";
import BrandSliderComponent from "../Components/WebsiteComponents/BrandSliderComponent";
import { useEffect } from "react";

export default function Aboutpage() {
  return (
    <>
      <Flex
        align={"center"}
        gap="2"
        mx={{ base: "5", md: "200px" }}
        justifyContent={"center"}
        mt="10"
      >
        <Text fontWeight={"700"} fontSize={"30"} whiteSpace="nowrap">
          Welcome to
        </Text>
        <Text
          fontWeight={"700"}
          fontSize={"30"}
          color="#30829c"
          whiteSpace="nowrap"
        >
          EasyGoCarz
        </Text>
      </Flex>
      <Text my="5" mb="10" mx={{ base: "5", md: "200px" }}>
        We are a multi-channel auto platform with coverage and presence across
        vehicle types and value-added services. Our platforms operate under
        several brands: CarWale, CarTrade, Shriram Automall, BikeWale,
        CarTradeExchange, Adroit Auto and AutoBiz. Through these platforms, we
        enable new and used automobile customers, vehicle dealerships, vehicle
        OEMs and other businesses to buy and sell their vehicles in a simple and
        efficient manner. Our vision is to create an automotive digital
        ecosystem which connects automobile customers, OEMs, dealers, banks,
        insurance companies and other stakeholders.
      </Text>

      <Box px={{ base: 5, md: "200px" }} my="5" mb="10">
        <Text
          fontWeight={"bold"}
          fontSize={"30"}
          whiteSpace="nowrap"
          textAlign={"center"}
        >
          Our Team
        </Text>
        <Flex
          my="5"
          align={"center"}
          justifyContent={"center"}
          gap={{ base: "5", md: "30" }}
          direction={{ base: "column", md: "row" }}
        >
          <Stack align={"center"}>
            <Avatar size="2xl" />
            <Text fontWeight={"bold"}>Neeti Kumar</Text>
            <Text>Frontend Developer</Text>
          </Stack>
          <Stack align={"center"}>
            <Avatar size="2xl" />
            <Text fontWeight={"bold"}>Ram Kumar</Text>
            <Text>Backend Developer</Text>
          </Stack>
          <Stack align={"center"}>
            <Avatar size="2xl" />
            <Text fontWeight={"bold"}>Third Kumar</Text>
            <Text>CEO</Text>
          </Stack>
        </Flex>
      </Box>
      <Box px={{ base: 5, md: "200px" }} my="5">
        <Text
          fontWeight={"bold"}
          fontSize={"30"}
          whiteSpace="nowrap"
          textAlign={"center"}
        >
          Brands We Deal
        </Text>
        <BrandSliderComponent />
      </Box>
    </>
  );
}
