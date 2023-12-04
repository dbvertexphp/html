import { Flex, Box, Image, useColorModeValue, Center, Stack, Text, Divider, Button } from '@chakra-ui/react';
import { FaRegHeart } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import IndianNumberSystem from '../../utils/IndianNumSystem';

function ItemCard(props) {
  const { name, price, imageURL, year, km, fuel, state, _id, booking_status } = props;

  return (
    <Flex p="3" w="full" alignItems="center" justifyContent="center">
        <Box borderWidth="1px" rounded="lg" shadow="md" position="relative" bg="gray.50">
          {booking_status == 'booked' && (
            <Box
              right={'0px'}
              top={'15px'}
              position={'absolute'}
              bg={'orange.600'}
              py="1"
              pl="4"
              pr="1"
              fontSize={'13'}
              color={'white'}
              borderStartRadius={'20px'}
            >
              BOOKED
            </Box>
          )}

          {booking_status == 'sold' && (
            <Box
              right={'0px'}
              top={'15px'}
              position={'absolute'}
              bg={'red.600'}
              py="1"
              pl="4"
              pr="1"
              fontSize={'13'}
              textAlign={'center'}
              color={'white'}
              borderStartRadius={'20px'}
            >
              SOLD
            </Box>
          )}
         
       


          <Flex mt="2" fontSize="25" position="relative" marginTop="0px">
          <Image zIndex={0} src={imageURL} roundedTop="lg" roundedBottom="lg" w="400px" objectFit="cover" h={'265px'} maxW={'full'} />
          <Box
            position="absolute"
            top="10px" // Adjust this value as needed
            right="10px" // Adjust this value as needed
            color={"white"}
          >
            <FaRegHeart />
          </Box>
        </Flex>

          <Box p="5">
            <Box className="home_page_car_name" fontSize="20" fontWeight="semibold" lineHeight="tight" isTruncated>
              {name}
            </Box>

            <Box fontSize="18" className="home_page_car_price">
              <Box as="span" fontSize="md">
                INR{' '}
              </Box>
              {IndianNumberSystem(price)}
            </Box>
          </Box>
          <Flex justify={'space-evenly'} gap="1" mb="10" mx="5" fontSize={14} className="home_page_car_details">
            <Stack>
              <Text textAlign={'center'} textTransform="uppercase">
                REG. YEAR
              </Text>
              <Text textAlign={'center'} textTransform="uppercase" fontWeight={'bold'}>
                {year.split('-')[0]}
              </Text>
            </Stack>
            <Center height="60px">
              <Divider mx="1" orientation="vertical" border={'1px solid gray'} />
            </Center>
            <Stack>
              <Text textAlign={'center'} textTransform="uppercase">
                KILOMETERS
              </Text>
              <Text textAlign={'center'} textTransform="uppercase" fontWeight={'bold'}>
                {km}
              </Text>
            </Stack>
            <Center height="60px">
              <Divider mx="1" orientation="vertical" border={'1px solid gray'} />
            </Center>
            <Stack>
              <Text textAlign={'center'} textTransform="uppercase">
                FUEL TYPE
              </Text>
              <Text textAlign={'center'} textTransform="uppercase" fontWeight={'bold'}>
                {fuel}
              </Text>
            </Stack>
            <Center height="60px">
              <Divider mx="1" orientation="vertical" border={'1px solid gray'} />
            </Center>
            <Stack>
              <Text textAlign={'center'} textTransform="uppercase">
                REG. STATE
              </Text>
              <Text textAlign={'center'} textTransform="uppercase" fontWeight={'bold'}>
                {state}
              </Text>
            </Stack>
          </Flex>
          <Box borderTop="1px" mx="5" borderColor="gray.200">
          </Box>
          <Flex justifyContent={'center'} style={{ marginTop: '15px', marginBottom: '15px' }}>
          <NavLink to={`/product/${_id}`}>
            <Button style={{ backgroundColor: '#1097b1', color: '#fff' }} size="lg" className="more_details_home">
              More Details
            </Button>
            </NavLink>
          </Flex>
        </Box>
      
    </Flex>
  );
}

export default ItemCard;
