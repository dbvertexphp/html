import { Flex, Box, Image, useColorModeValue, Center, Stack, Text, Divider, Button, useToast } from '@chakra-ui/react';
import { FaRegHeart } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import IndianNumberSystem from '../../utils/IndianNumSystem';
import { GrLocation } from 'react-icons/gr';
import { useEffect, useRef, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
function DetailItemCard(props) {
  const dispatch = useDispatch();
  const toast = useToast();
  const { name, price, imageURL, year, km, fuel, state, _id, booking_status, like_status, Car_id } = props;

  const { Customer_detail, token, isAuth } = useSelector(state => state.CustomerAuthManager);

  const [isFavorite, setIsFavorite] = useState(like_status === 'Yes');

  const handleToggleFavorite = async () => {
    const login = isAuth;
    if (login == false) {
      toast({
        title: 'Please Login First',
        status: 'error',
        position: 'top'
      });
      let url = window.location.pathname;
      localStorage.setItem('previous_url', url);

      return navigate('/customer-email-login');
    } else {
      try {
        setIsFavorite(!isFavorite);
        if (!isFavorite) {
          // Add logic to save to the wishlist table when adding to favorites
          await addToWishlist();
          console.log('Item added to wishlist!');
        } else {
          // Add logic to remove from the wishlist table when removing from favorites
          await removeFromWishlist();
          console.log('Item removed from wishlist!');
        }
      } catch (error) {
        console.error('Error toggling wishlist status:', error);
      }
    }
  };

  const addToWishlist = async () => {
    let body = {
      userId: Customer_detail._id,
      carId: _id
    };
    // Add logic to make an API request to add the item to the wishlist
    const response = axios.post(`${BASE_URL}/api/test/savewishlist`, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(response.data);
  };

  const removeFromWishlist = async () => {
    // Add logic to make an API request to remove the item from the wishlist
    await axios.delete(`${BASE_URL}/api/test/removeinwishlist/${Customer_detail._id}/${_id}`);
  };
  return (
    <Flex p="10" alignItems="center" justifyContent="center">
      <Box border="1px solid #1097B1" width="80%" rounded="lg" position="relative">
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
          <Box p="4">
            <Image src={imageURL} className="detail_page_car_name" border="3px solid #1097B1" borderRadius="20px" w="400px" maxW={'full'} />
          </Box>
          <Box>
            <Box pt="7" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box className="home_page_car_name" fontSize="25" fontWeight="semibold" lineHeight="tight" isTruncated>
                {name}
              </Box>
              <Box className="home_page_car_name" fontSize="20" fontWeight="semibold" lineHeight="tight" isTruncated>
                {Car_id ? Car_id : ''}
              </Box>
            </Box>

            <Box marginTop="10px" className="home_page_location" display="flex" alignItems="center">
              KILOMETERS : {km}
            </Box>
            <Box marginTop="10px" className="home_page_location" display="flex" alignItems="center">
              FUEL TYPE : {fuel}
            </Box>
            <Box marginTop="10px" className="home_page_location" display="flex" alignItems="center">
              REG. YEAR : {year.split('-')[0]}
            </Box>
            <Box marginTop="10px" className="home_page_location" display="flex" alignItems="center">
              <GrLocation />
              Parsvnath City Mall, Faridabad
            </Box>
          </Box>

          <Box justifyContent={'center'} style={{ marginTop: '35px' }}>
            <Box fontSize="18" mb="4">
              <Box onClick={handleToggleFavorite}>
                {isFavorite ? (
                  <FaHeart
                    style={{
                      fill: 'black', // Set the fill color to your desired color
                      width: '20px', // Optional: Adjust the width
                      height: '20px' // Optional: Adjust the height
                    }}
                  />
                ) : (
                  <FaRegHeart />
                )}
              </Box>
            </Box>
            <Box className="home_page_car_price" mb="5">
              <Box as="span">INR </Box>
              {IndianNumberSystem(price)}
            </Box>
            <NavLink to={`/product/${_id}`}>
              <Button style={{ backgroundColor: '#1097b1', color: '#fff' }} size="lg" className="more_details_home">
                More Details
              </Button>
            </NavLink>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

export default DetailItemCard;
