import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Text,
  Textarea,
  useDisclosure,
  useToast
} from '@chakra-ui/react';

import React, { useState } from 'react';
import { FiPlusCircle, FiPlusSquare, FiX, FiXCircle } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBodyTypes } from '../../../Redux/App/Actions/Admin/CarComponents/BodyType.action';
import { getCarModels } from '../../../Redux/App/Actions/Admin/CarComponents/CarModel.action';
import { getMakes } from '../../../Redux/App/Actions/Admin/CarComponents/Make.action';
import { postCar } from '../../../Redux/App/Actions/Vendors/Car.action';
import { useEffect } from 'react';
import InputUploadMultiple from '../../Extra/InputMultipleUpload';
import { getColors } from '../../../Redux/App/Actions/Admin/CarComponents/Color.action';
import { getLocations } from '../../../Redux/App/Actions/Admin/CarComponents/Location.action';
import { getCarName } from '../../../Redux/App/Actions/Admin/CarComponents/CarName.action';
import InputUpload from '../../Extra/InputUpload';
import DocumentModal from '../../Extra/DocumentModal';
import { ColorSelect, StateSelect } from '../../Extra/CustomSelect';
import { featureArray, safetyFeatureArray, documentsArray } from '../../../utils/CarFeatures';

const initial = {
  vendorID: '',
  name: '',
  cname: '',
  cmake: '',
  cmodel: '',
  make: '',
  model: '',
  body_type: '',
  short_description: '',
  description: '',
  color: '',
  ownership: '',
  price: '',
  km_driven: '',
  primary_image: '',
  gallery_images: '',
  engine_displacment: '',
  engine_type: '',
  mileage: '',
  wheel_size: '',
  condition: '',
  transmission: '',
  seats: '',
  fuel_type: '',

  features: [],
  safety_features: [],

  location: [],
  VIN: '',
  warranty: '4',
  license_number: '',
  ownership_history: '',

  owner_name: '',
  owner_email: '',
  owner_mobile: '',
  owner_location: '',

  documents: [],
  regState: '',
  regYear: ''
};

