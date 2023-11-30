import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import TestemonialComponent from "./TestemonialComponent";

export default function Testemonials() {
  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={"space-around"}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Box w={{ md: "50%" }} p="5">
          <Text color={"blue.500"} fontSize={"18"}>
            We Went An Extra Mile For Them!
          </Text>
          <Heading size="lg" my="3">
            What Our Users Say About Us
          </Heading>
        </Box>
        <Box
          w={{ md: "50%", base: "100%" }}
          border="2px solid skyblue"
          borderRadius="10px"
          borderTopLeftRadius="30px"
          borderBottomEndRadius={"30px"}
          p="5"
        >
          <TestemonialComponent />
        </Box>
      </Flex>
    </>
  );
}
