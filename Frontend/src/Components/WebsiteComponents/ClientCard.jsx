import {
    Stack,
    Heading,
    Text,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    ButtonGroup,
    Button,
    Image,
    Grid,
    GridItem,
    Container,
    Center,
    SimpleGrid
  } from '@chakra-ui/react';
  import { Divider } from '@chakra-ui/react';
  import { FaRegHeart } from 'react-icons/fa';
  import { Link, NavLink } from 'react-router-dom';
  import IndianNumberSystem from '../../utils/IndianNumSystem';
  
  function BuyCard(props) {
    const { name, price, imageURL, year, km, fuel, state, _id, booking_status } = props;
  
    return (
      <>
        <Container maxW="xxl" marginTop={"100px"}>
        <SimpleGrid minChildWidth='120px' spacing='40px'>
            <Center>
              <GridItem className="know_more_card_item">
                <Card maxW="sm" className="know_more_card">
                  <CardBody style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Image
                      borderRadius="full"
                      boxSize="200px"
                      src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                      alt="Green double couch with wooden legs"
                      style={{ margin: '-40% 0 5%' }} // Adjust the margin to control the image position
                    />
                    <Stack textAlign="center">
                      <Heading size="md" className="know_more_heading">
                        12-Month Warranty
                      </Heading>
                      <Text className="know_more_text">
                        Enjoy peace of mind with our 12-month Warranty that is standard across all cars that we sell
                      </Text>
                    </Stack>
                  </CardBody>
                  <CardFooter justifyContent={'center'}>
                    <ButtonGroup spacing="2">
                      <Button variant="solid" className="know_more_button">
                        Know more
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              </GridItem>
            </Center>
  
            <Center>
              <GridItem className="know_more_card_item">
                <Card maxW="sm" className="know_more_card">
                  <CardBody style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Image
                      borderRadius="full"
                      boxSize="200px"
                      src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                      alt="Green double couch with wooden legs"
                      style={{ margin: '-40% 0 5%' }} // Adjust the margin to control the image position
                    />
                    <Stack textAlign="center">
                      <Heading size="md" className="know_more_heading">
                        12-Month Warranty
                      </Heading>
                      <Text className="know_more_text">
                        Enjoy peace of mind with our 12-month Warranty that is standard across all cars that we sell
                      </Text>
                    </Stack>
                  </CardBody>
                  <CardFooter justifyContent={'center'}>
                    <ButtonGroup spacing="2">
                      <Button variant="solid" className="know_more_button">
                        Know more
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              </GridItem>
            </Center>
  
            <Center>
              <GridItem className="know_more_card_item">
                <Card maxW="sm" className="know_more_card">
                  <CardBody style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Image
                      borderRadius="full"
                      boxSize="200px"
                      src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                      alt="Green double couch with wooden legs"
                      style={{ margin: '-40% 0 5%' }} // Adjust the margin to control the image position
                    />
                    <Stack textAlign="center">
                      <Heading size="md" className="know_more_heading">
                        12-Month Warranty
                      </Heading>
                      <Text className="know_more_text">
                        Enjoy peace of mind with our 12-month Warranty that is standard across all cars that we sell
                      </Text>
                    </Stack>
                  </CardBody>
                  <CardFooter justifyContent={'center'}>
                    <ButtonGroup spacing="2">
                      <Button variant="solid" className="know_more_button">
                        Know more
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              </GridItem>
            </Center>
          </SimpleGrid>
        </Container>
      </>
    );
  }
  
  export default BuyCard;
  