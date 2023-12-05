import { Flex,Heading, Box, Image, useColorModeValue, Center, Stack, Text, Divider, Button } from '@chakra-ui/react';
import { FaRegHeart } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import IndianNumberSystem from '../../utils/IndianNumSystem';

function BuyCard(props) {
  const { name, price, imageURL, year, km, fuel, state, _id, booking_status } = props;

  return (
    <>
    <Flex p="3" w="full" alignItems="center" justifyContent="center" position="relative">
      {/* First Set of Cards */}
      <Image
        zIndex={1}
        position="absolute"
        top="-70px"
        left="240px"
        src="/src/assets/Icons/buy2.png"
        borderRadius="full"
        boxSize="160px"
        bg="white"
      />
      <Box borderWidth="1px" rounded="lg" shadow="md" bg="#EAEAEA" maxW="400px" width="100%" p="5" textAlign="center" ml="130"> {/* Added margin */}
        <Text className="home_page_buy_heading" fontSize="xl" fontWeight="bold">
          12-Month Warranty
        </Text>
        <Text>
          Enjoy peace of mind with our 12-month warranty that is standard across all cars that we sell.
        </Text>
        <Flex justifyContent="center" mt="4">
          <NavLink to={`/product/${_id}`}>
            <Button colorScheme="teal" size="lg">
              Know More
            </Button>
          </NavLink>
        </Flex>
      </Box>
  
      {/* Second Set of Cards */}
      <Image
        zIndex={1}
        position="absolute"
        top="-70px"
        right="750px"
        src="/src/assets/Icons/buy2.png"
        borderRadius="full"
        boxSize="160px"
        bg="white"
      />
      <Box borderWidth="1px" rounded="lg" shadow="md" bg="#EAEAEA" maxW="400px" width="100%" p="5" textAlign="center" ml="180"> {/* Added margin */}
        <Text className="home_page_buy_heading" fontSize="xl" fontWeight="bold">
          12-Month Warranty
        </Text>
        <Text>
          Enjoy peace of mind with our 12-month warranty that is standard across all cars that we sell.
        </Text>
        <Flex justifyContent="center" mt="4">
          <NavLink to={`/product/${_id}`}>
            <Button colorScheme="teal" size="lg">
              Know More
            </Button>
          </NavLink>
        </Flex>
      </Box>
  
      {/* Third Set of Cards */}
      <Image
        zIndex={1}
        position="absolute"
        top="-70px"
        right="130px"
        src="/src/assets/Icons/buy2.png"
        borderRadius="full"
        boxSize="160px"
        bg="white"
      />
      <Box borderWidth="1px" rounded="lg" shadow="md" bg="#EAEAEA" maxW="400px" width="100%" p="5" textAlign="center" ml="200"> {/* Added margin */}
        <Text className="home_page_buy_heading" fontSize="xl" fontWeight="bold">
          12-Month Warranty
        </Text>
        <Text>
          Enjoy peace of mind with our 12-month warranty that is standard across all cars that we sell.
        </Text>
        <Flex justifyContent="center" mt="4">
          <NavLink to={`/product/${_id}`}>
            <Button colorScheme="teal" size="lg">
              Know More
            </Button>
          </NavLink>
        </Flex>
      </Box>
    </Flex>
  </>
  );
}

export default BuyCard;
