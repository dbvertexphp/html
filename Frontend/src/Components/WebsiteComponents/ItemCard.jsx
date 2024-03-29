import { Flex, Box, Image, useColorModeValue, Center, Stack, Text, Divider, Button, useToast } from '@chakra-ui/react';
import React from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import IndianNumberSystem from '../../utils/IndianNumSystem';
import { GrLocation } from 'react-icons/gr';
import { useEffect, useRef, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';

import { checkisinwishlist } from '../../Redux/App/Actions/Admin/Website/Website.action';
function ItemCard(props) {
  const dispatch = useDispatch();
  const toast = useToast();
  const {
    name,
    price,
    imageURL,
    year,
    km,
    fuel,
    state,
    _id,
    booking_status,
    like_status,
    Car_id,
    featured_car,
    trending_car,
    upcoming_car,
    hotdeal_car,
    locationNames
  } = props;

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
          <NavLink to={`/product/${_id}`}>
            <Image zIndex={0} src={imageURL} roundedTop="lg" roundedBottom="lg" w="400px" objectFit="cover" h={'265px'} maxW={'full'} />
          </NavLink>
          <Box
            position="absolute"
            top="10px" // Adjust this value as needed
            right="10px" // Adjust this value as needed
            color={'white'}
            onClick={handleToggleFavorite}
          >
            {isFavorite ? (
              <FaHeart
                style={{
                  fill: 'white', // Set the fill color to your desired color
                  width: '24px', // Optional: Adjust the width
                  height: '24px' // Optional: Adjust the height
                }}
              />
            ) : (
              <FaRegHeart />
            )}
          </Box>

          {featured_car === 1 && (
            <Box className="featured_car">
              <Box>Featured</Box>
            </Box>
          )}
          {trending_car === 1 && (
            <Box className="trending_car">
              <Box>Trending</Box>
            </Box>
          )}
          {upcoming_car === 1 && (
            <Box className="upcoming_car">
              <Box>Upcoming </Box>
            </Box>
          )}
          {hotdeal_car === 1 && (
            <Box className="hotdeal_car">
              <Box>Hot Deal</Box>
            </Box>
          )}
        </Flex>

        <Box p="5">
          <Box
            className="home_page_car_name"
            fontSize="20"
            fontWeight="semibold"
            lineHeight="tight"
            isTruncated
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Box className="home_page_car_name" fontSize="20" fontWeight="semibold" lineHeight="tight" isTruncated>
              {name}
            </Box>
            <Box className="home_page_car_name" fontSize="20" fontWeight="semibold" lineHeight="tight" isTruncated>
              {Car_id ? Car_id : ''}
            </Box>
          </Box>
          <Box fontSize="18" className="home_page_car_price">
            <Box as="span" fontSize="md">
              INR{' '}
            </Box>
            {IndianNumberSystem(price)}
          </Box>
          <Box marginTop="10px" className="home_page_location" display="flex" alignItems="center">
            <GrLocation />

            {locationNames.map((location, index) =>
              // Render only the first 3 elements
              index < 3 ? (
                <React.Fragment key={index}>
                  {location}
                  {index < 2 && ',  '}
                </React.Fragment>
              ) : null
            )}
            {locationNames.length > 3 && <span>...</span>}
          </Box>
        </Box>
        <Flex justify={'space-evenly'} gap="1" mb="8" mx="5" fontSize={14} className="home_page_car_details">
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
        <Box borderTop="1px" mx="5" borderColor="gray.200"></Box>
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
