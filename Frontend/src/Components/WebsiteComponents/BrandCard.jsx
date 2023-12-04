import { Flex, Box, Image, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function BrandCard(props) {
  const { name, imageURL } = props;

  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      <Box
        maxW="sm"
        position="relative"
        textAlign="center"
        p="2"
      >
        <Image
          src={imageURL}
          w="150px"
          h={"150px"}
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
