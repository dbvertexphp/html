import {
  Box,
  Grid,
  GridItem,
  ButtonGroup,
  Button,
  Flex,
  Heading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Center,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function TestemonialCard(props) {
  const { designation, image, author, description, location } = props;

  return (
    <Flex p="5" w="full"  justifyContent="center">
      <Box p="5" borderWidth="1px" rounded="lg" shadow="md" position="relative" >
      

      

        <Flex mt="3" fontSize="25" position="relative" marginTop="0px" justifyContent="center">
         
            <Image borderRadius="full" zIndex={0} maxHeight="80px" maxWidth="80px" src={image}  />
    
        </Flex>

        <Text textAlign={"center"} color={"#656464"}  overflow="hidden">
                  {description}
                </Text>
                <Text textAlign={"center"} color="#1097B1" fontWeight="600" maxH="20px" overflow="hidden">
                  {author}, ({designation})
                </Text>
                <Text textAlign={"center"} fontSize={"sm"} color={useColorModeValue("gray.400", "gray.400")} maxH="20px" overflow="hidden">
                  {location}
                </Text>
       
      
       
      </Box>
    </Flex>

   
  );
}