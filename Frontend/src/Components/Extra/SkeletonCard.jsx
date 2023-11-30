import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";
import React from "react";

const SkeletonCard = () => {
  return (
    <Box as="div" p="5" borderRadius={"10px"} boxShadow="lg" bg="white" m={5}>
      <Skeleton bg="white" h="250px" />
      <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="2" />
    </Box>
  );
};

export default SkeletonCard;
