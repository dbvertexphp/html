import { useEffect, useState } from 'react';
import { Box, Heading, Image, InputGroup, Skeleton, Text, Button, InputLeftElement, Input, Select } from '@chakra-ui/react';
import Slider from 'react-slick';
import { useDispatch } from 'react-redux';
import { getallBanners } from '../../Redux/App/Actions/Admin/Website/Website.action';
import AsyncSelector from '../Extra/AsyncSelect';
import { getAllCarNamess, getAllCar_Id } from '../../Redux/App/Actions/Admin/CarComponents/CarName.action';
import { useNavigate } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import { RiSearchLine } from 'react-icons/ri';

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1
};

export default function Carousel() {
  const [slider, setSlider] = useState();
  const [cards, setcards] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getData = e => {
    dispatch(getallBanners(null, setcards));
  };
  const handleSearchChange = val => {
    let data = { search: { name: val._id } };

    navigate('/collection');
  };

  const handleSearchChangeID = val => {
    let data = { search: { carIds: val } };
    navigate('/collection');
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Box position={'relative'} width={'100%'} maxHeight={{ base: '850px', md: '850px' }} overflow={'hidden'} margin="auto">
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />

        <Box
          zIndex={1}
          left={{ base: '10px', md: '150px' }}
          bottom={{ base: '40px', md: '120px' }}
          position={{ base: 'absolute', md: 'absolute' }}
          textAlign={{ base: 'left', md: 'left' }}
          width={{ base: '100%', md: 'auto' }}
        >
          <Heading fontWeight="bold" fontSize={{ base: '30px', md: '50px' }} whiteSpace="nowrap">
            find your dreams
          </Heading>
          <Heading fontWeight="bold" fontSize={{ base: '30px', md: '50px' }} whiteSpace="nowrap">
            car within a minute
          </Heading>
          <Text
            fontWeight="bold"
            fontSize={{ base: '16px', md: '20px' }} // Adjusted fontSize for mobile
            backdropFilter="blur(1px)"
          >
            Lorem Ipsum is simply dummy text of the printing and
          </Text>
          <Text
            fontWeight="bold"
            fontSize={{ base: '16px', md: '20px' }} // Adjusted fontSize for mobile
            backdropFilter="blur(1px)"
          >
            typesetting industry. Lorem Ipsum has been
          </Text>
          <Text
            fontWeight="bold"
            fontSize={{ base: '16px', md: '20px' }} // Adjusted fontSize for mobile
            backdropFilter="blur(1px)"
          >
            the industry's standard dummy
          </Text>
          <NavLink>
            <Button style={{ backgroundColor: '#1097b1', color: '#fff', width: { base: '80%', md: '100%' } }} size={{ base: 'md', md: 'lg' }}>
              Book Now
            </Button>
          </NavLink>
        </Box>

        <Slider {...settings} ref={slider => setSlider(slider)}>
          {cards.length == 0 ? (
            <Skeleton height="500px"></Skeleton>
          ) : (
            cards.map((image, index) => (
              <Box key={index} display="flex" justifyContent="center" alignItems="center" height="100%">
                <Image
                  width="100%"
                  h={{ base: '250px', md: '650px' }}
                  objectFit="cover"
                  objectPosition="center"
                  src={image}
                  // filter={"blur(1px)"}
                />
              </Box>
            ))
          )}
        </Slider>
      </Box>

      <Box zIndex={1} left={{ base: '10px', md: '150px' }} bottom={{ base: '40px', md: '120px' }}>
        <Heading className="serach_heading" my="5">
          Select your car brand to get started
        </Heading>
        <Box className="centered-box">
          <InputGroup w={{ base: 'full', md: '650px' }} size="lg" justifyContent="left" height={'48px !important'}>
            <InputLeftElement pointerEvents="none"></InputLeftElement>

            <AsyncSelector
              height={'48px !important'}
              handleChangeFn={handleSearchChange}
              getItems={getAllCarNamess}
              placeholder={'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Search Car'}
              bg="gray.200"
            />
          </InputGroup>
          <InputGroup w={{ base: 'full', md: '650px' }} size="lg" justifyContent="left" marginLeft={'20px !important'} height={'48px !important'}>
            <InputLeftElement pointerEvents="none"></InputLeftElement>

            <AsyncSelector
              height={'48px !important'}
              handleChangeFn={handleSearchChangeID}
              getItems={getAllCar_Id}
              placeholder={'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Search Car ID'}
              bg="gray.200"
            />
          </InputGroup>
        </Box>
      </Box>
    </>
  );
}
