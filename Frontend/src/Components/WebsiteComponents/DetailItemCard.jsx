import { Card,CardBody,Heading,CardFooter,Flex, Box, Image, useColorModeValue, Center, Stack, Text, Divider, Button, useToast } from '@chakra-ui/react';
import { FaRegHeart } from 'react-icons/fa';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import IndianNumberSystem from '../../utils/IndianNumSystem';
import { GrLocation } from 'react-icons/gr';
import { useEffect, useRef, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import { useBreakpointValue } from '@chakra-ui/react';

// ...

// Inside your component function

function DetailItemCard(props) {
  const dispatch = useDispatch();
  const toast = useToast();
  const { name, price, imageURL, year, km, fuel, state, _id, booking_status, like_status, Car_id, locationNames } = props;
  const { Customer_detail, token, isAuth } = useSelector(state => state.CustomerAuthManager);

  const [isFavorite, setIsFavorite] = useState(like_status === 'Yes');
  const isMobile = useBreakpointValue({ base: true, sm: false });
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
    <>
     <Flex p="10" alignItems="center" justifyContent="center">
     <Box border="1px solid #1097B1"  rounded="lg" position="relative" >
    <Card p="4"
    direction={{ base: 'column', sm: 'row' }}
    overflow='hidden'
    variant='outline'
  >
    <Image
      objectFit='cover'
      maxW={{ base: '100%', sm: '350px' }}
      borderRadius="20px"
      border="3px solid #1097B1"
      src={imageURL}
      alt='Caffe Latte'
    />
  
    <Stack>
      <CardBody>
        <Flex><Heading className="home_page_car_name "  size='md'> {name}   
   </Heading>
   {isMobile && ( // Render favorite icon on mobile
                <Box onClick={handleToggleFavorite} marginLeft={20}>
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
              )}
              </Flex>
        <Heading marginTop="10px" className="home_page_car_name "  size='md'> {Car_id ? Car_id : ''}</Heading>
        <Box marginTop="10px" className="home_page_location fontcss" display="flex" alignItems="center">
              KILOMETERS : {km}
            </Box>
            <Box marginTop="10px" className="home_page_location fontcss" display="flex" alignItems="center">
              FUEL TYPE : {fuel}
            </Box>
            <Box marginTop="10px" className="home_page_location fontcss" display="flex" alignItems="center">
              REG. YEAR : {year.split('-')[0]}
            </Box>
        <Flex p='2'>
        <GrLocation />
              {locationNames.map((location, index) =>
                // Render only the first 3 elements
                index < 10 ? (
                  <React.Fragment className="home_page_location fontcss" key={index}>
                    {location}
                    {index < 10 && ',  '}
                  </React.Fragment>
                ) : null
              )}
              {locationNames.length > 10 && <span>...</span>}
        </Flex>
      </CardBody>
  
     
    </Stack>
    <Stack>
    <CardBody>
    <Box className="iconhide" fontSize="18" mb="4">
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
    <Text className="home_page_car_price fontcss" mb="5">
              INR
              {IndianNumberSystem(price)}
            </Text>
            <NavLink to={`/product/${_id}`}>
        <Button style={{ backgroundColor: '#1097b1', color: '#fff' }}>
        More Details
        </Button>
        </NavLink>
        </CardBody>
    </Stack>
  </Card>
  
  </Box>
  </Flex>
   
    </>
  );
}

export default DetailItemCard;
