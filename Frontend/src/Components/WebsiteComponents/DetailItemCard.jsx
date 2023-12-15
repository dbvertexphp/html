import { Flex, Box, Image, useColorModeValue, Center, Stack, Text, Divider, Button } from '@chakra-ui/react';
import { FaRegHeart } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import IndianNumberSystem from '../../utils/IndianNumSystem';
import { GrLocation } from "react-icons/gr";
function DetailItemCard(props) {
  const { name, price, imageURL, year, km, fuel, state, _id, booking_status } = props;

  return (
    <Flex p="10"  alignItems="center" justifyContent="center">
        <Box border="1px solid #1097B1" width="80%" rounded="lg"  position="relative">
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
          <Image zIndex={0} src={imageURL} p="5" roundedTop="lg" borderRadius="20px" roundedBottom="lg" w="400px" objectFit="cover" h={'265px'} maxW={'full'} />
          
          
          <Box p="5">
            <Box className="home_page_car_name" fontSize="20" fontWeight="semibold" lineHeight="tight" isTruncated>
              {name}
            </Box>
            <Box className="home_page_car_name" fontSize="20" fontWeight="semibold" lineHeight="tight" isTruncated>
            REG. YEAR {year.split('-')[0]}
            </Box>
           
           
            <Box  marginTop="10px" className="home_page_location"  display="flex" alignItems="center">
            KILOMETERS
  {km}
          </Box>
          <Box  marginTop="10px" className="home_page_location"  display="flex" alignItems="center">
            REG. YEAR {year.split('-')[0]}
          </Box>
          <Box  marginTop="10px" className="home_page_location"  display="flex" alignItems="center">
            <GrLocation />
             Parsvnath City Mall, Faridabad
          </Box>
           
          </Box>
         
          <Flex justifyContent={'center'} style={{ marginTop: '15px', marginBottom: '15px' }}>
         
          <NavLink to={`/product/${_id}`}>
          <Box fontSize="18"  mb="4">
          <Box>
             <FaRegHeart />
           </Box>
           </Box>
           <Box fontSize="18" className="home_page_car_price" mb="4">
              <Box as="span" fontSize="md">
                INR{' '}
              </Box>
              {IndianNumberSystem(price)}
            </Box>
           
            <Button style={{ backgroundColor: '#1097b1', color: '#fff' }} size="lg" className="more_details_home">
              More Details
            </Button>
            </NavLink>
          </Flex>
        </Flex>

          
         
         
         
        </Box>
      
    </Flex>
  );
}

export default DetailItemCard;
