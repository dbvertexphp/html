import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  InputRightElement,
  Image,
  InputGroup,
  Card,
  Input,
  Spacer,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Text,
  PopoverFooter,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Heading,
  ModalHeader,
  FormControl,
  FormLabel,
  extendTheme,
  ChakraProvider,
  Divider
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, Search2Icon } from '@chakra-ui/icons';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { getCarsHomePage } from '../../Redux/App/Actions/Vendors/Car.action';
import logo from '../../assets/Icons/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { CUSTOMER_LOGOUT } from '../../Redux/Auth/Auth.types';
import { useState } from 'react';
import { FiArrowDown, FiChevronDown, FiMapPin, FiX, FiXCircle } from 'react-icons/fi';
import AsyncSelector from '../Extra/AsyncSelect';
import { getAllLocationss } from '../../Redux/App/Actions/Admin/CarComponents/Location.action';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [trending, settrending] = useState([]);
  const [featured, setfeatured] = useState([]);
  const [upcoming, setupcoming] = useState([]);
  const [hotdeal, sethotdeal] = useState([]);

  let { location } = useSelector(store => store?.CarManager);
  let deflocation = JSON.parse(localStorage.getItem('location_carvendor'))?._id;
  let deflocationname = JSON.parse(localStorage.getItem('location_carvendor'))?.name;
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  let { Customer_detail, token } = useSelector(store => store?.CustomerAuthManager);
  const customer = Customer_detail || JSON.parse(localStorage.getItem('customer_detail_carvendor'));
  let customertoken = token || JSON.parse(localStorage.getItem('customer_token_carvendor'));

  const setData = data => {
    settrending(data.Trendings);
    setfeatured(data.Featured);
    setupcoming(data.Upcomings);
    sethotdeal(data.HotDeals);
  };
  const handleChangeFn = location => {
    const locationId = location?._id || null; // Extract _id from location, default to null if not present
    dispatch({ type: 'LOCATION_LOADING', payload: locationId });
    localStorage.setItem('location_carvendor', JSON.stringify(location));
    closeModal();
    dispatch({ type: 'LOCATION_SUCCESS', payload: locationId });
    dispatch(getCarsHomePage(Customer_detail?._id, setData, { location: locationId }));
    window.location.reload();
  };

  const handleCleanLocation = () => {
    dispatch({ type: 'LOCATION_LOADING', payload: location });
    localStorage.removeItem('location_carvendor');
    closeModal();
    dispatch({ type: 'LOCATION_SUCCESS', payload: location });
    window.location.reload();
  };

  const handleLogout = () => {
    dispatch({ type: CUSTOMER_LOGOUT });
    navigate('/');
  };

  const menuHandler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Flex
      
        alignItems={'center'}
        px={5}
        py={2}
        bg="#F7FAFC"
        mb="0.5"
        zIndex={3}
        borderRadius={'0'}
        position="sticky"
        top={'0'}
        width="100%"
      >
        <NavLink to="/">
          <Image src={logo} width="180px" marginLeft={{ lg: '30px' }} />
        </NavLink>

        <Button
          size={{ base: 'xs', md: 'sm' }}
          leftIcon={<FiMapPin />}
          rightIcon={<FiChevronDown />}
          colorScheme="teal"
          variant="ghost"
          onClick={openModal}
          marginLeft="50px"
        >
          {deflocationname || 'Select Location'}
        </Button>
        <Spacer />

        <Spacer />
        <div className="Navbar_header_all_optine">
          <div className="" style={{ display: 'inline-flex' }}>
            {!token && !Customer_detail ? (
              <Flex gap="2" display={{ base: 'none', lg: 'flex' }}>
                <div>
                  <NavLink className="navbar_option" to="/">
                    {' '}
                    Home{' '}
                  </NavLink>
                  <NavLink className="navbar_option" to="/collection">
                    {' '}
                    Buy Cars{' '}
                  </NavLink>
                  <NavLink className="navbar_option" to="/vendor-register">
                    {' '}
                    Sell Cars{' '}
                  </NavLink>

                  <NavLink className="navbar_option" to="/contactus">
                    {' '}
                    Contact{' '}
                  </NavLink>
                  <NavLink className="navbar_option" to="/about">
                    {' '}
                    About{' '}
                  </NavLink>
                  <Link to="/customer-email-login" className="Navbar_link">
                    <Button colorScheme="blue" className="Navbar_buuton">
                      Login
                    </Button>
                  </Link>
                </div>
              </Flex>
            ) : (
              <Flex alignItems="center" display={{ base: 'none', lg: 'flex' }}>
                <div>
                  <NavLink className="navbar_option" to="/">
                    {' '}
                    Home{' '}
                  </NavLink>
                  <NavLink className="navbar_option" to="/collection">
                    {' '}
                    Buy Cars{' '}
                  </NavLink>
                  <NavLink className="navbar_option" to="/vendor-register">
                    {' '}
                    Sell Cars{' '}
                  </NavLink>

                  <NavLink className="navbar_option" to="/contactus">
                    {' '}
                    Contact{' '}
                  </NavLink>
                  <NavLink className="navbar_option" to="/about">
                    {' '}
                    About{' '}
                  </NavLink>
                </div>
                <Text className="navbar_option_username" style={{ textTransform: 'capitalize' }}>
                  {Customer_detail?.first_name}
                </Text>
                <Popover isLazy zIndex={4}>
                  <PopoverTrigger>
                    <Button variant={'ghost'}>
                      <Avatar size={'xs'} src={Customer_detail?.profile_pic} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent mx="5" w="250px">
                    <PopoverHeader
                      fontWeight="semibold"
                      fontSize={'18'}
                      whiteSpace={'nowrap'}
                      className="navbar_option"
                      style={{ textTransform: 'capitalize' }}
                    >
                      Hello, {Customer_detail?.first_name + ' ' + Customer_detail?.last_name}
                      <Text fontWeight="normal" fontSize={'13px'}>
                        {Customer_detail?.email}
                      </Text>
                    </PopoverHeader>
                    <PopoverBody>
                      <Stack as={'nav'} spacing={4} fontFamily={'Arial'}>
                        <NavLink className="navbar_option" to="/customer">
                          {' '}
                          Dashboard
                        </NavLink>
                        <NavLink className="navbar_option" to="/customer/bookings">
                          {' '}
                          Bookings{' '}
                        </NavLink>
                      </Stack>
                    </PopoverBody>
                    <PopoverFooter>
                      <Stack as={'nav'} spacing={4} fontFamily={'Arial'}>
                        <NavLink className="navbar_option" to="/customer/change-password">
                          Change Password
                        </NavLink>
                        <Box onClick={handleLogout} cursor={'pointer'}>
                          <Text color={'red'}>Logout </Text>
                        </Box>
                      </Stack>
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
              </Flex>
            )}
          </div>

          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ lg: 'none' }}
            onClick={menuHandler}
          />
        </div>
      </Flex>

      {isOpen && (
        <Box 
        zIndex="2"
        position="fixed"
       width="140%"
        left= "70%" /* Adjust the left position as per your layout */
        transform= "translate(-50%)"
         p={3} pr="10" display={{ base: 'block', lg: 'none' }} bg="gray.50">
          <div className="" style={{ display: 'grid' }} >
            <NavLink className="navbar_option" to="/">
              {' '}
              Home{' '}
            </NavLink>
            <NavLink className="navbar_option" to="/collection">
              {' '}
              Buy Cars{' '}
            </NavLink>
            <NavLink className="navbar_option" to="/vendor-register">
              {' '}
              Sell Cars{' '}
            </NavLink>
            {/* <NavLink className="navbar_option" to="/Blog">
              {' '}
              Blog{' '}
            </NavLink> */}
            <NavLink className="navbar_option" to="/contactus">
              {' '}
              Contact{' '}
            </NavLink>
            <NavLink className="navbar_option" to="/about">
              {' '}
              About{' '}
            </NavLink>
            {!token && !Customer_detail ? (
              <Link to="/customer-email-login" className="Navbar_link">
                <Button colorScheme="blue" className="Navbar_buuton">
                  Login
                </Button>
              </Link>
            ) : (
              <NavLink className="navbar_option" to={'/customer'} style={{ textTransform: 'capitalize' }}>
                <Avatar size={'xs'} src={Customer_detail?.profile_pic} />
                Hello {Customer_detail?.first_name + ' ' + Customer_detail?.last_name}
              </NavLink>
            )}
          </div>
        </Box>
      )}

      <Modal size="xl" isCentered onClose={closeModal} isOpen={isModalOpen} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody pb="10">
            <Heading fontSize="26">What is your location?</Heading>
            <Text>In which city you are looking to buy your car?</Text>
            <ChakraProvider theme={theme}>
              <FormControl variant="floating" id="Location" my="5">
                <Flex>
                  <AsyncSelector placeholder={'Select City'} getItems={getAllLocationss} handleChangeFn={handleChangeFn} defaultValue={deflocation} />
                  <Button size={'md'} colorScheme="red" mx={1} my={0} p={0} bg={'gray.200'} variant={'unstlyed'} onClick={handleCleanLocation}>
                    <FiXCircle fontSize={'22px'}></FiXCircle>
                  </Button>
                </Flex>
              </FormControl>
            </ChakraProvider>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-24px)'
};
export const theme = extendTheme({
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles
              }
            },
            'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label': {
              ...activeLabelStyles
            },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: 'absolute',
              backgroundColor: 'white',
              pointerEvents: 'none',
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: 'left top'
            }
          }
        }
      }
    }
  }
});
