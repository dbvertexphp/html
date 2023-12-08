import { useEffect, useState } from 'react';
import { Box, Heading, Image, InputGroup, Skeleton, Text, Button, InputLeftElement, Input, Select, } from '@chakra-ui/react';
import Slider from 'react-slick';
import { useDispatch } from 'react-redux';
import { getallBanners } from '../../Redux/App/Actions/Admin/Website/Website.action';
import AsyncSelector from '../Extra/AsyncSelect';
import { getAllCarNamess } from '../../Redux/App/Actions/Admin/CarComponents/CarName.action';
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
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
   
      <Box position={'relative'} width={'100%'} maxHeight={{ base: '850px', md: '850px' }} overflow={'hidden'} margin="auto">
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />


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

    
    </>
  );
}
