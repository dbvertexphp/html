import Slider from "react-slick";
import { Box , useBreakpointValue} from "@chakra-ui/react";
import TestemonialCard from "./TestemonialCard";
import female from "../../assets/Icons/female.png";
import male from "../../assets/Icons/male.png";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { getTools } from "../../Redux/App/Actions/Admin/Website/Website.action";

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 5000,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
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

const TestemonialComponent = () => {
  const top = useBreakpointValue({ base: '50%', md: '50%' });
  const side = useBreakpointValue({ base: '0px', md: '0px' });

  const dispatch = useDispatch();
  const [cards, setcards] = useState(sample);

  const getData = (e) => {
    dispatch(getTools("testimonials", setcards));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box position={'relative'} width={'full'} overflow={'hidden'} >
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
      <Slider {...settings}>
        {cards.map((card, index) => (
          <TestemonialCard
            key={index}
            author={card?.author}
            image={card?.image}
            designation={card?.designation}
            description={card?.description}
            location={card?.location}
          />
        ))}
      </Slider>
    </Box>
  );
};

export default TestemonialComponent;
let sample = [
  {
    image: female,
    location: "Kolkata",
    author: "Sneha Sarkar (Mother)",
    designation: "Vendor",
    description:
      "I have been searching for good vendors since the new session started for my kid who is in 5th standard. With the busy schedule of husband and me we are not able to finish his day to day homework or prepare him for the exams. I came across EasyCarsGo, registered and they instantly contacted me & assured me of great service which they did provide. Almost 3 months now and my kid scored very good marks in Unit test 1 and preparing for the second UT. Thank You EasyCarsGo.",
  },
  {
    image: male,
    location: "Kolkata",
    author: "B K Dash (Vendor)",
    designation: "Vendor",
    description:
      "I am a part of EasyCarsGo for almost 6 months now as a Vendor. I have the flexibility to choose from the list of student, classes and timings as per my availability. The registration process is also hassle free and is definitely helping me to get recurring income every month. Thank You EasyCarsGo!",
  },
  {
    image: female,
    location: "Kolkata",
    author: "Aswa Iqbal (Mother)",
    designation: "Vendor",
    description:
      "Quick and great service as compared to other platforms. Have been given false promises but EasyCarsGo is reliable, you have helped me select perfect vendor for my child’s academics and especially for Kannada and Hindi. Thank you EasyCarsGo.",
  },
];
