import React, { useEffect, useState } from 'react';
import { Card, Text, CardHeader, Heading, Flex } from '@chakra-ui/react';
import SliderComponent from '../Components/WebsiteComponents/SliderComponent';
import BrandSliderComponent from '../Components/WebsiteComponents/BrandSliderComponent';
import BuyCard from '../Components/WebsiteComponents/BuyCard';
import Testemonials from '../Components/WebsiteComponents/Testemonials';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCarsHomePage } from '../Redux/App/Actions/Vendors/Car.action';
import Carousel from '../Components/WebsiteComponents/Carousel';

const Homepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [trending, settrending] = useState([]);
  const [featured, setfeatured] = useState([]);
  const [hotdeal, sethotdeal] = useState([]);
  const { loading, error } = useSelector(state => state?.CarManager);
  const { Customer_detail, token } = useSelector(store => store?.CustomerAuthManager) || {};
  const customer = Customer_detail || JSON.parse(localStorage.getItem('customer_detail_carvendor'));
  const customertoken = token || JSON.parse(localStorage.getItem('customer_token_carvendor'));

  const setData = data => {
    settrending([...data.Trendings]);
    setfeatured([...data.Featured]);
    sethotdeal([...data.HotDeals]);
  };
  const storedLocation = JSON.parse(localStorage.getItem('location_carvendor'));

  useEffect(() => {
    if (storedLocation) {
      const locationId = storedLocation?._id || null;
      dispatch({ type: 'LOCATION_LOADING', payload: locationId });
      dispatch(getCarsHomePage(Customer_detail?._id, setData, { location: locationId }));
      dispatch({ type: 'LOCATION_SUCCESS', payload: locationId });
    } else {
      // If location is not in localStorage, make API call directly
      dispatch(getCarsHomePage(Customer_detail?._id, setData));
    }
  }, [Customer_detail?._id]);

  return (
    <>
      <Carousel />

      <Card shadow="none" mx={{ base: '5', md: '10' }} my={{ base: '5', md: '10' }} pb="5">
        <CardHeader>
          <Flex placeContent={'center'}>
            <Heading textAlign={'center'}  className="know_more_compontent_heading">
              Recently added cars
            </Heading>
          </Flex>
        </CardHeader>
        <SliderComponent data={trending} />
      </Card>

      <Card shadow="none" mx={{ base: '5', md: '10' }} mb={{ base: '5', md: '10' }} pb="5">
        <CardHeader>
          <Flex align={'center'} justify={'space-between'}>
            <Text
              color="#30829c"
              cursor="pointer"
              onClick={() => {
                navigate('/collection?q=featured_car');
              }}
            ></Text>
          </Flex>
        </CardHeader>
        <SliderComponent data={hotdeal} />
      </Card>

      <Card shadow="none" mx={{ base: '5', md: '10' }} mb={{ base: '5', md: '10' }} pb="5">
        <CardHeader>
          <Flex align={'center'} justify={'space-between'}>
            <Text
              color="#30829c"
              cursor="pointer"
              onClick={() => {
                navigate('/collection?q=hotdeal_car');
              }}
            ></Text>
          </Flex>
        </CardHeader>
        <SliderComponent data={featured} />
        
        <Text
          align={'center'}
          color="#30829c"
          cursor="pointer"
          onClick={() => {
            navigate('/collection');
          }}
        >
          View All Cars
        </Text>
      </Card>

      <Card border="0px" background="#F5F4F9" mb={{ base: '5', md: '10' }} pb="5">
        <CardHeader>
          <Heading size="lg"></Heading>
        </CardHeader>
        <BrandSliderComponent />
      </Card>

      <Card shadow="none" mx={{ base: '5', md: '10' }} my={{ base: '5', md: '10' }} pb="5">
        <CardHeader>
          <Flex placeContent={'center'}>
            <Heading textAlign={'center'} size="lg" className="know_more_compontent_heading">
              Why buy from us?
            </Heading>
          </Flex>
        </CardHeader>
        <BuyCard />
      </Card>

      <Card shadow="none" mx={{ base: '5', md: '10' }} mb={{ base: '5', md: '10' }} pb="5">
        <CardHeader>
          <Flex placeContent={'center'}>
            <Heading textAlign={'center'} size="lg" className="know_more_compontent_heading">
              Join Our Happy Clients
            </Heading>
          </Flex>
        </CardHeader>
        <Testemonials />
      </Card>
    </>
  );
};

export default Homepage;
