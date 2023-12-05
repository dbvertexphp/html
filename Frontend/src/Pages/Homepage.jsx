import { Link, useNavigate } from "react-router-dom";
import Carousel from "../Components/WebsiteComponents/Carousel";
import {
  Card,
  Text,
  CardFooter,
  CardHeader,
  Heading,
  Flex,
} from "@chakra-ui/react";
import SliderComponent from "../Components/WebsiteComponents/SliderComponent";
import BrandSliderComponent from "../Components/WebsiteComponents/BrandSliderComponent";
import Testemonials from "../Components/WebsiteComponents/Testemonials";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import BuyCard from "../Components/WebsiteComponents/BuyCard";
import {
  getCars,
  getCarsHomePage,
} from "../Redux/App/Actions/Vendors/Car.action";

export default function Homepage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [trending, settrending] = useState([]);
  const [featured, setfeatured] = useState([]);
  const [upcoming, setupcoming] = useState([]);
  const [hotdeal, sethotdeal] = useState([]);
  const { loading, error } = useSelector((state) => state?.CarManager);

  const setData = (data) => {
    settrending(data.Trendings);
    setfeatured(data.Featured);
    setupcoming(data.Upcomings);
    sethotdeal(data.HotDeals);
  };
  useEffect(() => {
    dispatch(getCarsHomePage(setData));
  }, []);

  return (
    <>
      <Carousel />

      <Card border='0px' background="#F5F4F9" mb={{ base: "5", md: "10" }} pb="5">
        <CardHeader>
          <Heading size="lg"></Heading>
        </CardHeader>
        <BrandSliderComponent />
      </Card>

      <Card shadow="none" mx={{ base: "5", md: "10" }} my={{ base: "5", md: "10" }} pb="5">
        <CardHeader>
          <Flex textAlign={'center'} justify={"space-between"}>
            <Heading textAlign={'center'} size="lg">Why buy from us ?</Heading>
           
          </Flex>
        </CardHeader>
        <BuyCard />
        
      </Card>

      <Card shadow="none" mx={{ base: "5", md: "10" }} my={{ base: "5", md: "10" }} pb="5">
        <CardHeader>
          <Flex>
           
          <Heading className="serach_heading" my="5">
            Recently added cars
          </Heading>
           
          </Flex>
        </CardHeader>
        <SliderComponent data={trending} />
      </Card>

      <Card shadow="none" mx={{ base: "5", md: "10" }} mb={{ base: "5", md: "10" }} pb="5">
        <CardHeader>
          <Flex align={"center"} justify={"space-between"}>
           
            <Text
              color="#30829c"
              cursor="pointer"
              onClick={() => {
                navigate("/collection?q=featured_car");
              }}
            >
             
            </Text>
          </Flex>
        </CardHeader>
        <SliderComponent data={featured} />
      </Card>

      <Card shadow="none" mx={{ base: "5", md: "10" }} mb={{ base: "5", md: "10" }} pb="5">
        <CardHeader>
          <Flex align={"center"} justify={"space-between"}>
            
            <Text
              color="#30829c"
              cursor="pointer"
              onClick={() => {
                navigate("/collection?q=hotdeal_car");
              }}
            >
             
            </Text>
          </Flex>
        </CardHeader>
        <SliderComponent data={hotdeal} />
      </Card>

      {/* <Card mx={{ base: "5", md: "10" }} mb={{ base: "5", md: "10" }} pb="5">
        <CardHeader>
          <Flex align={"center"} justify={"space-between"}>
            <Heading size="lg">Upcoming cars</Heading>
            <Text
              color="#30829c"
              cursor="pointer"
              onClick={() => {
                navigate("/collection?q=upcoming_car");
              }}
            >
              View All Cars
            </Text>
          </Flex>
        </CardHeader>
        <SliderComponent data={upcoming} />
      </Card> */}

      

      <Card mx={{ base: "5", md: "10" }} mb={{ base: "5", md: "10" }} p="5">
        <Testemonials />
      </Card>
    </>
  );
}
