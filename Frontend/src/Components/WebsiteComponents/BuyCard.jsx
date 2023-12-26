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
import image from '../../assets/Icons/buy2.png';
import image2 from '../../assets/Icons/Rectangle.png';
import image3 from '../../assets/Icons/image 1840.png';
function BuyCard(props) {
  const { name, price, imageURL, year, km, fuel, state, _id, booking_status,Car_id } = props;

  return (
    <>
      <Container maxW="xxl" marginTop={"100px"}>
      <SimpleGrid minChildWidth={['100%', '120px']} spacing={['20px', '40px']}>
          <Center>
            <GridItem className="know_more_card_item">
              <Card maxW="sm" className="know_more_card">
              <CardBody style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0' }}>
                  <Image
                    borderRadius="full"
                    boxSize="150px"
                    src={image}
                    alt="Green double couch with wooden legs"
                    style={{ margin: '-40% 0 5%' }} // Adjust the margin to control the image position
                  />
                 <Stack textAlign="center" spacing={4}>
                    <Heading size={["sm", "md"]} className="know_more_heading">
                      12-Month Warranty
                    </Heading>
                    <Text className="know_more_text">
                    We are a multi-channel auto platform with coverage and presence across vehicle types and value-added services                    </Text>
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
              <CardBody style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0' }}>
                  <Image
                    borderRadius="full"
                    boxSize="150px"
                    src={image2}
                    alt="Green double couch with wooden legs"
                    style={{ margin: '-40% 0 5%' }} // Adjust the margin to control the image position
                  />
            <Stack textAlign="center" spacing={4}>
                    
                    <Heading size={["sm", "md"]} className="know_more_heading">
                      2-Years Warranty
                    </Heading>
                    
                    <Text className="know_more_text">
                    Our platforms operate under several brands: CarWale, CarTrade, Shriram Automall, CarTradeExchange, Adroit Auto and AutoBiz                    </Text>
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
              <CardBody style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0' }}>
                  <Image
                    borderRadius="full"
                    boxSize="150px"
                    src={image3}
                    alt="Green double couch with wooden legs"
                    style={{ margin: '-40% 0 5%' }} // Adjust the margin to control the image position
                  />
                <Stack textAlign="center" spacing={4}>
                    <Heading size={["sm", "md"]} className="know_more_heading">
                      6-Month Warranty
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
