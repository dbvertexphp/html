import {
  Box,
  Center,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function TestemonialCard(props) {
  const { designation, image, author, description, location } = props;

  return (
    <Stack
      gap={{ base: 4, md: 6 }}
      alignItems={"center"}
      direction={"column"}
      p="2"
    >
      <Text fontSize={{ base: "md", md: "xl" }} textAlign={"center"}>
        {description}
      </Text>
      <Box textAlign={"center"}>
        <Center>
          <Image src={image} mb={2} width={"50px"} alt="user" />
        </Center>
        <Text fontWeight={600}>
          {author}, {`(${designation})`}
        </Text>
        <Text fontSize={"sm"} color={useColorModeValue("gray.400", "gray.400")}>
          {location}
        </Text>
      </Box>
    </Stack>
  );
}
