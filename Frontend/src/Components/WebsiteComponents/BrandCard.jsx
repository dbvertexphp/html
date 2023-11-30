import { Flex, Box, Image, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function BrandCard(props) {
  const { name, imageURL } = props;

  return (
    <Flex p="3" w="full" alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        textAlign="center"
        p="5"
      >
        <Image
          src={imageURL}
          roundedTop="lg"
          w="250px"
          h={"250px"}
          objectFit={"contain"}
          objectPosition={"center"}
        />

        <Box fontSize="18" fontWeight="semibold" lineHeight="tight" isTruncated>
          {name}
        </Box>
      </Box>
    </Flex>
  );
}

export default BrandCard;
