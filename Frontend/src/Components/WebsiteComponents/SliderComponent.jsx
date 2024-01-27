import Slider from 'react-slick';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, useBreakpointValue, IconButton, Card } from '@chakra-ui/react';
import { Skeleton, SkeletonText } from '@chakra-ui/react';

import ItemCard from './ItemCard';
import { useState } from 'react';
import SkeletonCard from '../Extra/SkeletonCard';

const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [

    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

const SliderComponent = ({ data }) => {
  const [slider, setSlider] = useState();

  const top = useBreakpointValue({ base: '50%', md: '50%' });
  const side = useBreakpointValue({ base: '0px', md: '0px' });
  data = data.slice(0, 6);

  return (
    <Box position={'relative'} width={'full'} overflow={'hidden'}>
      <IconButton
        aria-label="left-arrow"
        position="absolute"
        borderRadius="50%"
        left={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <ChevronLeftIcon />
      </IconButton>
      <IconButton
        aria-label="right-arrow"
        position="absolute"
        borderRadius="50%"
        right={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <ChevronRightIcon />
      </IconButton>
      <Slider {...settings} ref={slider => setSlider(slider)}>
        {data.length !== 0 &&
          data?.map((card, index) => (
            <ItemCard
              key={card?._id}
              name={card?.cname}
              price={card?.price}
              imageURL={card?.primary_image}
              year={card?.regYear}
              km={card?.km_driven}
              fuel={card?.fuel_type}
              state={card?.regState?.state_code}
              _id={card?._id}
              booking_status={card.booking_status}
              like_status={card.Like_status}
              Car_id={card?.Car_id}
              featured_car={card?.featured_car}
              trending_car={card?.trending_car}
              upcoming_car={card?.upcoming_car}
              hotdeal_car={card?.hotdeal_car}
              locationNames={card?.locationNames}
            />
          ))}
      </Slider>
    </Box>
  );
};

export default SliderComponent;
