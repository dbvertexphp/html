import {
  Button,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  useToast,
  InputLeftElement,
  InputGroup,
  HStack,
  Icon,
  InputRightElement
} from '@chakra-ui/react';
import { RiLockPasswordFill } from 'react-icons/ri';
import { IoIosMail } from 'react-icons/io';
import { FaMobile, FaUser } from 'react-icons/fa';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { signupCustomer } from '../Redux/Auth/Auth.action';

export default function CustomerRegister() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [userDetails, setUserDetails] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });
  const [confirmPass, setConfirmPass] = useState('');
  const [show, setShow] = React.useState(false);
  const [passshow, setPassShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const handleClickPass = () => setPassShow(!passshow);

  const handleInputChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const verifyCredentials = () => {
    if (
      userDetails.first_name == '' ||
      userDetails.last_name == '' ||
      userDetails.email == '' ||
      userDetails.password == '' ||
      confirmPass == ''
    ) {
      return false;
    }
    return true;
  };

  const submitHandler = () => {
    if (!verifyCredentials()) {
      toast({
        title: 'please Input All the fields',
        status: 'warning',
        position: 'bottom',
        duration: 4000
      });
    } else {
      if (userDetails.password !== confirmPass) {
        toast({
          title: 'Password and Confirm Password should be same',
          status: 'warning',
          position: 'bottom',
          duration: 4000
        });
      } else {
        dispatch(signupCustomer(userDetails, navigate, toast));
      }
    }
  };

  return (
    <Stack minH={'80vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          objectPosition="center"
          src="/assets_public/auth_img.png"
          style={{
            boxShadow: 'inset 67px - 76px 66px 10px rgba(255, 255, 255, 1)'
          }}
          minW="100%"
          maxH="80vh"
        />
      </Flex>
      <Flex p={5} flex={1} align={'center'} justify={'center'}>
        <Card border="1px solid #fffff" boxShadow={' rgba(0, 100, 0, 0) 0px 0px 0px 0px'} width="50%">
          <Text fontWeight={'bold'} className="auth_hending">
            Sign Up
          </Text>
          <Text fontWeight={'semibold'} className="auth_hending_content" mt="5">
            {'Please fill your information below'}
          </Text>

          <InputGroup mt="10">
            <InputLeftElement pointerEvents="none" pt="10px">
              <h1 style={{ fontSize: '20px' }}>
                <FaUser />
              </h1>
            </InputLeftElement>
            <Input
              style={{ height: '50px' }}
              placeholder="Enter first name"
              name="first_name"
              isRequired={true}
              size="lg"
              value={userDetails.first_name}
              onChange={handleInputChange}
            />
          </InputGroup>

          <InputGroup mt="10">
            <InputLeftElement pointerEvents="none" pt="10px">
              <h1 style={{ fontSize: '20px' }}>
                <FaUser />
              </h1>
            </InputLeftElement>
            <Input
              style={{ height: '50px' }}
              placeholder="Enter last name"
              name="last_name"
              isRequired={true}
              size="lg"
              value={userDetails.last_name}
              onChange={handleInputChange}
            />
          </InputGroup>

          <InputGroup mt="10">
            <InputLeftElement pointerEvents="none" pt="10px">
              <h1 style={{ fontSize: '20px' }}>
                <FaMobile />
              </h1>
            </InputLeftElement>
            <Input
              style={{ height: '50px' }}
              placeholder="Enter Phone Number"
              name="phone_number"
              isRequired={true}
              size="lg"
              value={userDetails.phone_number}
              onChange={handleInputChange}
            />
          </InputGroup>

          <InputGroup mt="10">
            <InputLeftElement pointerEvents="none" pt="10px">
              <h1 style={{ fontSize: '20px' }}>
                <IoIosMail />
              </h1>
            </InputLeftElement>
            <Input
              style={{ height: '50px' }}
              placeholder="Enter email id"
              name="email"
              isRequired={true}
              size="lg"
              value={userDetails.email}
              onChange={handleInputChange}
            />
          </InputGroup>

          <InputGroup mt="10">
            <InputLeftElement pointerEvents="none" pt="10px">
              <h1 style={{ fontSize: '20px' }}>
                <RiLockPasswordFill />
              </h1>
            </InputLeftElement>
            <Input
              style={{ height: '50px' }}
              size="lg"
              type={passshow ? 'text' : 'password'}
              placeholder="Enter password"
              name="password"
              isRequired={true}
              value={userDetails.password}
              onChange={handleInputChange}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClickPass}>
                {passshow ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>

          <InputGroup mt="10">
            <InputLeftElement pointerEvents="none" pt="10px">
              <h1 style={{ fontSize: '20px' }}>
                <RiLockPasswordFill />
              </h1>
            </InputLeftElement>
            <Input
              style={{ height: '50px' }}
              size="lg"
              placeholder="Confirm password"
              type={show ? 'text' : 'password'}
              isRequired={true}
              value={confirmPass}
              onChange={e => setConfirmPass(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>

          <Button m="5" bg="#30829c" color="white" alignSelf={'center'} onClick={submitHandler}>
            Submit Details
          </Button>
          <Flex gap={'1'} mt="50px" justifyContent={'space-between'}>
            <Text>Already have an account?</Text>
            <Text color="blue.500" as={Link} to="/customer-email-login">
            Login to your account
            </Text>
          </Flex>
        </Card>
      </Flex>
    </Stack>
  );
}
