import { CheckIcon } from '@chakra-ui/icons';
import { FaRegHeart } from 'react-icons/fa';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Card,
  CardHeader,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Spinner,
  Stack,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Tbody,
  Td,
  Text,
  Tr,
  useDisclosure,
  useToast,
  VStack
} from '@chakra-ui/react';
import axios from 'axios';
import { BASE_URL } from '../utils/config';
import { useEffect, useRef, useState } from 'react';
import banner from '../assets/Icons/image 27.png';
import bannertop from '../assets/Icons/image 16.png';
import {
  BsBookmarkCheck,
  BsBuildingFill,
  BsCarFrontFill,
  BsDropletFill,
  BsFillBadgeCcFill,
  BsFillCalendarFill,
  BsFillClockFill,
  BsFillPersonFill,
  BsFuelPump,
  BsGear,
  BsGearFill,
  BsPerson,
  BsShieldFill,
  BsSpeedometer2
} from 'react-icons/bs';

import { FiBookmark, FiDollarSign, FiShare, FiFlag } from 'react-icons/fi';
import { GrLocation } from 'react-icons/gr';
import Carousel from '../Components/WebsiteComponents/CarouselDetail';
import { useDispatch, useSelector } from 'react-redux';
import { Form, useNavigate, useParams } from 'react-router-dom';
import InputUpload from '../Components/Extra/InputUpload';
import GallerySlider from '../Components/WebsiteComponents/GallerySlider';
import ImageModal from '../Components/WebsiteComponents/ImageModal';
import DetailSliderComponent from '../Components/WebsiteComponents/DetailSliderComponent';
import { getTestDrivesByCarID, postTestDrive } from '../Redux/App/Actions/TestDrive.action';
import { getCarByID, getCarsHomePage, getSimilarCars } from '../Redux/App/Actions/Vendors/Car.action';
import { formatCreatedAtDate, getCurrentDate } from '../utils/DatesFunctions';
import IndianNumberSystem from '../utils/IndianNumSystem';
import { createNewBooking, getBookingsByCarId, UpdatebookingByID } from '../Redux/App/Actions/Booking.action';
import AlertMessageModal from '../Components/Extra/AlertMessageModal';

