import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  GridItem,
  Heading,
  Select,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Spacer,
  Spinner,
  Stack,
  Text,
  Wrap,
  WrapItem,
  Image
} from '@chakra-ui/react';
import axios from 'axios';
import { MdOutlineClear } from 'react-icons/md';
import { RxTimer } from 'react-icons/rx';
import { BASE_URL } from '../utils/config';
import ItemCard from '../Components/WebsiteComponents/ItemCard';
import Carousel from '../Components/WebsiteComponents/CarouselDetail';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { getCars } from '../Redux/App/Actions/Vendors/Car.action';
import Filters from '../Components/WebsiteComponents/Filters';
import bannertop from '../assets/Icons/image 1833.png';
import { useLocation } from 'react-router-dom';
import { FiRefreshCcw, FiX } from 'react-icons/fi';
import AsyncSelector from '../Components/Extra/AsyncSelect';
import { getAllCarNamess, getAllCar_Id } from '../Redux/App/Actions/Admin/CarComponents/CarName.action';
import PaginationBox from '../Components/Extra/Pagination';
import Async from 'react-select/async';

const initFilters = {
  minPrice: 0,
  maxPrice: 5000000,
  minKms: 0,
  maxKms: 50000,
  brands: [],
  bodytypes: [],
  features: [],
  transmission: [],
  owners: [],
  colors: [],
  seats: []
};

