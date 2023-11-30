import {
  Flex,
  Box,
  Image,
  useColorModeValue,
  Center,
  Stack,
  Text,
  Divider,
} from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import IndianNumberSystem from "../../utils/IndianNumSystem";

function ItemCard(props) {
  const { name, price, imageURL, year, km, fuel, state, _id, booking_status } =
    props;

  return (
    <Flex p="3" w="full" alignItems="center" justifyContent="center">
      <NavLink to={`/product/${_id}`}>
        <Box
          borderWidth="1px"
          rounded="lg"
          shadow="md"
          position="relative"
          bg="gray.50"
        >
          {booking_status == "booked" && (
            <Box
              right={"0px"}
              top={"15px"}
              position={"absolute"}
              bg={"orange.600"}
              py="1"
              pl="4"
              pr="1"
              fontSize={"13"}
              color={"white"}
              borderStartRadius={"20px"}
            >
              BOOKED
            </Box>
          )}

          {booking_status == "sold" && (
            <Box
              right={"0px"}
              top={"15px"}
              position={"absolute"}
              bg={"red.600"}
              py="1"
              pl="4"
              pr="1"
              fontSize={"13"}
              textAlign={"center"}
              color={"white"}
              borderStartRadius={"20px"}
            >
              SOLD
            </Box>
          )}

          <Image
            zIndex={0}
            src={imageURL}
            roundedTop="lg"
            roundedBottom="lg"
            w="400px"
            objectFit="cover"
            h={"250px"}
            maxW={"full"}
          />

          <Box p="5">
            <Box
              fontSize="20"
              fontWeight="semibold"
              lineHeight="tight"
              isTruncated
            >
              {name}
            </Box>

            <Box fontSize="18" color={useColorModeValue("gray.800", "white")}>
              <Box as="span" color={"gray.600"} fontSize="md">
                INR{" "}
              </Box>
              {IndianNumberSystem(price)}
            </Box>
          </Box>
          <Flex justify={"space-evenly"} gap="1" mb="10" mx="5" fontSize={14}>
            <Stack>
              <Text textAlign={"center"} textTransform="uppercase">
                REG. YEAR
              </Text>
              <Text
                textAlign={"center"}
                textTransform="uppercase"
                fontWeight={"bold"}
              >
                {year.split("-")[0]}
              </Text>
            </Stack>
            <Center height="60px">
              <Divider
                mx="1"
                orientation="vertical"
                border={"1px solid gray"}
              />
            </Center>
            <Stack>
              <Text textAlign={"center"} textTransform="uppercase">
                KILOMETERS
              </Text>
              <Text
                textAlign={"center"}
                textTransform="uppercase"
                fontWeight={"bold"}
              >
                {km}
              </Text>
            </Stack>
            <Center height="60px">
              <Divider
                mx="1"
                orientation="vertical"
                border={"1px solid gray"}
              />
            </Center>
            <Stack>
              <Text textAlign={"center"} textTransform="uppercase">
                FUEL TYPE
              </Text>
              <Text
                textAlign={"center"}
                textTransform="uppercase"
                fontWeight={"bold"}
              >
                {fuel}
              </Text>
            </Stack>
            <Center height="60px">
              <Divider
                mx="1"
                orientation="vertical"
                border={"1px solid gray"}
              />
            </Center>
            <Stack>
              <Text textAlign={"center"} textTransform="uppercase">
                REG. STATE
              </Text>
              <Text
                textAlign={"center"}
                textTransform="uppercase"
                fontWeight={"bold"}
              >
                {state}
              </Text>
            </Stack>
          </Flex>
        </Box>
      </NavLink>
    </Flex>
  );
}

export default ItemCard;
