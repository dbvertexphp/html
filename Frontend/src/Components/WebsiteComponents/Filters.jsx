import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Flex,
  Spinner,
  Stack,
  Text
} from '@chakra-ui/react';
import { RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb } from '@chakra-ui/react';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import IndianNumberSystem from '../../utils/IndianNumSystem';
import { getBodyTypes } from '../../Redux/App/Actions/Admin/CarComponents/BodyType.action';
import { getCarModels } from '../../Redux/App/Actions/Admin/CarComponents/CarModel.action';
import { getCarName } from '../../Redux/App/Actions/Admin/CarComponents/CarName.action';
import { getMakes } from '../../Redux/App/Actions/Admin/CarComponents/Make.action';
import { getColors } from '../../Redux/App/Actions/Admin/CarComponents/Color.action';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { featureArray, safetyFeatureArray } from '../../utils/CarFeatures';

function Filters({ filters, setFilters, displayFilters, setDisplayFilters, callChildFunction }, ref) {
  let dispatch = useDispatch();

  const { allColors, allMakes, allBodyTypes, loading, error } = useSelector(state => state?.CarComponentManager);

  const [showFilter, setShowFilter] = useState(true);
  const [brands, setbrands] = useState([]);
  const [bodytypes, setbodytypes] = useState([]);
  const [features, setfeatures] = useState([]);
  const [transmission, settransmission] = useState([]);
  const [owners, setowners] = useState([]);
  const [colors, setcolors] = useState([]);
  const [seats, setseats] = useState([]);

  const [kmsdriven, setkmsdriven] = useState({ minKms: 0, maxKms: 5000000 });
  const [price, setprice] = useState({
    minPrice: 0,
    maxPrice: 50000000
  });

  const clearFilter = () => {
    setbrands([]);
    setbodytypes([]);
    setfeatures([]);
    settransmission([]);
    setowners([]);
    setcolors([]);
    setseats([]);
    setkmsdriven({ minKms: 0, maxKms: 5000000 });
    setprice({
      minPrice: 0,
      maxPrice: 50000000
    });
  };

  const correctFilter = newDisplay => {
    filterAndSetArray(brands, newDisplay, setbrands);
    filterAndSetArray(bodytypes, newDisplay, setbodytypes);
    filterAndSetArray(features, newDisplay, setfeatures);
    filterAndSetArray(transmission, newDisplay, settransmission);
    filterAndSetArray(owners, newDisplay, setowners);
    filterAndSetArray(colors, newDisplay, setcolors);
    filterAndSetArray(seats, newDisplay, setseats);
  };

  // Expose the doSomething function to the parent component using useImperativeHandle
  useImperativeHandle(ref, () => ({
    clearFilter,
    correctFilter
  }));

  const handleAddFilter = (e, data, setData, key) => {
    let { name, checked } = e.target;

    if (displayFilters.includes(name)) {
      let newDisplay = displayFilters?.filter(item => item !== name);
      setDisplayFilters(newDisplay);
      console.log('New Display:', newDisplay);
      // Remove the filter from the payload if it exists
      let tempPayload = data.filter(el => el !== name);
      setData(tempPayload);

      setFilters(prev => ({
        ...prev,
        ...price,
        ...kmsdriven,
        [key]: tempPayload
      }));
    } else {
      // Add the filter to the displayFilters and payload
      setDisplayFilters([...displayFilters, name]);

      let payload;

      if (checked && data.includes(name)) {
        return;
      } else if (checked && !data.includes(name)) {
        payload = [...data, name];
      } else {
        let temp = data.filter(el => el !== name);
        payload = temp;
      }

      setData(payload);

      setFilters(prev => ({
        ...prev,
        ...price,
        ...kmsdriven,
        [key]: payload
      }));
    }
  };

  const setMinMaxPrice = (min, max) => {
    let price = {
      minPrice: min,
      maxPrice: max
    };
    setprice(price);
    setFilters(prev => ({ ...prev, ...price }));
  };

  const getData = () => {
    dispatch(getBodyTypes());
    dispatch(getCarModels());
    dispatch(getCarName());
    dispatch(getMakes());
    dispatch(getColors());
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box position={{ md: 'sticky' }} top={{ md: '85px' }}>
      <Flex display={{ base: 'flex', md: 'none' }} px="4" justify={'end'}>
        <Button textAlign={'end'} size="xs" onClick={() => setShowFilter(!showFilter)}>
          {showFilter ? 'Hide Filters' : ' Show Filters'}
        </Button>
      </Flex>

      {showFilter && (
        <>
          <Text fontWeight={'semibold'} px="4" my="3">
            Filters:
          </Text>
          <Accordion allowMultiple>
            <AccordionItem>
              <AccordionButton flex="1" fontWeight={'semibold'}>
                <Box as="span" flex="1" textAlign="left">
                  Brands
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Stack height={'200px'} overflowY={'auto'}>
                  {allMakes?.length > 0 ? (
                    <>
                      {allMakes.map(el => {
                        return (
                          <Checkbox
                            key={el?._id}
                            name={el?.name}
                            isChecked={brands.includes(el?.name)}
                            onChange={e => handleAddFilter(e, brands, setbrands, 'brands')}
                          >
                            {el?.name}
                          </Checkbox>
                        );
                      })}
                    </>
                  ) : (
                    <Spinner />
                  )}
                </Stack>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton fontWeight={'semibold'}>
                <Box as="span" flex="1" textAlign="left">
                  Body Type
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Stack height={'200px'} overflowY={'auto'}>
                  {allBodyTypes?.length > 0 ? (
                    <>
                      {allBodyTypes.map(el => {
                        return (
                          <Checkbox
                            key={el?._id}
                            name={el?.name}
                            isChecked={bodytypes.includes(el?.name)}
                            onChange={e => handleAddFilter(e, bodytypes, setbodytypes, 'bodytypes')}
                          >
                            {el?.name}
                          </Checkbox>
                        );
                      })}
                    </>
                  ) : (
                    <Spinner />
                  )}
                </Stack>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton fontWeight={'semibold'}>
                <Box as="span" flex="1" textAlign="left">
                  Price Range
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Flex justifyContent={'space-between'}>
                  <Text>{IndianNumberSystem(price.minPrice)}</Text>
                  <Text>{IndianNumberSystem(price.maxPrice)}</Text>
                </Flex>
                <RangeSlider
                  value={[price.minPrice, price.maxPrice]}
                  min={0}
                  max={5000000}
                  step={25000}
                  onChange={val => {
                    let price = {
                      minPrice: val[0],
                      maxPrice: val[1]
                    };
                    setprice(price);
                    setFilters(prev => ({ ...prev, ...price }));
                  }}
                >
                  <RangeSliderTrack bg="teal.100">
                    <RangeSliderFilledTrack bg="teal" />
                  </RangeSliderTrack>
                  <RangeSliderThumb index={0} boxSize={2} />
                  <RangeSliderThumb index={1} boxSize={2} />
                </RangeSlider>
                <Box>
                  Suggestions <br />
                  <Button size="xs" variant={'outline'} onClick={() => setMinMaxPrice(0, 300000)}>
                    Under 3 Lakhs
                  </Button>
                  <Button size="xs" variant={'outline'} onClick={() => setMinMaxPrice(300000, 600000)}>
                    From 3 Lakhs - 6 Lakhs
                  </Button>
                  <Button size="xs" variant={'outline'} onClick={() => setMinMaxPrice(600000, 900000)}>
                    From 6 Lakhs - 9 Lakhs
                  </Button>
                  <Button size="xs" variant={'outline'} onClick={() => setMinMaxPrice(900000, 1200000)}>
                    From 9 Lakhs - 12 Lakhs
                  </Button>
                  <Button size="xs" variant={'outline'} onClick={() => setMinMaxPrice(1200000, 1500000)}>
                    From 12 Lakhs - 15 Lakhs
                  </Button>
                  <Button size="xs" variant={'outline'} onClick={() => setMinMaxPrice(1500000, 50000000)}>
                    above 15 Lakhs
                  </Button>
                  <Button size="xs" variant={'outline'} color="red.400" mx={1} onClick={() => setMinMaxPrice(0, 50000000)}>
                    Reset
                  </Button>
                </Box>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton fontWeight={'semibold'}>
                <Box as="span" flex="1" textAlign="left">
                  Colour
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Stack height={'200px'} overflowY={'auto'}>
                  {allColors?.length > 0 ? (
                    <>
                      {allColors.map(el => {
                        return (
                          <Checkbox
                            key={el?._id}
                            name={el?.name}
                            isChecked={colors.includes(el?.name)}
                            onChange={e => handleAddFilter(e, colors, setcolors, 'colors')}
                          >
                            {el?.name}
                          </Checkbox>
                        );
                      })}
                    </>
                  ) : (
                    <Spinner />
                  )}
                </Stack>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton fontWeight={'semibold'}>
                <Box as="span" flex="1" textAlign="left">
                  Features
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Stack height={'200px'} overflowY={'auto'}>
                  {featureArray?.length > 0 ? (
                    <>
                      {featureArray.slice(2).map(el => {
                        return (
                          <Checkbox
                            key={el?.value}
                            name={el?.value}
                            isChecked={features.includes(el.value)}
                            onChange={e => handleAddFilter(e, features, setfeatures, 'features')}
                          >
                            {el?.value}
                          </Checkbox>
                        );
                      })}
                    </>
                  ) : (
                    <Spinner />
                  )}
                </Stack>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton fontWeight={'semibold'}>
                <Box as="span" flex="1" textAlign="left">
                  Transmission
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Stack>
                  <Checkbox
                    name="automatic"
                    isChecked={transmission.includes('automatic')}
                    onChange={e => handleAddFilter(e, transmission, settransmission, 'transmission')}
                  >
                    Automatic
                  </Checkbox>
                  <Checkbox
                    name="manual"
                    isChecked={transmission.includes('manual')}
                    onChange={e => handleAddFilter(e, transmission, settransmission, 'transmission')}
                  >
                    Manual
                  </Checkbox>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton fontWeight={'semibold'}>
                <Box as="span" flex="1" textAlign="left">
                  Owners
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Stack>
                  <Checkbox name="First" isChecked={owners.includes('First')} onChange={e => handleAddFilter(e, owners, setowners, 'owners')}>
                    1st owner
                  </Checkbox>
                  <Checkbox name="Second" isChecked={owners.includes('Second')} onChange={e => handleAddFilter(e, owners, setowners, 'owners')}>
                    2nd owner
                  </Checkbox>
                  <Checkbox name="Third" isChecked={owners.includes('Third')} onChange={e => handleAddFilter(e, owners, setowners, 'owners')}>
                    3rd owner
                  </Checkbox>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton fontWeight={'semibold'}>
                <Box as="span" flex="1" textAlign="left">
                  Seats
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Stack>
                  <Checkbox name="2" isChecked={seats.includes('2')} onChange={e => handleAddFilter(e, seats, setseats, 'seats')}>
                    2 seater
                  </Checkbox>
                  <Checkbox name="4" isChecked={seats.includes('4')} onChange={e => handleAddFilter(e, seats, setseats, 'seats')}>
                    4 seater
                  </Checkbox>
                  <Checkbox name="5" isChecked={seats.includes('5')} onChange={e => handleAddFilter(e, seats, setseats, 'seats')}>
                    5 seater
                  </Checkbox>
                  <Checkbox name="6" isChecked={seats.includes('6')} onChange={e => handleAddFilter(e, seats, setseats, 'seats')}>
                    6 seater
                  </Checkbox>
                  <Checkbox name="7" isChecked={seats.includes('7')} onChange={e => handleAddFilter(e, seats, setseats, 'seats')}>
                    7 seater
                  </Checkbox>
                  <Checkbox name="8" isChecked={seats.includes('8')} onChange={e => handleAddFilter(e, seats, setseats, 'seats')}>
                    8 seater
                  </Checkbox>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton fontWeight={'semibold'}>
                <Box as="span" flex="1" textAlign="left">
                  Kms Driven
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Flex justifyContent={'space-between'}>
                  <Text>{IndianNumberSystem(kmsdriven.minKms)}</Text>
                  <Text>{IndianNumberSystem(kmsdriven.maxKms)}</Text>
                </Flex>
                <RangeSlider
                  defaultValue={[0, 5000000]}
                  min={0}
                  max={5000000}
                  step={500}
                  checked={brands.includes('Audi')}
                  onChangeEnd={val => {
                    setkmsdriven({
                      minKms: val[0],
                      maxKms: val[1]
                    });
                    setFilters(prev => ({
                      ...prev,
                      minKms: val[0],
                      maxKms: val[1]
                    }));
                  }}
                >
                  <RangeSliderTrack bg="teal.100">
                    <RangeSliderFilledTrack bg="teal" />
                  </RangeSliderTrack>
                  <RangeSliderThumb index={0} boxSize={5} />
                  <RangeSliderThumb index={1} boxSize={5} />
                </RangeSlider>
              </AccordionPanel>
            </AccordionItem>{' '}
          </Accordion>{' '}
        </>
      )}
    </Box>
  );
}

function filterAndSetArray(inputArray, displayFilters, setStateFunction) {
  const filteredArray = inputArray.filter(item => displayFilters.includes(item));
  setStateFunction(filteredArray);
}

export default forwardRef(Filters);
