import {
  Stack,
  Heading,
  Text,
  Flex,
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
     <Flex
          my="5"
          align={"center"}
          justifyContent={"center"}
          gap={{ base: "5", md: "30" }}
          direction={{ base: "column", md: "row" }}
        >
          <Stack className="know_more_card" align={"center"}>
          <Image
                    borderRadius="full"
                    boxSize="150px"
                    src={image}
                    alt="Green double couch with wooden legs"
                   
                  />
                                <Heading size={["sm", "md"]} className="know_more_heading">
                      12-Month Warranty
                    </Heading>
                    <Text className="know_more_text fontcss">
                    We are a multi-channel auto platform with coverage and presence across vehicle types and value-added services                 
                       </Text>
                    <ButtonGroup spacing="2" padding="3">
                    <Button variant="solid" className="know_more_button">
                      Know more
                    </Button>
                  </ButtonGroup></Stack>
          <Stack className="know_more_card" align={"center"}>
          <Image
                    borderRadius="full"
                    boxSize="150px"
                    src={image2}
                    alt="Green double couch with wooden legs"
                   
                  />
           <Heading size={["sm", "md"]} className="know_more_heading">
                      2-Years Warranty
                    </Heading>
                    
                    <Text className="know_more_text fontcss">
                    Our platforms operate under several brands: CarWale, CarTrade, Shriram Automall, CarTradeExchange, Adroit Auto and AutoBiz   
                                     </Text>
                                     <ButtonGroup spacing="2" padding="3">
                    <Button variant="solid" className="know_more_button">
                      Know more
                    </Button>
                  </ButtonGroup>
          </Stack>
          <Stack className="know_more_card" align={"center"}>
          <Image
                    borderRadius="full"
                    boxSize="150px"
                    src={image3}
                    alt="Green double couch with wooden legs"
                    
                  />
           <Heading size={["sm", "md"]} className="know_more_heading">
                      6-Month Warranty
                    </Heading>
                    <Text className="know_more_text fontcss">
                      Enjoy peace of mind with our 12-month Warranty that is standard across all cars that we sell
                    </Text>
                    <ButtonGroup spacing="2" padding="3">
                    <Button variant="solid" className="know_more_button">
                      Know more
                    </Button>
                  </ButtonGroup>
          </Stack>
        </Flex>
   
    </>
  );
}

export default BuyCard;
