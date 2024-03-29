import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Heading, Image, InputGroup, Skeleton, Text, Button, InputLeftElement, Input, Select } from '@chakra-ui/react';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { getallBanners } from '../../Redux/App/Actions/Admin/Website/Website.action';
import AsyncSelector from '../Extra/AsyncSelect';
import { getAllCar_Id } from '../../Redux/App/Actions/Admin/CarComponents/CarName.action';
import { RxTimer } from 'react-icons/rx';
import { BASE_URL } from '../../utils/config';
import { useNavigate } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import { RiSearchLine } from 'react-icons/ri';
import Async from 'react-select/async';

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
  const carsByName = useSelector(state => state.CarComponentManager.getCarsByNameSreach);
  const [selectedOptions, setSelectedNameSreach] = useState(null);
  const [storedNameSreach, setStoredNameSreach] = useState([]);
  const [selectedOption, setSelectedIDOption] = useState(null);
  const [storedIDOptions, setStoredIDOptions] = useState([]);
  const [menuIsOpen, setMenuIsOpen] = useState();
  const [idmenuIsOpen, setIDMenuIsOpen] = useState();

  const handleSelectSreachName = selectedOption => {
    const { value: _id } = selectedOption;
    const storedNameSreachString = localStorage.getItem('SreachcarnameOptions');
    const storedNameSreach = storedNameSreachString ? JSON.parse(storedNameSreachString) : [];
    const isOptionExists = storedNameSreach.some(option => option.value === _id);

    if (!isOptionExists) {
      const updatedOptions = [...storedNameSreach, { label: selectedOption.label, value: _id }];
      localStorage.setItem('SreachcarnameOptions', JSON.stringify(updatedOptions));
    }
    navigate(`/collection?name=${_id}`);
  };

  const loadOptionsSreachName = async inputValue => {
    // If user is typing, fetch data from the API
    if (inputValue) {
      try {
        const response = await axios.post(`${BASE_URL}/api/admin/carname/get-carname-sreach`, { name: inputValue });
        const options = response.data.cars.map(permission => ({
          label: permission.name,
          value: permission._id
        }));
        return options;
      } catch (error) {
        console.error('Error fetching options:', error);
        return [];
      }
    } else {
      // If no input, display options from local storage
      return storedNameSreach;
    }
  };

  const handleClearOption = value => {
    const storedNameSreachString = localStorage.getItem('SreachcarnameOptions');
    let storedNameSreach = storedNameSreachString ? JSON.parse(storedNameSreachString) : [];
    const indexToRemove = storedNameSreach.findIndex(option => option.value === value);

    if (indexToRemove !== -1) {
      // Exclude the item to be removed from storedNameSreach
      const updatedOptions = storedNameSreach.filter((_, index) => index !== indexToRemove);

      // Update state to re-render without the removed item
      setStoredNameSreach(updatedOptions);
      // Your removal code

      console.log('After Removal:', updatedOptions);
      localStorage.setItem('SreachcarnameOptions', JSON.stringify(updatedOptions));
      setMenuIsOpen(true);
    }
  };

  const RecantOptionsSreachName = () => {
    // Use storedNameSreach state instead of reading from local storage directly
    return storedNameSreach.map(permission => ({
      label: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <RxTimer />
          <span>{permission.label}</span>
        </div>
      ),
      value: permission.value
    }));
  };

  useEffect(() => {
    // Load stored options from local storage on component mount
    const storedOption = localStorage.getItem('Sreachcarname');
    if (storedOption) {
      const parsedOption = JSON.parse(storedOption);
      setSelectedNameSreach(parsedOption);
    }

    // Load options from local storage for default dropdown
    const storedNameSreachString = localStorage.getItem('SreachcarnameOptions');
    if (storedNameSreachString) {
      const storedNameSreach = JSON.parse(storedNameSreachString);
      setStoredNameSreach(storedNameSreach);
    }
  }, []);

  const handleSelectSearchID = selectedOption => {
    const { value: carId } = selectedOption;

    // Fetch stored options from local storage
    const storedOptionsString = localStorage.getItem('SearchCarIdOptions');

    const storedOptions = storedOptionsString ? JSON.parse(storedOptionsString) : [];

    // Find the corresponding label for the selected carId
    const selectedLabel = storedOptions.find(option => option.value === carId)?.label || '';

    // Check if the option already exists in storedOptions
    const isOptionExists = storedOptions.some(option => option.value === carId);

    if (!isOptionExists) {
      const updatedOptions = [...storedOptions, { label: selectedOption.label, value: selectedOption.value }];
      localStorage.setItem('SearchCarIdOptions', JSON.stringify(updatedOptions));
      navigate(`/collection?label=${encodeURIComponent(selectedOption.label)}&value=${encodeURIComponent(selectedOption.value)}`);
    } else {
      navigate(`/collection?label=${encodeURIComponent(selectedLabel)}&value=${encodeURIComponent(carId)}`);
    }
  };

  const loadOptionsSearchID = async inputValue => {
    // If the user is typing, fetch data from the API
    if (inputValue) {
      try {
        const response = await axios.post(`${BASE_URL}/api/admin/carname/get-carId-sreach`, { carId: inputValue });

        if (response && response.data && response.data.cars) {
          const options = response.data.cars.map(permission => ({
            label: permission.name,
            value: permission._id
          }));
          return options;
        } else {
          console.error('Error: Invalid response structure', response);
          return [];
        }
      } catch (error) {
        console.error('Error fetching options:', error);
        return [];
      }
    } else {
      // If no input, display options from local storage
      const storedOptionsString = localStorage.getItem('SearchCarIdOptions');
      const storedOptions = storedOptionsString ? JSON.parse(storedOptionsString) : [];
      return storedOptions;
    }
  };

  const handleClearIDOption = value => {
    const storedOptionsString = localStorage.getItem('SearchCarIdOptions');
    let storedOptions = storedOptionsString ? JSON.parse(storedOptionsString) : [];
    const indexToRemove = storedOptions.findIndex(option => option.value === value);

    if (indexToRemove !== -1) {
      // Remove the item from localStorage using the unique key
      localStorage.removeItem(`SearchCarIdOptions_${indexToRemove}`);

      // Exclude the item to be removed from storedOptions
      const updatedOptions = storedOptions.filter((_, index) => index !== indexToRemove);
      console.log(updatedOptions);

      // Update state to re-render without the removed item
      setStoredIDOptions(updatedOptions);

      // Update local storage
      localStorage.setItem('SearchCarIdOptions', JSON.stringify(updatedOptions));

      // Optionally, close the dropdown
      setIDMenuIsOpen(true);
    }
  };

  const RecentOptionsSearchID = () => {
    // Use storedOptions state instead of reading from local storage directly
    return storedIDOptions.map(option => ({
      label: (
        <div style={{ display: 'flex',alignItems: 'center' }}>
          <RxTimer />
          <span>{option.label}</span>
        </div>
      ),
      value: option.value
    }));
  };

  useEffect(() => {
    // Load options from local storage for default dropdown
    const storedOptionsString = localStorage.getItem('SearchCarIdOptions');
    if (storedOptionsString) {
      const storedOptions = JSON.parse(storedOptionsString);
      setStoredIDOptions(storedOptions);
    }
  }, []);

  // Add this useEffect to load stored options from local storage on component mount for the Car ID dropdown
  useEffect(() => {
    const storedIDOption = localStorage.getItem('SearchCarId');
    if (storedIDOption) {
      const parsedIDOption = JSON.parse(storedIDOption);
      setSelectedIDOption(parsedIDOption);
    }
  }, []);

  const customStyles = {
    container: provided => ({
      ...provided,
      width: '100%'
    })
  };

  const getData = () => {
    dispatch(getallBanners(null, setcards));
  };

  const handleSearchChangeID = val => {
    const { label, value } = val;
    navigate(`/collection?label=${label}&value=${value}`);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Box className='slidercss' >
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />

        <Box
          zIndex={1}
          left={{ base: '10px', md: '150px' }}
          top={{ base: '40px', md: '80px' }}
          position={{ base: 'absolute', md: 'absolute' }}
          textAlign={{ base: 'left', md: 'left' }}
          width={{ base: '100%', md: 'auto' }}
          
        >
          <Heading  className='headingcss' fontWeight="bold"  whiteSpace="nowrap">
            find your dreams
          </Heading>
          <Heading className='headingcss' fontWeight="bold"  whiteSpace="nowrap">
            car within a minute
          </Heading>
          <Text className='fontslidercss'
            fontWeight="bold"
           
            backdropFilter="blur(1px)"
          >
            Lorem Ipsum is simply dummy text of the printing
          </Text>
          <Text className='fontslidercss'
            fontWeight="bold"
          
            backdropFilter="blur(1px)"
          >
            and typesetting industry. Lorem Ipsum has been
          </Text>
          <Text className='fontslidercss'
            fontWeight="bold"
           
            backdropFilter="blur(1px)"
          >
            the industry's standard dummy
          </Text>
          <NavLink>
            <Button className='bookcss' style={{ backgroundColor: '#1097b1', color: '#fff' }}>
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
                  h={{ base: '200px', md: '450px' }}
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
        <Heading className="serach_heading " my="5">
          Select your car brand to get started
        </Heading>
        <Box className="centered-box fontcss">
      <InputGroup padding="10px" w={{ base: 'full', sm: '650px' }} size="lg" justifyContent={{ base: 'center', md: 'left' }} height={{ base: '48px', md: 'auto' }} >
        <InputLeftElement pointerEvents="none"></InputLeftElement>
        <Async
          loadOptions={loadOptionsSreachName}
          styles={customStyles}
          placeholder={'\u00A0\u00A0Search Car Name'}
          onChange={handleSelectSreachName}
          defaultOptions={RecantOptionsSreachName()}
          menuIsOpen={menuIsOpen}
        />
      </InputGroup>
      <InputGroup padding="10px" w={{ base: 'full', md: '650px' }} size="lg" justifyContent={{ base: 'center', md: 'left' }} marginLeft={{ base: '0', md: '20px' }} height={{ base: '48px', md: 'auto' }}>
        <InputLeftElement pointerEvents="none"></InputLeftElement>
        <Async
          loadOptions={loadOptionsSearchID}
          styles={customStyles}
          placeholder={'\u00A0\u00A0Search Car ID'}
          onChange={handleSelectSearchID}
          defaultOptions={RecentOptionsSearchID()}
          menuIsOpen={idmenuIsOpen}
        />
      </InputGroup>
    </Box>
      </Box>
    </>
  );
}
