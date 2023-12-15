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
    <Stack gap={{ base: 4, md: 6 }} alignItems={"center"} direction={"column"} p="2">
      <Center>
        <GridItem className="know_more_card_item">
          <Card
            maxW="sm"
            maxH="300px" // Set your desired max height for the entire card
            className="know_more_card"
            border="1px solid #e1e1e1" // Set border color
            boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)" // Set box shadow
          >
            <CardBody
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxH: '100%', // Set your desired max height for the card body content
                overflow: 'hidden', // Hide any content that exceeds the max height
              }}
            >
              <Image src={image} mb={2} width={"80px"} alt="user" />
              <Stack textAlign="center">
                <Text textAlign={"center"} color={"#656464"} maxH="50px" overflow="hidden">
                  {description}
                </Text>
                <Text color="#1097B1" fontWeight="600" maxH="20px" overflow="hidden">
                  {author}, ({designation})
                </Text>
                <Text fontSize={"sm"} color={useColorModeValue("gray.400", "gray.400")} maxH="20px" overflow="hidden">
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