const AddCar = () => {
  let { Vendor_detail, token } = useSelector(store => store?.VendorAuthManager);
  const vendor = Vendor_detail || JSON.parse(localStorage.getItem('vendor_detail_carvendor'));
  let vendortoken = token || JSON.parse(localStorage.getItem('vendor_token_carvendor'));

  const [formData, setFormData] = useState(initial);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [singleDocument, setSingleDocument] = useState({});

  const [features, setfeatures] = useState([]);
  const [safetyFeatures, setSafetyFeatures] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const [refreshDocUpload, setRefreshDocUpload] = useState(false);
  const toast = useToast();

  const {
    loading,
    error,

    allLocations,
    allColors,
    allMakes,
    allCarNames,
    allBodyTypes,
    allCarModels
  } = useSelector(state => state?.CarComponentManager);
  const { loading: isCarLoading } = useSelector(state => state?.CarManager);

  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      features: features
    }));
  }, [features]);

  // Update formData when safetyFeatures state changes
  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      safety_features: safetyFeatures
    }));
  }, [safetyFeatures]);

  // Update formData when selectedLocations state changes
  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      location: selectedLocations
    }));
  }, [selectedLocations]);

  const handleSubmit = e => {
    e.preventDefault();

    let data = formData;
    data.vendorID = Vendor_detail?._id ? Vendor_detail?._id : vendor?._id;
    data.price = +data.price;
    data.km_driven = +data.km_driven;
    data.engine_displacment = +data.engine_displacment;
    data.wheel_size = +data.wheel_size;
    data.seats = +data.seats;
    data.mileage = +data.mileage;

    for (const key in data) {
      console.log(formData.features);
      console.log(formData.safety_features);
      console.log(formData.location);
      if (key === 'VIN' || key === 'license_number' || key === 'ownership_history' || key === 'documents') {
        continue;
      }
      if (formData.owner_mobile.length !== 10) {
        return toast({
          title: `Please Enter 10 Digit Number`,
          status: 'error',
          position: 'top',
          duration: 4000
        });
      }
      if (data[key] == '' || data[key] == null || data[key] == undefined) {
        return toast({
          title: `Please Enter ${key?.toLocaleUpperCase()}`,
          status: 'error',
          position: 'top',
          duration: 4000
        });
      }
    }

    dispatch(postCar(data, navigate, toast, getData, vendortoken));
  };

  const handleAddDocument = () => {
    let isPresent = formData?.documents.find(el => el.label === singleDocument.label);

    if (isPresent)
      return toast({
        position: 'top',
        title: 'Alredy Added',
        status: 'warning',
        duration: 4000,
        isClosable: true
      });
    if (singleDocument.label && singleDocument.doc) {
      setFormData({
        ...formData,
        documents: [...formData?.documents, singleDocument]
      });

      toast({
        position: 'top',
        title: `Successfully Added ${singleDocument.label}`,
        status: 'success',
        duration: 4000,
        isClosable: true
      });
      setSingleDocument({});
      setRefreshDocUpload(previous => !previous);
    }
  };

  const handeDeleteDocument = label => {
    let filtered = formData?.documents?.filter(el => el.label !== label);
    setFormData({ ...formData, documents: filtered });
    return toast({
      position: 'top',
      title: `${label} removed`,
      status: 'success',
      duration: 4000,
      isClosable: true
    });
  };

  const handleDetailsChange = e => {
    const { name, value } = e.target;

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSafetyFeatures = () => {
    let safe = document.getElementById('selectSafetyFeatures')?.value;
    if (safetyFeatures.includes(safe) || !safe) {
      return toast({
        position: 'top',
        title: !safe ? 'Please select a Safety feature' : 'Safety feature Already Added',
        status: 'info',
        duration: 4000,
        isClosable: true
      });
    }
    if (safe == 'all') {
      let allSafeFeaturesArr = safetyFeatureArray.slice(2).map(el => {
        return el.value;
      });
      setSafetyFeatures(allSafeFeaturesArr);
      setFormData({
        ...formData,
        safety_features: allSafeFeaturesArr
      });
    } else {
      let newsafearr = [...safetyFeatures, safe];
      setSafetyFeatures(newsafearr);
      setFormData({
        ...formData,
        safety_features: newsafearr
      });
    }
    toast({
      position: 'top',
      title: 'Added to List',
      status: 'success',
      duration: 4000,
      isClosable: true
    });
  };

  const handleLocation = () => {
    let locat = document.getElementById('selectLocation')?.value;
    if (selectedLocations.includes(locat) || !locat) {
      return toast({
        position: 'top',
        title: !locat ? 'Please select a Location' : 'Location Already Added',
        status: 'info',
        duration: 4000,
        isClosable: true
      });
    }
    if (locat == 'all') {
      let temp = [];
      allLocations.forEach(el => {
        temp.push(el._id);
      });
      let aLocations = temp;
      setSelectedLocations(temp);
      setFormData({
        ...formData,
        location: aLocations
      });
    } else {
      let newSelectedLocations = [...selectedLocations, locat];
      setSelectedLocations(newSelectedLocations);
      setFormData({
        ...formData,
        location: newSelectedLocations
      });
    }
    toast({
      position: 'top',
      title: 'Added to List',
      status: 'success',
      duration: 4000,
      isClosable: true
    });
  };

  const handlefeatures = () => {
    let fea = document.getElementById('selectFeature')?.value;
    if (features.includes(fea) || !fea) {
      return toast({
        position: 'top',
        title: !fea ? 'Please select a Feature' : 'Feature Already Added',
        status: 'info',
        duration: 4000,
        isClosable: true
      });
    }
    if (fea == 'all') {
      let allFeaturesArr = featureArray.slice(2).map(el => {
        return el.value;
      });
      setfeatures(allFeaturesArr);
      setFormData({
        ...formData,
        features: allFeaturesArr
      });
    } else {
      let newfeaarr = [...features, fea];
      setfeatures(newfeaarr);
      setFormData({
        ...formData,
        features: newfeaarr
      });
    }
    toast({
      position: 'top',
      title: 'Added to List',
      status: 'success',
      duration: 4000,
      isClosable: true
    });
  };

  const HandleUploadSomeImages = images => {
    setFormData(prevFormData => ({
      ...prevFormData,
      gallery_images: [...prevFormData.gallery_images, ...images]
    }));
  };
  const DeleteImageFromForm = image => {
    let temp = formData?.gallery_images.filter(el => el != image);
    setFormData(prevFormData => ({
      ...prevFormData,
      gallery_images: temp
    }));
  };
  const getData = () => {
    dispatch(getBodyTypes());
    dispatch(getCarModels());
    dispatch(getCarName());
    dispatch(getMakes());
    dispatch(getColors());
    dispatch(getLocations());

    setFormData({
      ...formData,
      vendorID: Vendor_detail?._id
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <Container
        as="form"
        maxW="container"
        // border="0.4px solid"
        borderRadius="5px"
        mb="10"
        padding={'20px'}
        onSubmit={handleSubmit}
      >
        <Grid templateColumns="repeat(12, 1fr)">
          <GridItem as="div" colSpan={{ base: 6, md: 12 }} p="10px">
            <Text mb="2" fontWeight={'500'} fontSize="1.5rem">
              Car Overview Details :
            </Text>
          </GridItem>

          <GridItem as="div" colSpan={{ base: 12, md: 12 }} p="20px " borderRadius={'10px'} backgroundColor={'white'}>
            <Grid templateColumns="repeat(12, 1fr)">
              <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                <FormLabel>Select Brand</FormLabel>
                <Select
                  type="text"
                  name="cmake"
                  defaultValue={formData?.cmake}
                  onChange={e => {
                    let x = e.target.value;
                    let el = allMakes.find(el => el._id == x);
                    setFormData(prev => {
                      return { ...prev, cmake: el.name, make: el._id };
                    });
                  }}
                >
                  <option value="">Select brand</option>
                  {allMakes?.length > 0 &&
                    allMakes?.map(item => {
                      return (
                        <option key={item._id + 'sadfsad'} value={item._id}>
                          {item?.name}
                        </option>
                      );
                    })}
                </Select>
              </GridItem>

              <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                <FormLabel>Select Model</FormLabel>
                <Select
                  type="text"
                  name="cmodel"
                  defaultValue={formData?.cmodel}
                  onChange={e => {
                    let x = e.target.value;
                    let el = allCarModels.find(el => el._id == x);

                    setFormData(prev => {
                      return { ...prev, cmodel: el.name, model: el._id };
                    });
                  }}
                >
                  <option value="">Select model</option>
                  {allCarModels?.length > 0 &&
                    allCarModels
                      ?.filter(el => el.make_id === formData?.make)
                      .map(item => {
                        return (
                          <option key={item._id + 'sadfsad'} value={item._id}>
                            {item?.name}
                          </option>
                        );
                      })}
                </Select>
              </GridItem>

              <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                <FormLabel>Select Car Name</FormLabel>
                <Select
                  type="text"
                  name="name"
                  onChange={e => {
                    let x = e.target.value;
                    let el = allCarNames?.find(el => el._id == x);
                    setFormData(prev => {
                      return { ...prev, cname: el.name, name: el._id };
                    });
                  }}
                >
                  <option value="">Select car name</option>
                  {allCarNames?.length > 0 &&
                    allCarNames
                      ?.filter(el => el.make_id == formData?.make)
                      ?.map(item => {
                        return (
                          <option key={item._id + 'sadfsad'} value={item._id}>
                            {item?.name}
                          </option>
                        );
                      })}
                </Select>
              </GridItem>

              <GridItem as="div" colSpan={{ base: 12, md: 3 }} p="10px">
                <FormLabel>Primary Image</FormLabel>
                <InputUpload
                  isRequired={true}
                  color={'gray'}
                  acceptData="image/*"
                  HandleUploadSomeImages={image => {
                    setFormData(prevFormData => ({
                      ...prevFormData,
                      primary_image: image
                    }));
                  }}
                  border={'3px dotted gray'}
                  UploadText={'Upload Primary image'}
                />
              </GridItem>

              <GridItem as="div" colSpan={{ base: 12, md: 9 }} p="10px">
                <FormLabel>Gallery Image</FormLabel>
                <InputUploadMultiple
                  isRequired={true}
                  acceptData="image/*"
                  HandleUploadSomeImages={HandleUploadSomeImages}
                  UploadText={'Upload Gallery Images'}
                />
              </GridItem>

              {formData?.primary_image && (
                <GridItem as="div" colSpan={{ base: 12, md: 3 }} px="10px">
                  <Flex
                    flexDirection={'column'}
                    alignItems={'center'}
                    justifyContent={'start'}
                    bg={'gray.50'}
                    borderRadius={'5px'}
                    p="5px"
                    border={'1px solid #ddd'}
                  >
                    <Image
                      mt={5}
                      mx={1}
                      src={formData?.primary_image}
                      alt="carimage"
                      w={'200px'}
                      h={'150px'}
                      objectPosition={'center'}
                      objectFit={'cover'}
                      border={'1px solid #ddd'}
                    />
                    <Flex alignItems={'center'} justifyContent={'space-between'} p={'2'}>
                      <Text px={2}>Primary</Text>
                      <Button size={'xs'} bg={'white'} onClick={() => setFormData({ ...formData, primary_image: '' })}>
                        <FiXCircle />
                      </Button>
                    </Flex>
                  </Flex>
                </GridItem>
              )}

              {formData?.gallery_images?.length > 0 && (
                <GridItem as="div" colSpan={{ base: 12, md: 9 }} px="10px">
                  <Flex bg={'gray.50'} borderRadius={'5px'} p="5px" overflowX={'auto'} width={'full'} border={'1px solid #ddd'}>
                    {formData?.gallery_images?.length > 0 &&
                      formData?.gallery_images?.map((el, index) => {
                        return (
                          <Flex key={index + 'adsfsadhf'} flexDirection={'column'} alignItems={'center'} justifyContent={'start'}>
                            <Image
                              mt={5}
                              mx={1}
                              src={el}
                              alt="carimage"
                              minW={'200px'}
                              h={'150px'}
                              objectPosition={'center'}
                              objectFit={'cover'}
                              border={'1px solid #ddd'}
                            />
                            <Flex alignItems={'center'} justifyContent={'space-between'} p={'2'}>
                              <Button size={'xs'} bg={'white'} onClick={() => DeleteImageFromForm(el)}>
                                <FiXCircle />
                              </Button>
                            </Flex>
                          </Flex>
                        );
                      })}
                  </Flex>
                </GridItem>
              )}

              <GridItem as="div" colSpan={{ base: 12, md: 12 }} p="10px">
                <FormLabel>Add Short Description</FormLabel>
                <Input
                  isRequired={true}
                  placeholder="Enter Short Description"
                  type="text"
                  name="short_description"
                  defaultValue={formData?.short_description}
                  onChange={handleDetailsChange}
                />
              </GridItem>
              <GridItem as="div" colSpan={{ base: 12, md: 12 }} p="10px">
                <FormLabel> Add Long Description</FormLabel>
                <Textarea
                  placeholder="Enter Description"
                  type="text"
                  name="description"
                  defaultValue={formData?.description}
                  onChange={handleDetailsChange}
                />
              </GridItem>

              <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                <FormLabel>Select Body Type</FormLabel>
                <Select
                  type="text"
                  name="body_type"
                  defaultValue={formData?.body_type}
                  onChange={e => {
                    let x = e.target.value;
                    let el = allBodyTypes.find(el => el._id == x);
                    setFormData(prev => {
                      return {
                        ...prev,
                        cbody_type: el.name,
                        body_type: el._id
                      };
                    });
                  }}
                >
                  <option value="">Select body type</option>
                  {allBodyTypes?.length > 0 &&
                    allBodyTypes?.map(item => {
                      return (
                        <option key={item._id + 'df435f'} value={item._id}>
                          {item?.name}
                        </option>
                      );
                    })}
                </Select>
              </GridItem>

              <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                <FormLabel>Enter Year </FormLabel>
                <Input
                  isRequired={true}
                  placeholder="Enter Year"
                  type="month"
                  name="regYear"
                  defaultValue={formData?.regYear}
                  onChange={handleDetailsChange}
                />
              </GridItem>

              <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                <FormLabel>Choose Primary Color</FormLabel>
                <ColorSelect
                  colors={allColors}
                  HandleChange={e => {
                    setFormData(prev => ({
                      ...prev,
                      color: e.target.value,
                      ccolor: e.target.label
                    }));
                  }}
                  name="color"
                />{' '}
              </GridItem>

              <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                <FormLabel>Choose Ownership </FormLabel>
                <Select type="text" name="ownership" defaultValue={formData?.ownership} onChange={handleDetailsChange}>
                  <option value="">Select ownership-</option>
                  <option value="First">First</option>
                  <option value="Second">Second</option>
                  <option value="third">third</option>
                </Select>
              </GridItem>

              <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                <FormLabel>Enter Total Driven(km) :</FormLabel>
                <Input
                  isRequired={true}
                  placeholder="Enter Distance travelled"
                  type="number"
                  name="km_driven"
                  defaultValue={formData?.km_driven}
                  onChange={handleDetailsChange}
                />
              </GridItem>

              <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                <FormLabel>Enter Price :</FormLabel>

                <InputGroup>
                  <InputLeftAddon children="₹" />
                  <Input
                    isRequired={true}
                    placeholder="Enter Price"
                    type="text"
                    name="price"
                    defaultValue={formData?.price}
                    onChange={handleDetailsChange}
                  />
                </InputGroup>
              </GridItem>
            </Grid>
          </GridItem>

          <GridItem as="div" colSpan={{ base: 6, md: 12 }} p="10px">
            <Text mb="2" fontWeight={'500'} fontSize="1.5rem">
              Additional Details :
            </Text>
          </GridItem>

          <GridItem as="div" colSpan={{ base: 12, md: 12 }} p="20px " borderRadius={'10px'} backgroundColor={'white'}>
            <Grid templateColumns="repeat(12, 1fr)">
              <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                <FormLabel>Engine Displacement</FormLabel>
                <InputGroup>
                  <Input
                    isRequired={true}
                    placeholder=""
                    type="text"
                    name="engine_displacment"
                    defaultValue={formData?.engine_displacment}
                    onChange={handleDetailsChange}
                  />
                  <InputRightAddon children="cc" />
                </InputGroup>
              </GridItem>

              <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                <FormLabel>Select Engine Type</FormLabel>
                <Select type="text" name="engine_type" defaultValue={formData?.engine_type} onChange={handleDetailsChange}>
                  <option value="">Select type</option>
                  <option value="Inline-4">Inline-4</option>
                  <option value="V8">V8</option>
                  <option value="V6">V6</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                  <option value="SuperCharged">SuperCharged</option>
                  <option value="TurboCharged">TurboCharged</option>
                  <option value="Diseal">Diseal</option>
                  <option value="Mid-Hybrid">Mid-Hybrid</option>
                  <option value="Rotary">Rotary</option>
                </Select>
              </GridItem>

              <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                <FormLabel>Enter Mileage</FormLabel>
                <InputGroup>
                  <Input
                    isRequired={true}
                    placeholder="in km"
                    type="text"
                    name="mileage"
                    defaultValue={formData?.mileage}
                    onChange={handleDetailsChange}
                  />
                  <InputRightAddon children="Km/L" />
                </InputGroup>
              </GridItem>

              <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                <FormLabel>Enter Wheel Size</FormLabel>
                <InputGroup>
                  <Input
                    isRequired={true}
                    placeholder="in inches"
                    type="text"
                    name="wheel_size"
                    defaultValue={formData?.wheel_size}
                    onChange={handleDetailsChange}
                  />
                  <InputRightAddon children="in" />
                </InputGroup>
              </GridItem>

              <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                <FormLabel>Select Condition</FormLabel>
                <Select type="text" name="condition" defaultValue={formData?.condition} onChange={handleDetailsChange}>
                  <option value="">Select condition</option>
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                  <option value="Like New">Like New</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Refurbished">Refurbished</option>
                  <option value="Damaged">Damaged</option>
                  <option value="Open Box">Open Box</option>
                  <option value="Salvage">Salvage</option>
                  <option value="Antique Vintage">Antique/Vintage</option>
                  <option value="Collectible">Collectible</option>
                </Select>
              </GridItem>
              <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                <FormLabel>Select Transmission</FormLabel>
                <Select type="text" name="transmission" defaultValue={formData?.transmission} onChange={handleDetailsChange}>
                  <option value="">Select transmission</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                  <option value="Continuously Variable Valve Transmission (CVVT)">Continuously Variable Valve Transmission (CVVT)</option>
                  <option value="DirectShift Gearbox">DirectShift Gearbox (DSG)</option>
                  <option value="Tiptronic">Tiptronic</option>
                  <option value="Automated Manual Transmission">Automated Manual Transmission (AMT)</option>
                  <option value="Auto Transmission">Auto Transmission (AT)</option>
                </Select>
              </GridItem>

              <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                <FormLabel>Enter No. of Seats </FormLabel>
                <Input
                  isRequired={true}
                  placeholder="Enter numbers"
                  type="number"
                  name="seats"
                  defaultValue={formData?.seats}
                  onChange={handleDetailsChange}
                />
              </GridItem>

              <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                <FormLabel>Choose Fuel Type </FormLabel>
                <Select type="text" name="fuel_type" defaultValue={formData?.fuel_type} onChange={handleDetailsChange}>
                  <option value="">Select fuel type-</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="CNG">Compressed Natural Gas (CNG)</option>
                  <option value="LPG">Liquefied Petroleum Gas (LPG)</option>
                </Select>
              </GridItem>

              <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                <FormLabel>Enter Register State </FormLabel>
                {/* <Select
                  type="text"
                  name="regState"
                  defaultValue={formData?.regState}
                  placeholder={"Enter the State of register"}
                  onChange={handleDetailsChange}
                >
                  {IndianStates.map((el) => {
                    return <option>{el}</option>;
                  })}{" "}
                </Select> */}
                <StateSelect HandleChange={val => setFormData(prev => ({ ...prev, regState: val?.value }))} name={'regState'} />
              </GridItem>
            </Grid>
          </GridItem>

          <GridItem as="div" colSpan={{ base: 6, md: 12 }} p="10px">
            <Text mb="2" fontWeight={'500'} fontSize="1.5rem">
              Owner Details :
            </Text>
          </GridItem>

          <GridItem as="div" colSpan={{ base: 12, md: 12 }} p="20px " borderRadius={'10px'} backgroundColor={'white'}>
            <Grid templateColumns="repeat(12, 1fr)">
              <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                <FormLabel>Owner Name</FormLabel>
                <Input
                  placeholder="Enter Owner Name"
                  type="text"
                  name="owner_name"
                  defaultValue={formData?.owner_name}
                  onChange={handleDetailsChange}
                  isRequired={true}
                />
              </GridItem>

              <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                <FormLabel>Owner Email</FormLabel>
                <Input
                  placeholder="Enter Owner Email"
                  type="email"
                  name="owner_email"
                  defaultValue={formData?.owner_email}
                  onChange={handleDetailsChange}
                  isRequired={true}
                />
              </GridItem>

              <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                <FormLabel>Owner Mobile</FormLabel>
                <Input
                  placeholder="Enter Owner Mobile"
                  type="number"
                  name="owner_mobile"
                  defaultValue={formData?.owner_mobile}
                  onChange={handleDetailsChange}
                  isRequired={true}
                />
              </GridItem>

              <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                <FormLabel>Owner Location</FormLabel>
                <Input
                  placeholder="Enter Owner Location"
                  type="text"
                  name="owner_location"
                  defaultValue={formData?.owner_location}
                  onChange={handleDetailsChange}
                  isRequired={true}
                />
              </GridItem>
            </Grid>
          </GridItem>

          <GridItem as="div" colSpan={{ base: 6, md: 12 }} p="10px">
            <Text mb="2" fontWeight={'500'} fontSize="1.5rem">
              Feature Details :
            </Text>
          </GridItem>

          <GridItem as="div" colSpan={{ base: 12, md: 12 }} p="20px " borderRadius={'10px'} backgroundColor={'white'}>
            <Grid templateColumns="repeat(12, 1fr)">
              <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="10px">
                <FormLabel>Select Features</FormLabel>
                <Flex w={'100%'} gap={3} my={1} borderRadius={'5px'}>
                  <Select id="selectFeature">
                    {featureArray.map(el => {
                      return (
                        <option key={el.value} value={el.value}>
                          {el.label}
                        </option>
                      );
                    })}
                  </Select>
                  <Button bg="#30829c" leftIcon={<FiPlusSquare />} colorScheme="blue" onClick={handlefeatures}>
                    Add
                  </Button>
                </Flex>
                {features.length > 0 && (
                  <Flex w={'100%'} wrap={'wrap'} gap={3} bg={'#f2ffe6'} p="2" my={3} borderRadius={'5px'} border={'1px solid #ddd'}>
                    {features.map((item, index) => {
                      return (
                        <Button
                          key={item + 234}
                          variant={'ghost'}
                          border={'1px solid #ddd'}
                          borderRadius={'30px'}
                          size={'sm'}
                          color={'black'}
                          bg={'white'}
                          rightIcon={<FiX />}
                          onClick={() => {
                            let subs = features.filter(el => item !== el);
                            setfeatures(subs);
                          }}
                        >
                          {item}
                        </Button>
                      );
                    })}
                  </Flex>
                )}
              </GridItem>

              <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="10px">
                <FormLabel>Select Safety Features</FormLabel>
                <Flex w={'100%'} gap={3} my={1} borderRadius={'5px'}>
                  <Select id="selectSafetyFeatures">
                    {safetyFeatureArray.map(el => {
                      return (
                        <option key={el.value} value={el.value}>
                          {el.label}
                        </option>
                      );
                    })}
                  </Select>
                  <Button bg="#30829c" leftIcon={<FiPlusSquare />} colorScheme="blue" onClick={handleSafetyFeatures}>
                    Add
                  </Button>
                </Flex>
                {safetyFeatures.length > 0 && (
                  <Flex w={'100%'} wrap={'wrap'} gap={3} bg={'#f2ffe6'} p="2" my={3} borderRadius={'5px'} border={'1px solid #ddd'}>
                    {safetyFeatures.map((item, index) => {
                      return (
                        <Button
                          key={item + 234}
                          variant={'ghost'}
                          border={'1px solid #ddd'}
                          borderRadius={'30px'}
                          size={'sm'}
                          color={'black'}
                          bg={'white'}
                          rightIcon={<FiX />}
                          onClick={() => {
                            let subs = safetyFeatures.filter(el => item !== el);
                            setSafetyFeatures(subs);
                          }}
                        >
                          {item}
                        </Button>
                      );
                    })}
                  </Flex>
                )}
              </GridItem>
            </Grid>
          </GridItem>

          <GridItem as="div" colSpan={{ base: 6, md: 12 }} p="10px">
            <Text mb="2" fontWeight={'500'} fontSize="1.5rem">
              Other Details :
            </Text>
          </GridItem>

          <GridItem as="div" colSpan={{ base: 12, md: 12 }} p="20px " borderRadius={'10px'} backgroundColor={'white'}>
            <Grid templateColumns="repeat(12, 1fr)">
              <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                <FormControl isInvalid={formData?.VIN?.length !== 17 && formData?.VIN?.length > 0}>
                  <FormLabel>VIN (optional)</FormLabel>
                  <Input
                    isRequired={true}
                    placeholder="Enter VIN"
                    type="number"
                    name="VIN"
                    defaultValue={formData?.VIN}
                    onChange={handleDetailsChange}
                  />
                  {formData?.VIN?.length !== 17 && formData?.VIN?.length > 0 && <FormErrorMessage>Enter 17 digit VIN</FormErrorMessage>}
                </FormControl>
              </GridItem>

              <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                <FormLabel>License Number (optional)</FormLabel>
                <Input
                  isRequired={true}
                  placeholder="Enter License"
                  type="text"
                  name="license_number"
                  defaultValue={formData?.license_number}
                  onChange={handleDetailsChange}
                />
              </GridItem>

              <GridItem as="div" colSpan={{ base: 12, md: 12 }} p="10px">
                <FormControl>
                  <FormLabel>Car Documents</FormLabel>
                  <Flex gap="3">
                    <FormControl>
                      <Select
                        width={'70%'}
                        onChange={e => {
                          setSingleDocument({
                            ...singleDocument,
                            label: e.target.value
                          });
                          formData?.documents.find(el => e.target.value === el.label)
                            ? toast({
                                position: 'top',
                                title: 'Alredy Added',
                                status: 'warning',
                                duration: 4000,
                                isClosable: true
                              })
                            : '';
                        }}
                      >
                        <option value="">Select PDF Document Type</option>
                        {documentsArray?.length &&
                          documentsArray?.map(el => {
                            return (
                              <option key={el} value={el}>
                                {el}
                              </option>
                            );
                          })}
                      </Select>
                      {/* <FormHelperText p="0" color={"red"}>Only PDF file</FormHelperText> */}
                    </FormControl>
                    {!formData?.documents.find(el => singleDocument.label === el.label) && (
                      <InputUpload
                        refresh={refreshDocUpload}
                        accept={'application/pdf'}
                        HandleUploadSomeImages={doc => setSingleDocument({ ...singleDocument, doc: doc })}
                      />
                    )}
                    <Button
                      bg="#30829c"
                      leftIcon={<FiPlusSquare />}
                      colorScheme={'blue'}
                      onClick={handleAddDocument}
                      isDisabled={formData?.documents.find(el => singleDocument.label === el.label)}
                    >
                      Add
                    </Button>
                  </Flex>
                </FormControl>
              </GridItem>

              <GridItem as="div" colSpan={{ base: 12, md: 12 }} py="10px">
                <Flex gap={'3'} overflowX={'auto'} width={'full'}>
                  {formData?.documents?.length > 0 &&
                    formData?.documents?.map((el, index) => {
                      return (
                        <Flex key={index + 'asgetugsj'} alignItems={'center'} justifyContent={'space-between'} p={'2'}>
                          <Button onClick={onOpen} borderTopRightRadius={'0px'} borderBottomRightRadius={'0px'} fontWeight={'600'}>
                            {el.label}
                          </Button>
                          <Button
                            colorScheme="red"
                            borderTopLeftRadius={'0px'}
                            borderBottomLeftRadius={'0px'}
                            onClick={() => handeDeleteDocument(el.label)}
                          >
                            <FiXCircle />
                          </Button>
                          <DocumentModal isOpen={isOpen} onClose={onClose} name={el.label} doc={el.doc} />
                        </Flex>
                      );
                    })}
                </Flex>
              </GridItem>

              <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="10px">
                <FormLabel>Select Location</FormLabel>
                <Flex w={'100%'} gap={3} my={1} borderRadius={'5px'}>
                  <Select id="selectLocation">
                    <option value="">Select Location</option>
                    <option value="all">Select all</option>
                    {allLocations?.length &&
                      allLocations?.map(el => {
                        return (
                          <option key={el._id} value={el._id}>
                            {el?.name}
                          </option>
                        );
                      })}
                  </Select>
                  <Button bg="#30829c" leftIcon={<FiPlusSquare />} colorScheme={'blue'} onClick={handleLocation}>
                    Add
                  </Button>
                </Flex>
                {selectedLocations.length > 0 && (
                  <Flex w={'100%'} wrap={'wrap'} gap={3} bg={'#f2ffe6'} p="2" my={3} borderRadius={'5px'} border={'1px solid #ddd'}>
                    {selectedLocations.map((item, index) => {
                      return (
                        <Button
                          key={item + 'sdfsdf34'}
                          variant={'ghost'}
                          border={'1px solid #ddd'}
                          borderRadius={'30px'}
                          size={'sm'}
                          color={'black'}
                          bg={'white'}
                          rightIcon={<FiX />}
                          onClick={() => {
                            let subs = selectedLocations.filter(el => item !== el);
                            setSelectedLocations(subs);
                          }}
                        >
                          {allLocations.find(el => item == el?._id)?.name}
                        </Button>
                      );
                    })}
                  </Flex>
                )}
              </GridItem>

              <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="10px">
                <FormLabel>Enter Ownership history</FormLabel>
                <Textarea
                  isRequired={true}
                  placeholder="Enter Ownership History"
                  type="text"
                  name="ownership_history"
                  defaultValue={formData?.ownership_history}
                  onChange={handleDetailsChange}
                />
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
        <Flex gap={1} justifyContent={'end'} my={'15px'}>
          <Link to="/vendor/cars">
            <Button colorScheme="gray" my="10px">
              Cancel
            </Button>
          </Link>
          <Button bg="#30829c" colorScheme="blue" m="10px" isLoading={isCarLoading} type="submit" rightIcon={<FiPlusCircle />} onClick={handleSubmit}>
            Add Car
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default AddCar;
