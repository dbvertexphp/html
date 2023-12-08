import {
  Box,
  Grid,
  GridItem,
  ButtonGroup,
  Button,
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
    <Stack
      gap={{ base: 4, md: 6 }}
      alignItems={"center"}
      direction={"column"}
      p="2"
    >
     
     
      <Center>
              <GridItem className="know_more_card_item">
                <Card maxW="sm" className="know_more_card">
                  <CardBody style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Image src={image} mb={2} width={"80px"} alt="user" />
                    <Stack textAlign="center">
                    
                    <Text  textAlign={"center"} color={"#656464"}>
        {description}
      </Text>
                      <Text color="#1097B1" font-weight="600">
          {author}, {`(${designation})`}
        </Text>
        <Text fontSize={"sm"} color={useColorModeValue("gray.400", "gray.400")}>
          {location}
        </Text>
                    </Stack>
                  </CardBody>
                 
                </Card>
              </GridItem>
            </Center>
    </Stack>
  );
}