const SearchPage = () => {
  const dispatch = useDispatch();
  const [displayFilters, setDisplayFilters] = useState([]);
  const locat = useLocation();
  const queryParams = new URLSearchParams(locat.search);
  const q = queryParams.get('q') || '';
  const { location, loading } = useSelector(store => store?.CarManager);
  const [cars, setcars] = useState([]);
  const [totalCars, settotalCars] = useState(0);
  const [sortby, setsortby] = useState(q);
  const childRef = useRef();
  const [page, setPage] = useState(1);

  const [selectedOptions, setSelectedNameSreach] = useState(null);
  const [storedNameSreach, setStoredNameSreach] = useState([]);
  const [selectedOption, setSelectedIDOption] = useState(null);
  const [storedIDOptions, setStoredIDOptions] = useState([]);
  const [menuIsOpen, setMenuIsOpen] = useState();
  const [idmenuIsOpen, setIDMenuIsOpen] = useState();

  let tempfilters = {
    status: 'approved',
    minPrice: 0,
    location: location?._id || null,
    maxPrice: 5000000,
    minKms: 0,
    maxKms: 500000
  };

  const setPageData = data => {
    setcars(data?.Cars);
    settotalCars(data?.totalCars);
  };
  const [filters, setFilters] = useState(tempfilters);
  const [appliedFilters, setAppliedFilters] = useState({});

  const getData = () => {
    let data = {
      filters: { ...filters, location: location?._id || null },
      sortby,
      page,
      limit: 25
    };
    dispatch(getCars(setPageData, data));
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const nameParam = urlParams.get('name');
    const labelParam = urlParams.get('label');
    const valueParam = urlParams.get('value');

    if (nameParam) {
      const val = { _id: nameParam };
      handleSearchChangeDefult(val);
    } else if (labelParam && valueParam) {
      const val = { label: labelParam, value: valueParam };
      handleSearchChangeIDDefult(val);
    } else {
      getData();
    }
  }, [filters, displayFilters, sortby, location, page]);

  const refresh = e => {
    localStorage.removeItem('location_carvendor');
    setPage(1);
    window.location.href = '/collection';
  };

  const handleSearchChangeDefult = val => {
    let data = { search: { name: val._id } };
    setPage(1);
    dispatch(getCars(setPageData, data));
  };

  const handleSearchChangeIDDefult = val => {
    let data = { search: { carIds: val } };
    setPage(1);
    dispatch(getCars(setPageData, data));
  };

  const handleSelectSreachName = selectedOption => {
    const { value: _id } = selectedOption;
    const storedNameSreachString = localStorage.getItem('SreachcarnameOptions');
    const storedNameSreach = storedNameSreachString ? JSON.parse(storedNameSreachString) : [];
    const isOptionExists = storedNameSreach.some(option => option.value === _id);

    if (!isOptionExists) {
      const updatedOptions = [...storedNameSreach, { label: selectedOption.label, value: _id }];
      localStorage.setItem('SreachcarnameOptions', JSON.stringify(updatedOptions));
    }
    let data = { search: { name: _id } };
    setPage(1);
    dispatch(getCars(setPageData, data));
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
      console.log(indexToRemove);
      // Exclude the item to be removed from storedNameSreach
      const updatedOptions = storedNameSreach.filter((_, index) => index !== indexToRemove);

      // Update state to re-render without the removed item
      setStoredNameSreach(updatedOptions);

      // Update local storage
      localStorage.setItem('SreachcarnameOptions', JSON.stringify(updatedOptions));

      // Optionally, close the dropdown
      setMenuIsOpen(true);
    }
  };

  const RecantOptionsSreachName = () => {
    // Use storedNameSreach state instead of reading from local storage directly
    return storedNameSreach.map(permission => ({
      label: (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
      const val = { label: selectedOption.label, value: selectedOption.value };
      console.log(val);
      const updatedOptions = [...storedOptions, { label: selectedOption.label, value: selectedOption.value }];
      localStorage.setItem('SearchCarIdOptions', JSON.stringify(updatedOptions));
      let data = { search: { carIds: val } };
      setPage(1);
      dispatch(getCars(setPageData, data));
    } else {
      const val = { label: selectedLabel, value: selectedOption.value };
      let data = { search: { carIds: val } };
      setPage(1);
      dispatch(getCars(setPageData, data));
    }
  };

  const loadOptionsSearchID = async inputValue => {
    // If the user is typing, fetch data from the API
    if (inputValue) {
      try {
        const response = await axios.post(`${BASE_URL}/api/admin/carname/get-carId-sreach`, { carId: inputValue });

        if (response && response.data && response.data.carDetails) {
          const options = response.data.carDetails.map(permission => ({
            label: permission.Car_id,
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
      console.log(indexToRemove);
      // Exclude the item to be removed from storedOptions
      const updatedOptions = storedOptions.filter((_, index) => index !== indexToRemove);

      // Update state to re-render without the removed item
      setStoredIDOptions(updatedOptions);

      // Update local storage
      localStorage.setItem('SearchCarIdOptions', JSON.stringify(updatedOptions));
      setIDMenuIsOpen(true);
    }
  };

  const RecentOptionsSearchID = () => {
    // Use storedOptions state instead of reading from local storage directly
    return storedIDOptions.map(option => ({
      label: (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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

  const handleSearchChangeID = val => {
    console.log(val);
    let data = { search: { carIds: val } };
    setPage(1);
    dispatch(getCars(setPageData, data));
  };

  const callChildFunction = () => {
    childRef.current.clearFilter();
  };

  const correctFilter = newDisplay => {
    childRef.current.correctFilter(newDisplay);
  };
  const getDataReset = () => {
    setFilters(tempfilters);
  };
  const handleRemoveFilter = ({ name, key }) => {
    // Filter out the removed item from displayFilters
    let newDisplay = displayFilters.filter(fil => fil.name !== name);
    setDisplayFilters([...newDisplay]);

    // Create a copy of the current filters and modify the copy
    let updatedFilters = { ...filters };

    // Update the filters based on the key
    if (
      key === 'transmission' ||
      key === 'bodytypes' ||
      key === 'brands' ||
      key === 'features' ||
      key === 'owners' ||
      key === 'colors' ||
      key === 'seats'
    ) {
      // Filter out the removed item from the corresponding key's array
      updatedFilters[key] = updatedFilters[key].filter(item => item !== name);
    } else {
      // Add other key conditions here if needed
    }

    // Update the filters state with the modified copy
    setFilters(updatedFilters);

    // Call the correctFilter function with the updated filters
    correctFilter(updatedFilters);
  };
  const customStyles = {
    container: provided => ({
      ...provided,
      width: '100%'
    })
  };

  return (
    <>
      <Box>
        <Image //Main Image
          src={bannertop}
          w="100%"
          cursor="pointer"
        />
      </Box>
      <Box mt="3" mb="10" px={{ md: '5' }}>
        <Grid templateColumns="repeat(6, 1fr)" p="2" gap="5">
          <GridItem colSpan={{ base: '6', sm: '2', md: '1' }} align="center" textAlign={'left'}>
            <Filters
              ref={childRef}
              filters={filters}
              setFilters={setFilters}
              displayFilters={displayFilters}
              setDisplayFilters={setDisplayFilters}
              callChildFunction={callChildFunction}
            />
          </GridItem>
          <GridItem colSpan={{ base: '6', sm: '4', md: '5' }}>
            <Stack align="center" m="2">
              <Flex justify="space-between" w="100%">
                <Async
                  loadOptions={loadOptionsSreachName}
                  styles={customStyles}
                  placeholder={'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Search Car Name'}
                  onChange={handleSelectSreachName}
                  defaultOptions={RecantOptionsSreachName()}
                  menuIsOpen={menuIsOpen}
                />
                <Spacer flex="1" mx={2} />
                <Async
                  loadOptions={loadOptionsSearchID}
                  styles={customStyles}
                  placeholder={'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Search Car ID'}
                  onChange={handleSelectSearchID}
                  defaultOptions={RecentOptionsSearchID()}
                  menuIsOpen={idmenuIsOpen}
                />
                <Spacer flex="1" />
                <Button
                  mx={2}
                  flexShrink={0} // Prevent the button from shrinking
                  bg="teal"
                  color="white"
                  onClick={refresh}
                  rightIcon={<FiRefreshCcw />}
                >
                  Refresh
                </Button>
              </Flex>
            </Stack>
            {!!displayFilters.length && (
              <Wrap align={'start'} gap="2" m="5" width={'98%'}>
                <Button
                  colorScheme="orange"
                  size="sm"
                  bg="orange.300"
                  onClick={() => {
                    getDataReset();
                    setDisplayFilters([]);
                    //setFilters(initFilters);
                    callChildFunction();
                  }}
                >
                  CLEAR ALL
                </Button>{' '}
                {!!displayFilters.length &&
                  displayFilters.map((filter, i) => {
                    return (
                      <WrapItem key={i}>
                        <Button size="sm" rightIcon={<FiX />} onClick={() => handleRemoveFilter(filter)}>
                          {filter.name}
                        </Button>
                      </WrapItem>
                    );
                  })}
              </Wrap>
            )}
            <Flex align={'center'} gap="2" m="2">
              <Text fontWeight={'bold'} m="3" fontSize={'20'}>
                {totalCars || 0} Used Cars in {location?.name || 'India'}
              </Text>{' '}
              <Spacer />
              <Text display={{ base: 'none', md: 'flex' }}>SORT BY:</Text>
              <Select
                placeholder="All"
                w={{ base: '40%', md: '20%' }}
                bg="gray.50"
                value={sortby}
                onChange={e => {
                  setsortby(e.target.value);
                }}
              >
                <option value={'trending_car'}>Trending</option>
                {/* <option value={"featured_car"}>Featured </option> */}
                <option value={'hotdeal_car'}>Hot Deals</option>
                {/* <option value={"upcoming_car"}>Upcoming </option>
                <option value={"low_to_high"}>Low to High</option>
                <option value={"high_to_low"}>High to Low</option> */}
              </Select>
            </Flex>

            {loading ? (
              <Grid templateColumns="repeat(12, 1fr)">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(index => {
                  return (
                    <GridItem key={index} as="div" colSpan={{ base: 12, md: 4 }} p="5" borderRadius={'10px'} boxShadow="lg" bg="white" m={5}>
                      <Skeleton bg="white" h="250px" />
                      <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="2" />
                    </GridItem>
                  );
                })}
              </Grid>
            ) : cars?.length > 0 ? (
              <SimpleGrid
                templateColumns={{
                  base: '1fr',
                  md: '1fr 1fr 1fr '
                }}
              >
                {cars?.map((card, index) => (
                  <ItemCard
                    key={card._id}
                    name={card.name.name}
                    price={card.price}
                    imageURL={card.primary_image}
                    year={card.regYear}
                    km={card.km_driven}
                    fuel={card.fuel_type}
                    _id={card._id}
                    state={card?.regState?.state_code}
                    booking_status={card.booking_status}
                    like_status={card.Like_status}
                    Car_id={card?.Car_id}
                  />
                ))}
              </SimpleGrid>
            ) : (
              <Box w={'full'} h={'full'} textAlign={'center'}>
                <Heading as="h1" size="2xl" my={4} fontWeight="bold" color={'gray.400'}>
                  Total Results 0
                </Heading>

                <Text fontSize="sm" color={'gray'}>
                  No Cars Found.
                </Text>
              </Box>
            )}
            {totalCars > 25 && <PaginationBox total={totalCars || 0} page={page} setpage={setPage} />}
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default SearchPage;
