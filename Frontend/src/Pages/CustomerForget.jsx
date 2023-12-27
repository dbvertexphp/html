import {
  Button,
  Card,
  Center,
  Flex,
  Image,
  Input,
  InputGroup,
  Spinner,
  Stack,
  Text,
  useToast,
  InputLeftElement,
  InputRightElement
} from '@chakra-ui/react';
import { RiLockPasswordFill } from 'react-icons/ri';
import { IoIosMail } from 'react-icons/io';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/config';
import { useDispatch } from 'react-redux';
import { loginCustomer } from '../Redux/Auth/Auth.action';

export default function CustomerLoginEmail() {
  const [isPass, setIsPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputEmail, setInputEmail] = useState('');
  const [inputPass, setInputPass] = useState('');
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const handleInputChange = event => {
    setInputEmail(event.target.value);
  };

  const handleInputPass = event => {
    setInputPass(event.target.value);
  };

  const nextHandler = () => {
    // if (inputEmail == "customer@gmail.com") {
    //   setIsPass(true);
    // } else {
    //   navigate("/customer-register");
    // }

    if (!inputEmail) {
      toast({
        title: 'Error',
        description: 'Please Input Email',
        status: 'warning',
        duration: 4000,
        isClosable: true
      });
      return;
    }
    localStorage.setItem('customer_detail_email', JSON.stringify(inputEmail));
    const data = {
      email: inputEmail
    };
    axios
      .post(`${BASE_URL}/api/customer/resend_otp`, data)
      .then(res => {
        if (res.status == 200) {
          setIsPass(true);
          toast({
            title: 'Success',
            description: 'Otp Send Succesfully In Your Email',
            status: 'success',
            duration: 4000,
            isClosable: true
          });
          navigate('/customer-forget-password');
        }
      })
      .catch(err => {
        console.log(err);
        toast({
          title: 'Oops',
          description: 'Server Error',
          status: 'error',
          duration: 4000,
          isClosable: true
        });
        setIsPass(false);
        // navigate('/customer-register');
      });
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
        <Card border="1px solid #fffff" boxShadow={' rgba(0, 100, 0, 0) 0px 0px 0px 0px'}>
          <Text fontWeight={'bold'} className="auth_hending">
            Forget Password
          </Text>
          <Text fontWeight={'semibold'} className="auth_hending_content" mt="5">
            {isPass ? `Enter password linked with ${inputEmail}` : 'Please fill your information below'}
          </Text>

          <InputGroup mt="10">
            <InputLeftElement pointerEvents="none" pt="10px">
              <h1 style={{ fontSize: '20px' }}>
                <IoIosMail />
              </h1>
            </InputLeftElement>
            <Input style={{ height: '50px' }} isRequired type="email" placeholder="Enter Email ID" onChange={handleInputChange} />
          </InputGroup>

          <Center m="4" className="auth_buttons" alignSelf={'center'}>
            {!isLoading && (
              <Button
                className="auth_buttons_text"
                bg="#1097B1"
                colorScheme="#1097B1"
                variant="ghost"
                color="white"
                type="submit"
                onClick={nextHandler}
              >
                Send
              </Button>
            )}
          </Center>
          <Center mt="4">{isLoading && <Spinner />}</Center>
        </Card>
      </Flex>
    </Stack>
  );
}