export default function ProductPage() {
  let { Customer_detail, token, isAuth } = useSelector(store => store?.CustomerAuthManager);
  const customer = Customer_detail || JSON.parse(localStorage.getItem('customer_detail_carvendor'));
  let customertoken = token || JSON.parse(localStorage.getItem('customer_token_carvendor'));

  const { loading: isBookingLoading } = useSelector(state => state?.BookingManager);
  const { loading: isOneCarLoading } = useSelector(state => state?.CarManager);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isPayOpen, onOpen: onPayOpen, onClose: onPayClose } = useDisclosure();

  const [upcoming, setupcoming] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [data, setData] = useState();
  const [TDriveData, setTDriveData] = useState(InitTDrive);
  const [BookingData, setBookingData] = useState(InitBookingData);
  const [setBookingTestDrive, setBookingTestDriveData] = useState(InitBookingData);
  const [PrevBookData, setPrevBookData] = useState();

  const [AlertMsg1, setAlertMsg1] = useState({ text: '', open: false });
  const [OtherTestDrives, setOtherTestDrives] = useState([]);
  const [OtherBookings, setOtherBookings] = useState([]);

  const [TimeSlot, setTimeSlot] = useState('');
  const [refresh, setrefresh] = useState(false);
  const [similarCars, setsimilarCars] = useState([]);
  const { loading, error } = useSelector(state => state?.CarManager);
  const [displayImage, setDisplayImage] = useState('');

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const [galleryImageIndex, setGalleryImageIndex] = useState();

  const [isFavorite, setIsFavorite] = useState();

  const handleToggleFavorite = async () => {
    const login = isAuth;
    if (login == false) {
      toast({
        title: 'Please Login First',
        status: 'error',
        position: 'top'
      });
      let url = window.location.pathname;
      localStorage.setItem('previous_url', url);

      return navigate('/customer-email-login');
    } else {
      try {
        setIsFavorite(isFavorite);
        if (isFavorite) {
          // Add logic to save to the wishlist table when adding to favorites
          await addToWishlist();
          console.log('Item added to wishlist!');
        } else {
          // Add logic to remove from the wishlist table when removing from favorites
          await removeFromWishlist();
          console.log('Item removed from wishlist!');
        }
      } catch (error) {
        console.error('Error toggling wishlist status:', error);
      }
    }
  };

  const addToWishlist = async () => {
    let body = {
      userId: Customer_detail._id,
      carId: _id
    };
    // Add logic to make an API request to add the item to the wishlist
    const response = axios.post(`${BASE_URL}/api/test/savewishlist`, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(response.data);
  };

  const removeFromWishlist = async () => {
    // Add logic to make an API request to remove the item from the wishlist
    await axios.delete(`${BASE_URL}/api/test/removeinwishlist/${Customer_detail._id}/${_id}`);
  };

  let galleryRef = useRef();
  const galleryHandler = () => {
    galleryRef.current.click();
  };

  const openImageModal = imageUrl => {
    setSelectedImage(imageUrl);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setSelectedImage('');
    setIsImageModalOpen(false);
  };

  const openGallerySlider = index => {
    setGalleryImageIndex(index);
    setIsGalleryOpen(true);
  };

  const closeGallerySlider = () => {
    setIsGalleryOpen(false);
  };

  const handleInputChange = e => {
    let { name, value } = e.target;
    setTDriveData({
      ...TDriveData,
      [name]: value
    });
  };
  const TimeSlotAssign = () => {
    for (let i = 0; i < TimeSlots.length; i++) {
      if (!isSlotAvailable(TimeSlots[i])) {
        setTimeSlot(TimeSlots[i]);
        break;
      }
    }
  };

  const setDataAll = car => {
    setDisplayImage(car.primary_image);
    setData(car);
    if (!Customer_detail?.first_name) {
      setTDriveData({ ...InitTDrive });
      return;
    }
    setTDriveData({
      ...InitTDrive,
      ...TDriveData,
      name: customer?.first_name + ' ' + customer?.last_name,
      email: customer?.email,
      phone_number: customer?.phone_number,
      address: customer?.address,
      city: customer?.city,
      state: customer?.state?.state_name,
      pincode: customer?.pin,
      customer_id: customer?._id,
      vendor_id: data?.vendorID?._id || '',
      employee_id: data?.vendorID?.reference,
      car_id: id
    });

    setBookingData({
      ...InitBookingData,
      advanced_amount: car?.price * 0.1,
      amount_to_pay: car?.price * 0.1,
      total_amount: car?.price,
      test_drive_booking_amount: 500,
      remaining_amount: car?.price - car?.price * 0.1,
      status: 'paid',
      customer_id: Customer_detail?._id,
      car_id: car?._id,
      vendor_id: car?.vendorID?._id
    });
    setBookingTestDriveData({
      ...InitBookingData,
      advanced_amount: car?.price * 0.1 - 500,
      amount_to_pay: car?.price * 0.1 - 500,
      total_amount: car?.price,
      test_drive_booking_amount: 500,
      remaining_amount: car?.price - car?.price * 0.1,
      status: 'paid',
      customer_id: Customer_detail?._id,
      car_id: car?._id,
      vendor_id: car?.vendorID?._id
    });

    setPrevBookData(prev => ({
      ...prev,
      amount_to_pay: car?.price - (car?.price * 0.1)
    }));
  };

  const setBookings = bookings => {
    setOtherBookings(bookings);
    for (const BK of bookings) {
      if (BK?.customer_id == Customer_detail?._id) {
        setPrevBookData(BK);
        return;
      }
    }
  };

  const getData = () => {
    dispatch(getCarByID(id, toast, setDataAll));
    dispatch(getSimilarCars(Customer_detail?._id, id, toast, setsimilarCars));
    dispatch(getTestDrivesByCarID(id, setOtherTestDrives));
    dispatch(getBookingsByCarId(id, setBookings));
  };

  const openModal = () => {
    const login = isAuth;
    if (login == false) {
      toast({
        title: 'Please Login First',
        status: 'error',
        position: 'top'
      });
      let url = window.location.pathname;
      localStorage.setItem('previous_url', url);

      return navigate('/customer-email-login');
    } else {
      return setIsOpenModal(true);
    }
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };
  const SaveTestDrive = () => {
    if (!TimeSlot) {
      return toast({
        title: 'Please Select Time Slot'
      });
    }
    if (!TDriveData.phone_number) {
      return toast({
        title: 'Please Add Phone Number'
      });
    }
    if (!TDriveData.test_drive_date) {
      return toast({
        title: 'Please Select Preferred Date'
      });
    }
    // if (!TDriveData.driving_license) {
    //   return toast({
    //     title: "Please Upload Driving License",
    //   });
    // }

    TDriveData.test_drive_slot = TimeSlot;
    TDriveData.car_id = id;
    TDriveData.vendor_id = data.vendorID._id;

    dispatch(postTestDrive(TDriveData, setAlertMsg1));
  };
  const OpenPayRestAmount = e => {
    onPayOpen();
  };

  const isSlotAvailable = slot => {
    for (const inst of OtherTestDrives) {
      if (inst.test_drive_date == TDriveData.test_drive_date && inst.test_drive_slot == slot) return true;
    }
    return false;
  };
  const CanUserBookNow = () => {
    let flag = false;
    for (const TD of OtherTestDrives) {
      if (TD?.customer_id?._id == Customer_detail?._id && TD.status == 'approved') {
        flag = true;
      }
    }

    return flag;
  };
  const IsUserTheOneWhoBookedCar = () => {
    let flag = false;
    if (OtherBookings.length == 0) return flag;
    for (const BK of OtherBookings) {
      if (BK?.customer_id == Customer_detail?._id) {
        flag = true;
      }
    }
    return flag;
  };
  const CanUserBookTestDrive = () => {
    let flag = true;
    for (const TD of OtherTestDrives) {
      if (TD?.customer_id?._id == Customer_detail?._id) {
        flag = false;
      }
    }

    return flag;
  };
  const setUpcomingSlider = data => {
    setupcoming(data.Upcomings);
  };
  const HandleBookNowFn = () => {
    const login = isAuth;
    if (login == false) {
      toast({
        title: 'Please Login First',
        status: 'error',
        position: 'top'
      });
      let url = window.location.pathname;
      localStorage.setItem('previous_url', url);

      return navigate('/customer-email-login');
    } else {
      return onOpen();
    }
  };
  const bookingSuccessFun = () => {
    onClose();
  };

  const createBookingFn = () => {
    let tdrive = '';

    for (const TD of OtherTestDrives) {
      if (TD?.customer_id?._id == Customer_detail?._id && TD.status == 'approved') {
        tdrive = TD;
      }
    }
    let testDriveAmount = tdrive ? -500 : 0; // If a test drive is approved, testDriveAmount is -500, else 0

    let temp = {
      ...BookingData,
      test_drive_id: tdrive._id, // Set test_drive_id only if tdrive is available
      customer_name: tdrive.name, // Set customer_name only if tdrive is available
      advanced_amount: BookingData.advanced_amount + testDriveAmount, // Modify advanced_amount based on the logic
      amount_to_pay: BookingData.amount_to_pay + testDriveAmount, // Modify amount_to_pay based on the logic
      test_drive_booking_amount: tdrive ? 500 : 0 // Set test_drive_booking_amount based on the logic
    };
    setBookingData(temp);
    temp;
    console.log(temp);
    dispatch(createNewBooking(temp, toast, bookingSuccessFun, customertoken));
  };

  const UpdateBookingAndCarIsSold = obj => {
    let data = { ...PrevBookData, ...obj, car_status: 'sold' };
  console.log(data);
    dispatch(UpdatebookingByID(PrevBookData?._id, data, toast, getData, onPayClose, 'You have successfully bought the car', customertoken));
  };

  useEffect(() => {
    getData();
  }, [id]);

  useEffect(() => {
    TimeSlotAssign();
  }, [TDriveData.test_drive_date]);

  useEffect(() => {
    dispatch(getCarsHomePage(setUpcomingSlider));
  }, []);

  return (
    <>
      <Card shadow="none" mx={{ base: '5', md: '5' }} my={{ base: '5', md: '5' }}>
        <Heading textAlign={'center'} size="lg">
          {' '}
          What are you looking for today?
        </Heading>
        <Box p="20px" ml="20">
          <Image //Main Image
            src={bannertop}
            w="94%"
            cursor="pointer"
          />
        </Box>
      </Card>

      <Box color="var(--C1-C, #A9A9A9)" display="flex" w="100%" bg="#D7F2F8" mb="20px">
        <Text p="3" ml="4">
          Homepage /
        </Text>
        <Text p="3" ml="3">
          {' '}
          Car /
        </Text>
        <Text p="3" ml="3" color="#1097B1">
          {' '}
          {data?.name?.name}{' '}
        </Text>
      </Box>
      {/**<!--*------- <Mobile View> ----------->*/}
      {!isOneCarLoading ? (
        <Card mx={{ base: '3', md: '10' }} my={{ base: '10', md: '5' }} p="5" display={{ base: 'flex', md: 'none' }}>
          <VStack display={'flex'} justifyContent={'start'} gap={'0'} alignItems={'center'}>
            <Text fontWeight={'bold'} fontSize={'24'} w="full">
              {data?.name?.name}
            </Text>
            <Text fontWeight={'semibold'} fontSize={'15'} w="full">
              {data?.make?.name}, {data?.model?.name}{' '}
            </Text>
          </VStack>
          <Flex alignItems={'center'} gap="2" my="3">
            <GrLocation />

            {data?.location?.map(el => el.name).join(', ')}
          </Flex>
          <Text fontSize={'26'} mb="5" fontWeight={'bold'}>
            ₹ {IndianNumberSystem(data?.price)}
          </Text>
          <Text mb="5" textAlign={'justify'}>
            {data?.short_description}
          </Text>
          <Flex mb="5" gap="1" justifyContent={'start'} alignItems={'center'}>
            <Tag border={'2px solid #ddd'} size={'md'} width={'30px'} height={'30px'} bg={data?.color?.code}>
              &nbsp;&nbsp;&nbsp;&nbsp;
            </Tag>
            <Text fontSize={'15'} fontWeight={'bold'} textTransform={'capitalize'}>
              {data?.color?.name}
            </Text>
          </Flex>
          {!loading && data?.booking_status !== 'booked' && data?.booking_status !== 'sold' && (
            <>
              {CanUserBookNow() ? (
                <>
                  <Alert status="success" sx={{ width: 'fit-content', marginLeft: '15px' }}>
                    <AlertIcon />
                    <AlertTitle>Your test drive was approved!</AlertTitle>
                  </Alert>
                  <Button colorScheme="green" ml="1" my={2} rightIcon={<BsBookmarkCheck />} onClick={HandleBookNowFn}>
                    Book Now
                  </Button>
                </>
              ) : CanUserBookTestDrive() ? (
                <Button
                  color="white"
                  w={{ md: '100%' }}
                  bg="#30829c"
                  colorScheme="teal"
                  leftIcon={<BsCarFrontFill />}
                  onClick={openModal}
                  isLoading={loading}
                >
                  Book Test Drives
                </Button>
              ) : (
                <Alert status="warning" sx={{ width: 'fit-content', marginLeft: '15px' }}>
                  <AlertIcon />
                  <AlertTitle fontSize={'15px'} fontWeight={'500'}>
                    You have booked a test drive for this car. <br /> Please wait for its approval.
                  </AlertTitle>
                </Alert>
              )}
            </>
          )}
          {data?.booking_status == 'booked' && data?.booking_status !== 'sold' && IsUserTheOneWhoBookedCar() && (
            <>
              <Alert status="info">
                <AlertIcon />
                <AlertTitle>This Car was booked by you on {formatCreatedAtDate(PrevBookData?.created_at)}. </AlertTitle>
              </Alert>
              <Button colorScheme="blue" bg="#30829c" my={1} fontWeight={'600'} onClick={OpenPayRestAmount}>
                Pay Rest Amount
              </Button>
            </>
          )}
          {data?.booking_status == 'booked' && IsUserTheOneWhoBookedCar() == false && (
            <>
              <Alert status="info">
                <AlertIcon />
                <AlertTitle>This Car is already booked </AlertTitle>
              </Alert>
            </>
          )}
          {data?.booking_status == 'sold' && IsUserTheOneWhoBookedCar() == false && (
            <>
              <Alert status="info">
                <AlertIcon />
                <AlertTitle>This Car is already sold.</AlertTitle>
              </Alert>
            </>
          )}
          {data?.booking_status == 'sold' && IsUserTheOneWhoBookedCar() && (
            <>
              <Alert status="success">
                <AlertIcon />
                <AlertTitle>You have successfully bought the car.</AlertTitle>
              </Alert>
            </>
          )}
        </Card>
      ) : (
        <Spinner m="20" thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      )}

      {/**todo <!--------------------------------- < Desktop View > -----------------------------------------------> */}
      <Grid
        templateColumns="repeat(8, 1fr)"
        mx={{ base: '3', md: '25px' }}
        p={{ md: '10' }}
        gap={{ base: '5', md: '10' }}
        boxShadow=" 0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
        borderRadius="39px"
        background="#F7FCFE"
      >
        <GridItem background="#fff" border=" 1px solid #1097B1 " borderRadius="20px" colSpan={{ base: '7', md: '4' }}>
          <Flex p="2" align={'center'} fontWeight={'semibold'} justifyContent="space-around">
            <Flex align={'center'} color={'#1097B1'} fontSize={'25'} gap={{ base: '1', md: '2' }}>
              {data?.name?.name}
            </Flex>
            <Flex align={'center'} color={'#1097B1'} fontSize={'25'} gap={{ base: '1', md: '1' }}>
              ₹ {IndianNumberSystem(data?.price)}
            </Flex>
            <Flex align={'center'} color={'#1097B1'} fontSize={'25'} gap={{ base: '1', md: '2' }}>
              {data?.Car_id}
            </Flex>
          </Flex>
          <Card w="100%" p="2">
            {!isOneCarLoading ? (
              <Flex align={'stretch'} gap="2">
                <Box w="100%">
                  <Image //Main Image
                    src={displayImage}
                    w="full"
                    h="full"
                    borderRadius="20px"
                    objectFit="cover"
                    cursor="pointer"
                    onClick={() => openImageModal(displayImage)}
                  />
                </Box>
              </Flex>
            ) : (
              <Skeleton h="400px" />
            )}
          </Card>

          <Card style={{ flexDirection: 'unset' }}>
            <Flex>
              {data?.gallery_images?.length > 0 &&
                data?.gallery_images?.slice(0, 4)?.map((el, index) => {
                  return (
                    <Image //Side Images
                      w="20%"
                      key={index + 'abcd23532'}
                      src={el}
                      borderRadius="15px"
                      objectFit="contain"
                      cursor="pointer"
                      border={el == displayImage ? '6px solid #30829c' : '6px solid white'}
                      onClick={() => {
                        if (el == displayImage) {
                          setDisplayImage(data.primary_image);
                        } else {
                          setDisplayImage(el);
                        }
                      }}
                    />
                  );
                })}
              <Button variant={'ghost'} size="xs" height="none" onClick={galleryHandler}>
                View More
              </Button>
            </Flex>
          </Card>
          <Card w="100%" p="2" mt="5" display={{ base: 'none', md: 'flex' }}>
            {!isOneCarLoading ? (
              <Flex align={'center'} fontWeight={'semibold'} fontSize={'16'} justifyContent="space-around">
                <Flex align={'center'} gap={{ base: '1', md: '2' }}>
                  <BsSpeedometer2 />
                  {data?.km_driven} kms
                </Flex>
                <Flex align={'center'} gap={{ base: '1', md: '2' }}>
                  <BsFuelPump />
                  {data?.fuel_type}
                </Flex>
                <Flex align={'center'} gap={{ base: '1', md: '2' }}>
                  <BsGear />
                  {data?.transmission}
                </Flex>
                <Flex align={'center'} gap={{ base: '1', md: '2' }}>
                  <BsPerson />
                  {data?.ownership == 'First' ? '1st Owner' : data?.ownership == 'Second' ? '2nd Owner' : '3rd Owner'}
                </Flex>
              </Flex>
            ) : (
              <SkeletonText />
            )}
          </Card>
        </GridItem>

        <GridItem colSpan={{ base: '7', md: '4' }} order={{ base: 2, md: 1 }}>
          {!isOneCarLoading ? (
            <Card border=" 1px solid #1097B1 " borderRadius="20px" mb={3} p="5">
              <Flex display={'flex'} justifyContent={'start'} gap={'0'} alignItems={'center'}>
                <Text fontWeight={'semibold'} fontSize={'15'} w="full">
                  {data?.make?.name}, {data?.model?.name}{' '}
                </Text>

                <Box onClick={handleToggleFavorite}>
                  {isFavorite ? (
                    <FaHeart
                      style={{
                        fill: 'black', // Set the fill color to your desired color
                        width: '20px', // Optional: Adjust the width
                        height: '20px' // Optional: Adjust the height
                      }}
                    />
                  ) : (
                    <FaRegHeart />
                  )}
                </Box>
              </Flex>
              <Flex alignItems={'center'} gap="2" my="3">
                <GrLocation />

                {data?.location?.map(el => el.name).join(', ')}
              </Flex>

              <Text mb="5" textAlign={'justify'}>
                {data?.short_description}
              </Text>
              <Flex mb="5" gap="1" justifyContent={'start'} alignItems={'center'}>
                <Tag border={'2px solid #ddd'} size={'md'} width={'30px'} height={'30px'} bg={data?.color?.code}>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                </Tag>
                <Text fontSize={'15'} fontWeight={'bold'} textTransform={'capitalize'}>
                  {data?.color?.name}
                </Text>
              </Flex>

              <Text fontSize={'14'} mb="5">
                Description
              </Text>
              <Text fontSize={'14'}>{data?.description}</Text>
            </Card>
          ) : (
            <Spinner m="20" thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
          )}

          <Card border=" 1px solid #1097B1 " borderRadius="20px" p="5">
            {!isOneCarLoading ? (
              <Tabs variant="line" colorScheme="blue" isLazy>
                <TabList bg="white">
                  <Tab w="25%">Overview</Tab>
                  <Tab w="25%">Features</Tab>

                  <Tab w="25%" ref={galleryRef}>
                    Gallery
                  </Tab>
                </TabList>

                <TabPanels w={'full'}>
                  <TabPanel>
                    <Card w="100%" p="5" shadow="none">
                      <Text fontWeight={'bold'} fontSize={'22'} mb="5">
                        Car Overview
                      </Text>

                      <Flex justifyContent={'space-evenly'} fontSize={'14'} direction={{ base: 'column', md: 'row' }}>
                        <TableContainer whiteSpace={'normal'}>
                          <Table variant="unstyled" size="sm">
                            <Tbody>
                              <Tr>
                                <Td>
                                  <Flex align={'center'} gap="2" textColor={'gray.500'}>
                                    <BsFillCalendarFill /> Registration Date
                                  </Flex>
                                </Td>
                                <Td fontWeight={'semibold'}>{data?.regYear}</Td>
                              </Tr>
                              <Tr>
                                <Td>
                                  <Flex align={'center'} gap="2" textColor={'gray.500'}>
                                    <BsDropletFill /> Fuel Type
                                  </Flex>
                                </Td>
                                <Td fontWeight={'semibold'}> {data?.fuel_type}</Td>
                              </Tr>
                              <Tr>
                                <Td>
                                  <Flex align={'center'} gap="2" textColor={'gray.500'}>
                                    <BsSpeedometer2 /> Kms Driven
                                  </Flex>
                                </Td>
                                <Td fontWeight={'semibold'}> {data?.km_driven} kms</Td>
                              </Tr>
                              <Tr>
                                <Td>
                                  <Flex align={'center'} gap="2" textColor={'gray.500'}>
                                    <BsFillPersonFill /> Ownership
                                  </Flex>
                                </Td>
                                <Td fontWeight={'semibold'}>
                                  {' '}
                                  {data?.ownership == 'First' ? '1st Owner' : data?.ownership == 'Second' ? '2nd Owner' : '3rd Owner'}
                                </Td>
                              </Tr>
                              <Tr>
                                <Td>
                                  <Flex align={'center'} gap="2" textColor={'gray.500'}>
                                    <BsGearFill />
                                    Transmission
                                  </Flex>
                                </Td>
                                <Td fontWeight={'semibold'}> {data?.transmission}</Td>
                              </Tr>
                            </Tbody>
                          </Table>
                        </TableContainer>
                        <TableContainer whiteSpace={'normal'}>
                          <Table variant="unstyled" size="sm">
                            <Tbody>
                              <Tr>
                                <Td>
                                  <Flex align={'center'} gap="2" textColor={'gray.500'}>
                                    <BsBuildingFill /> RTO
                                  </Flex>
                                </Td>
                                <Td fontWeight={'semibold'}> {data?.regState?.state_name}</Td>
                              </Tr>
                              <Tr>
                                <Td>
                                  <Flex align={'center'} gap="2" textColor={'gray.500'}>
                                    <BsFillBadgeCcFill /> Engine Displacement
                                  </Flex>
                                </Td>
                                <Td fontWeight={'semibold'}> {data?.engine_displacment} CC</Td>
                              </Tr>
                              <Tr>
                                <Td>
                                  <Flex align={'center'} gap="2" textColor={'gray.500'}>
                                    <BsFillClockFill /> Year of Manufacture
                                  </Flex>
                                </Td>
                                <Td fontWeight={'semibold'}>2018</Td>
                              </Tr>
                            </Tbody>
                          </Table>
                        </TableContainer>
                      </Flex>
                    </Card>
                  </TabPanel>
                  <TabPanel>
                    <Card w="100%" p="5">
                      <Text fontWeight={'bold'} fontSize={'22'} mb="5">
                        Features
                      </Text>
                      <Accordion allowMultiple>
                        <AccordionItem>
                          <AccordionButton>
                            <Box flex="1" fontWeight={'semibold'} fontSize={'16'} textAlign={'left'}>
                              Comfort, Convinience & Entertainment
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                          <AccordionPanel pb={4} fontSize={'14'}>
                            <Grid
                              templateColumns="repeat(12, 1fr)"
                              gap={4} // Adjust the gap size as needed
                            >
                              {data?.features?.length > 0 &&
                                data?.features?.map((el, index) => (
                                  <GridItem key={el + index} as="div" m={'auto'} w={'full'} colSpan={{ base: 6, md: 4 }}>
                                    <Flex key={index} alignItems={'center'} justifyContent={'flex-start'} gap={3}>
                                      <CheckIcon color={'green'} />
                                      <Text w="full">{el}</Text>
                                    </Flex>
                                  </GridItem>
                                ))}
                            </Grid>
                          </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                          <AccordionButton>
                            <Box flex="1" fontWeight={'semibold'} fontSize={'16'} textAlign={'left'}>
                              Safety
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                          <AccordionPanel pb={4} fontSize={'14'}>
                            <Grid
                              templateColumns="repeat(12, 1fr)"
                              gap={4} // Adjust the gap size as needed
                            >
                              {data?.safety_features?.length > 0 &&
                                data?.safety_features?.map((el, index) => (
                                  <GridItem as="div" key={el + index} m={'auto'} w={'full'} colSpan={{ base: 6, md: 4 }}>
                                    <Flex key={index} alignItems={'center'} justifyContent={'flex-start'} gap={3}>
                                      <CheckIcon color={'green'} />
                                      <Text w="full">{el}</Text>
                                    </Flex>
                                  </GridItem>
                                ))}
                            </Grid>
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>
                    </Card>
                  </TabPanel>

                  <TabPanel>
                    <Card w="100%" p="5">
                      <Text fontWeight={'bold'} fontSize={'22'} mb="5">
                        Gallery
                      </Text>
                      <SimpleGrid columns={3} spacing={2}>
                        {data?.gallery_images?.length > 0 &&
                          data?.gallery_images.map((el, index) => {
                            return (
                              <Image
                                src={el}
                                key={index + 'abs234'}
                                objectFit="cover"
                                borderRadius={'4px'}
                                onClick={() => openGallerySlider(index)}
                                cursor="pointer"
                              />
                            );
                          })}
                      </SimpleGrid>
                    </Card>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            ) : (
              <SkeletonText mt="10" noOfLines={'8'} />
            )}

            {data?.booking_status == 'booked' && data?.booking_status !== 'sold' && IsUserTheOneWhoBookedCar() && (
              <>
                <Alert status="info">
                  <AlertIcon />
                  <AlertTitle>This Car was booked by you on {formatCreatedAtDate(PrevBookData?.created_at)}. </AlertTitle>
                </Alert>
                <Button colorScheme="blue" bg="#30829c" my={1} fontWeight={'600'} onClick={OpenPayRestAmount}>
                  Pay Rest Amount
                </Button>
              </>
            )}
            {data?.booking_status == 'booked' && IsUserTheOneWhoBookedCar() == false && (
              <>
                <Alert status="info">
                  <AlertIcon />
                  <AlertTitle>This Car is already booked </AlertTitle>
                </Alert>
              </>
            )}
            {data?.booking_status == 'sold' && IsUserTheOneWhoBookedCar() == false && (
              <>
                <Alert status="info">
                  <AlertIcon />
                  <AlertTitle>This Car is already sold.</AlertTitle>
                </Alert>
              </>
            )}
            {data?.booking_status == 'sold' && IsUserTheOneWhoBookedCar() && (
              <>
                <Alert status="success">
                  <AlertIcon />
                  <AlertTitle>You have successfully bought the car.</AlertTitle>
                </Alert>
              </>
            )}
          </Card>
        </GridItem>
        <GridItem alignItems="center" colSpan={{ base: '7', md: '8' }} order={{ base: 3, md: 5 }}>
          {/* ... (your existing code) */}

          {!loading && data?.booking_status !== 'booked' && data?.booking_status !== 'sold' && (
            <Flex justifyContent="center">
              {/* ... (your existing code) */}
              <Button bg="#30829c" color="white" ml="1" alignItems={'center'} onClick={HandleBookNowFn}>
                Book
              </Button>

              {CanUserBookNow() ? (
                <>
                  <Alert status="success" sx={{ width: 'fit-content', marginLeft: '15px' }}>
                    <AlertIcon />
                    <AlertTitle>Your test drive was approved!</AlertTitle>
                  </Alert>
                </>
              ) : CanUserBookTestDrive() ? (
                <Button
                  color="#30829c"
                  w={{ md: '15%' }}
                  border="2px solid #1097B1"
                  bg="#fff"
                  ml="1"
                  alignItems={'center'}
                  onClick={openModal}
                  isLoading={loading}
                >
                  Book Test Drives
                </Button>
              ) : (
                <Alert status="warning" sx={{ width: 'fit-content', marginLeft: '15px' }}>
                  <AlertIcon />
                  <AlertTitle fontSize={'15px'} fontWeight={'500'}>
                    You have booked a test drive for this car. <br /> Please wait for its approval.
                  </AlertTitle>
                </Alert>
              )}
            </Flex>
          )}
        </GridItem>
      </Grid>

      <Box w="100%" mt="20px">
        <Image //Main Image
          src={banner}
          w="full"
          objectFit="cover"
          cursor="pointer"
        />
      </Box>
      <Card mx={{ base: '5', md: '10' }} mt="5" mb="20">
        <CardHeader>
          <Flex align={'center'} justify={'space-between'}>
            <Heading size="lg">Similar cars</Heading>
          </Flex>
        </CardHeader>
        <DetailSliderComponent data={similarCars} />
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

      {/*====================== Image Modal=================== */}
      <ImageModal isOpen={isImageModalOpen} onClose={closeImageModal} imageUrl={selectedImage} />

      <GallerySlider isOpen={isGalleryOpen} onClose={closeGallerySlider} data={data?.gallery_images} ind={galleryImageIndex} />

      <AlertMessageModal text={AlertMsg1.text} openModal={AlertMsg1.open} setAlertMsg1={setAlertMsg1} />
      {/*====================== Test Drive Modal Contents=================== */}
      <Modal size={'4xl'} isCentered onClose={closeModal} isOpen={isOpenModal} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight={'semibold'}>Book Test Drive</ModalHeader>
          <ModalCloseButton />
          <FormControl>
            <ModalBody>
              <Flex gap="3" flexDirection={{ base: 'column', md: 'row' }} mb="3">
                <FormControl isRequired>
                  <FormLabel>Full name :</FormLabel>
                  <Input placeholder="First Name" name="first_name" defaultValue={TDriveData?.name || ''} onChange={handleInputChange} />
                </FormControl>

                <FormControl>
                  <FormLabel>Email :</FormLabel>
                  <Input type="email" defaultValue={TDriveData?.email || ''} placeholder=" Email" name="email" onChange={handleInputChange} />
                </FormControl>
                <FormControl isRequired isInvalid={TDriveData?.phone_number?.length !== 10 && TDriveData?.phone_number?.length > 0}>
                  <FormLabel> Phone :</FormLabel>
                  <Input
                    isRequired
                    min={0}
                    max={9999999999}
                    placeholder="Phone number"
                    name="phone_number"
                    type="number"
                    defaultValue={TDriveData?.phone_number || ''}
                    onChange={handleInputChange}
                  />
                  {TDriveData?.phone_number?.length !== 10 && TDriveData?.phone_number?.length > 0 && (
                    <FormErrorMessage>Please Enter 10 digit Phone Number</FormErrorMessage>
                  )}
                </FormControl>
              </Flex>
              <Flex gap="3" flexDirection={{ base: 'column', md: 'row' }} mb="3">
                <FormControl isRequired>
                  <FormLabel> Address :</FormLabel>
                  <Input defaultValue={TDriveData?.address || ''} placeholder="Address" name="address" onChange={handleInputChange} />
                </FormControl>
              </Flex>
              <Flex gap="3" flexDirection={{ base: 'column', md: 'row' }} mb="3">
                <FormControl isRequired>
                  <FormLabel> City :</FormLabel>
                  <Input defaultValue={TDriveData?.city || ''} placeholder="City" name="city" onChange={handleInputChange} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>State :</FormLabel>
                  <Input defaultValue={TDriveData?.state?.state_name || ''} placeholder="State" name="state" onChange={handleInputChange} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>PIN :</FormLabel>
                  <Input defaultValue={TDriveData?.pincode || ''} type="number" placeholder="PIN" name="pincode" onChange={handleInputChange} />
                </FormControl>
              </Flex>
              <Flex gap="3" flexDirection={{ base: 'column', md: 'row' }} mb="3">
                <FormControl isRequired>
                  <FormLabel>Prefered Date :</FormLabel>
                  <Input
                    w={'100%'}
                    type="date"
                    min={getCurrentDate()}
                    name="test_drive_date"
                    defaultValue={TDriveData?.test_drive_date || ''}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <Box w={'100%'}>
                  <Heading fontSize={'14px'}>Book Time Slots</Heading>
                  <Flex gap="3" flexDirection={{ base: 'column', md: 'row' }} m="2" wrap={'wrap'}>
                    {TimeSlots.length &&
                      TimeSlots.map(el => {
                        return (
                          <Button
                            isDisabled={isSlotAvailable(el)}
                            key={el + 'abd'}
                            bg={TimeSlot == el ? 'green.400' : 'gray.600'}
                            colorScheme="green"
                            onClick={() => setTimeSlot(el)}
                            size={'xs'}
                          >
                            {el}
                          </Button>
                        );
                      })}
                  </Flex>
                </Box>
              </Flex>

              <Flex px={3}>
                <FormControl isRequired>
                  <FormLabel>Upload DL :</FormLabel>
                  <InputUpload
                    UploadText={'Upload DL'}
                    accept={'*'}
                    HandleUploadSomeImages={file => setTDriveData({ ...TDriveData, driving_license: file })}
                    refresh={refresh}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Payable Amount :</FormLabel>
                  <Input
                    type="number"
                    isDisabled
                    bg={'gray.200'}
                    defaultValue={500}
                    name="amount_to_pay"
                    onChange={e =>
                      setTDriveData(prev => ({
                        ...prev,
                        amount_to_pay: +e.target.value
                      }))
                    }
                  />
                </FormControl>
              </Flex>
              <br />
              <b>Note :-</b>
              <Text fontSize={'12'}>
                Test Drive Cost : ₹500 <br />
                Booking Charges : 10% of the Car Value
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button color="white" bg="#30829c" colorScheme="teal" mr="3" onClick={SaveTestDrive}>
                Pay and Book Now
              </Button>
              <Button colorScheme="red" onClick={closeModal}>
                Close
              </Button>
            </ModalFooter>
          </FormControl>
        </ModalContent>
      </Modal>

      {/**<!--*------- <Booking Pay 10%  modal> ----------->*/}
      <Modal size={'2xl'} isCentered onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight={'semibold'}>Pay Rest 10% of Car's Price to confirm Booking</ModalHeader>
          <ModalCloseButton />
          <ModalBody px="10">
            <Text mb="3"> Total Price of Car : ₹ {data?.price}</Text>
            <Text mb="3"> Booking Charges : 10% of Total Price of Car</Text>
            <Text mb="3">Booking Charges Amount : ₹ {data?.price * 0.1 || 0}</Text>

            {CanUserBookTestDrive() ? (
              <Text>Amount Left to be Paid : ₹ {data?.price * 0.1}</Text>
            ) : (
              <>
                <Text mb="3"> Amount Paid : ₹ 500/- (Test Drive Charge Incl.)</Text>
                <Text>Amount Left to be Paid : ₹ {data?.price * 0.1 - 500}</Text>
              </>
            )}
            <FormControl isRequired>
              <FormLabel>Payable Amount :</FormLabel>
              {CanUserBookTestDrive() ? (
                <Input
                  type="number"
                  bg={'gray.200'}
                  defaultValue={data?.price * 0.1}
                  name="amount_to_pay"
                  onChange={e =>
                    setBookingTestDrive(prev => ({
                      ...prev,
                      amount_to_pay: +e.target.value
                    }))
                  }
                />
              ) : (
                <Input
                  type="number"
                  bg={'gray.200'}
                  defaultValue={data?.price * 0.1 - 500}
                  name="amount_to_pay"
                  onChange={e =>
                    setBookingData(prev => ({
                      ...prev,
                      amount_to_pay: +e.target.value
                    }))
                  }
                />
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              color="white"
              bg="#30829c"
              colorScheme="green"
              mr="3"
              onClick={() => {
                createBookingFn();
              }}
              isLoading={isBookingLoading}
            >
              Pay and Book Now
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/** <!------------------------------ < Booking Pay 90%  rest amount Modal > -----------------------------------------------> */}
      <Modal size={'2xl'} isCentered onClose={onPayClose} isOpen={isPayOpen} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight={'semibold'}>Pay Rest 90% to confirm buying the Car</ModalHeader>
          <ModalCloseButton />
          <ModalBody px="10">
            <Text mb="3"> Total Price of Car : ₹ {data?.price}</Text>
            <Text mb="3"> Booking Charges : 10% of Total Price of Car (Paid)</Text>
            <Text mb="3">Booking Charges Amount : ₹ {data?.price * 0.1 || 0} (Paid)</Text>
            <Text mb="3"> Amount Paid : ₹ {data?.price * 0.1}/- (Test Drive Charge Incl.)</Text>
            <Text>Amount Left to be Paid : ₹ {data?.price - (data?.price * 0.1 + 500)}</Text>
            <br />
            <FormControl isRequired>
              <FormLabel>Payable Amount :</FormLabel>
              <Input
                type="number"
                bg={'gray.200'}
                isDisabled
                defaultValue={data?.price - (data?.price * 0.1)}
                name="amount_to_pay"
                onChange={e =>
                  setPrevBookData(prev => ({
                    ...prev,
                    amount_to_pay: +e.target.value
                  }))
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              color="white"
              bg="#30829c"
              colorScheme="blue"
              mr="3"
              onClick={() =>
                UpdateBookingAndCarIsSold({
                  advanced_amount: data?.price * 0.1 - 500,
                  total_amount: data?.price,
                  test_drive_booking_amount: 500,
                  remaining_amount: data?.price - (data?.price * 0.1),
                  status: 'paid'
                })
              }
              isLoading={isBookingLoading}
            >
              Pay and Buy Car
            </Button>
            <Button colorScheme="red" onClick={onPayClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
const InitTDrive = {
  car_id: '',
  amount_to_pay: 500,
  vendor_id: '',
  employee_id: '',
  customer_id: '',
  name: '',
  email: '',
  phone_number: '',
  address: '',
  state: '',
  city: '',
  pincode: '',
  driving_license: '',
  prefered_date: '',
  test_drive_date: '',
  test_drive_slot: '',
  status: 'pending',
  isDrived: '0'
};
const InitBookingData = {
  customer_id: '',
  test_drive_id: '',
  car_id: '',
  advanced_amount: '',
  total_amount: '',
  test_drive_booking_amount: '',
  remaining_amount: '',
  status: 'booked'
};
const TimeSlots = ['9:00 AM - 11:00 AM', '11:00 AM - 1:00 PM', '1:00 PM - 3:00 PM', '3:00 PM - 5:00 PM', '5:00 PM - 7:00 PM', '7:00 PM - 9:00 PM'];
