import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, useBreakpointValue, IconButton, Card } from "@chakra-ui/react";
import { Skeleton, SkeletonText } from "@chakra-ui/react";

import DetailItemCard from "./DetailItemCard";
import { useState } from "react";
import SkeletonCard from "../Extra/SkeletonCard";

const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
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

const DetailSliderComponent = ({ data }) => {
  const [slider, setSlider] = useState();

  const top = useBreakpointValue({ base: "50%", md: "50%" });
  const side = useBreakpointValue({ base: "0px", md: "0px" });
  data = data.slice(0, 6);

  return (
    <Box position={"relative"} width={"full"} overflow={"hidden"}>
    
     
      

        {data.length !== 0 &&
          data?.map((card, index) => (
            <DetailItemCard
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
            />
          ))}
     
    </Box>
  );
};

export default DetailSliderComponent;
