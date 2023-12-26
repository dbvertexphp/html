import {
  Avatar,
  Button,
  Card,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text
} from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LiaBoxSolid,
  LiaCarAltSolid,
  LiaChalkboardTeacherSolid,
  LiaChartBar,
  LiaDollarSignSolid,
  LiaEditSolid,
  LiaHeadphonesAltSolid,
  LiaSignOutAltSolid,
  LiaUserCogSolid
} from 'react-icons/lia';
import { useDispatch, useSelector } from 'react-redux';
import { CUSTOMER_LOGOUT } from '../../Redux/Auth/Auth.types';

export default function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { Customer_detail, token } = useSelector(store => store?.CustomerAuthManager);
  const customer = Customer_detail || JSON.parse(localStorage.getItem('customer_detail_carvendor'));
  let customertoken = token || JSON.parse(localStorage.getItem('customer_token_carvendor'));

  const handleLogout = () => {
    dispatch({ type: CUSTOMER_LOGOUT });
    navigate('/');
  };
  return (
    <>
      <Stack align={'center'} p="5" gap="3" display={{ base: 'none', md: 'flex' }}>
        {customer?.profile_pic ? (
          <Avatar w="110px" h="110px" src={customer?.profile_pic} />
        ) : (
          <Avatar
            w="110px"
            h="110px"
            src="https://img.freepik.com/premium-vector/head-bearded-man-profile-portrait-bearded-brunet-man-face-side-view_276162-124.jpg?w=740"
          />
        )}

        <Text textAlign={'center'} fontWeight={'semibold'} fontSize={22} style={{ textTransform: 'capitalize' }}>
          {customer?.first_name + ' ' + customer?.last_name}
        </Text>

        <Card w="100%" p="4" as={NavLink} to="/customer" bg="#30829c">
          <Flex align={'center'} justifyContent={'space-between'} color="white">
            Dashboard <LiaChalkboardTeacherSolid />
          </Flex>
        </Card>

        <Card w="100%" p="4" as={NavLink} to="/customer/bookings" bg="#30829c">
          <Flex align={'center'} justifyContent={'space-between'} color="white">
            Bookings <LiaBoxSolid />
          </Flex>
        </Card>

        <Card w="100%" p="4" as={NavLink} to="/customer/test-drives" bg="#30829c">
          <Flex align={'center'} justifyContent={'space-between'} color="white">
            Test Drives <LiaCarAltSolid />
          </Flex>
        </Card>

        {/* <Card w="100%" p="4" as={NavLink} to="/customer/support" bg="#30829c">
          <Flex align={"center"} justifyContent={"space-between"} color="white">
            Support <LiaHeadphonesAltSolid />
          </Flex>
        </Card> */}
        <Card w="100%" p="4" as={NavLink} to="/customer/transaction" bg="#30829c">
          <Flex align={'center'} justifyContent={'space-between'} color="white">
            Transactions <LiaChartBar />
          </Flex>
        </Card>

        <Card w="100%" p="4" as={NavLink} to="/customer/edit-profile" bg="#30829c">
          <Flex align={'center'} justifyContent={'space-between'} color="white">
            My Profile <LiaUserCogSolid />
          </Flex>
        </Card>

        <Card w="100%" p="4" as={NavLink} to="/customer/change-password" bg="#30829c">
          <Flex align={'center'} justifyContent={'space-between'} color="white">
            Change Password <LiaEditSolid />
          </Flex>
        </Card>

        <Card w="100%" p="4" as={NavLink} to="/" bg="red.500">
          <Flex align={'center'} justifyContent={'space-between'} color="white" onClick={handleLogout}>
            Logout <LiaSignOutAltSolid />
          </Flex>
        </Card>
      </Stack>

      <Flex display={{ base: 'flex', md: 'none' }} align={'center'} justifyContent={'center'}>
        <Popover isLazy>
          <PopoverTrigger>
            <Button>
              {customer?.profile_pic ? (
                <Avatar size={'xs'} m="3" src={customer?.profile_pic} />
              ) : (
                <Avatar
                  size={'xs'}
                  m="3"
                  src="https://img.freepik.com/premium-vector/head-bearded-man-profile-portrait-bearded-brunet-man-face-side-view_276162-124.jpg?w=740"
                />
              )}
              {customer?.first_name + ' ' + customer?.last_name}
            </Button>
          </PopoverTrigger>
          <PopoverContent mx="5">
            <PopoverHeader align={'center'}>
              {customer?.profile_pic ? (
                <Avatar size="lg" src={customer?.profile_pic} />
              ) : (
                <Avatar
                  size="lg"
                  src="https://img.freepik.com/premium-vector/head-bearded-man-profile-portrait-bearded-brunet-man-face-side-view_276162-124.jpg?w=740"
                />
              )}
            </PopoverHeader>
            <PopoverBody>
              <Stack as={'nav'} spacing={4} fontFamily={'Arial'}>
                <Flex align={'center'} justifyContent={'space-between'} as={NavLink} to="/customer">
                  Dashboard <LiaChalkboardTeacherSolid />
                </Flex>

                <Flex align={'center'} justifyContent={'space-between'} as={NavLink} to="/customer/bookings">
                  Bookings <LiaBoxSolid />
                </Flex>

                <Flex align={'center'} justifyContent={'space-between'} as={NavLink} to="/customer/test-drives">
                  Test Drives <LiaCarAltSolid />
                </Flex>

                <Flex align={'center'} justifyContent={'space-between'} as={NavLink} to="/customer">
                  Transactions <LiaChartBar />
                </Flex>
              </Stack>
            </PopoverBody>
            <PopoverFooter>
              <Stack as={'nav'} spacing={4} fontFamily={'Arial'}>
                <Flex align={'center'} justifyContent={'space-between'} as={NavLink} to="/customer/edit-profile">
                  My Profile <LiaUserCogSolid />
                </Flex>
                <Flex align={'center'} justifyContent={'space-between'} as={NavLink} to="/customer/change-password">
                  Change Password <LiaEditSolid />
                </Flex>
                <Flex align={'center'} justifyContent={'space-between'} onClick={handleLogout} cursor={'pointer'} color={'red'}>
                  Logout
                  <LiaSignOutAltSolid />
                </Flex>
              </Stack>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </Flex>
    </>
  );
}
