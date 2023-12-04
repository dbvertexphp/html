import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";

import BrandCard from "./BrandCard";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { getTools } from "../../Redux/App/Actions/Admin/Website/Website.action";

const BrandSliderComponent = () => {
  const dispatch = useDispatch();
  const [slider, setSlider] = useState();
  const [cards, setcards] = useState([]);

  const getData = (e) => {
    dispatch(getTools("brands", setcards));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box position={"relative"} width={"full"} overflow={"hidden"}>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <IconButton
        aria-label="left-arrow"
        position="absolute"
        borderRadius="50%"
        left="0px"
        top="50%"
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <ChevronLeftIcon />
      </IconButton>

      <IconButton
        aria-label="right-arrow"
        position="absolute"
        borderRadius="50%"
        right="0px"
        top="50%"
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <ChevronRightIcon />
      </IconButton>
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((card, index) => (
          <BrandCard key={index} name={card.brand_name} imageURL={card.image} />
        ))}
      </Slider>
    </Box>
  );
};

export default BrandSliderComponent;
const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
