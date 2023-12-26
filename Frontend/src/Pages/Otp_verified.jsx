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
  InputRightElement,
  HStack,
  PinInput,
  PinInputField,
  Heading,
  Box
} from '@chakra-ui/react';
import { RiLockPasswordFill } from 'react-icons/ri';
import { IoIosMail } from 'react-icons/io';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
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
  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');
  const customer_email = JSON.parse(localStorage.getItem('customer_detail_email'));

  useEffect(() => {
    // Check if all OTP fields are filled
    if (otp1 && otp2 && otp3 && otp4) {
      // Call nextHandler when all OTP digits are entered
      nextHandler();
    }
  }, [otp1, otp2, otp3, otp4]);

  const nextHandler = () => {
    const data = {
      email: customer_email,
      otp: `${otp1}${otp2}${otp3}${otp4}`
    };

    axios
      .post(`${BASE_URL}/api/customer/Otp_verified`, data)
      .then(res => {
        if (res.status === 200) {
          const { token, customer } = res.data;

          // Store token and customer details in localStorage
          localStorage.setItem('customer_token_carvendor', JSON.stringify(token));
          localStorage.setItem('customer_detail_carvendor', JSON.stringify(customer));

          toast({
            title: 'Success',
            description: 'You are registered!',
            status: 'success',
            duration: 4000,
            isClosable: true
          });
          window.location.href = '/';
        } else {
          toast({
            title: 'Oops',
            description: 'Invalid OTP.',
            status: 'error',
            duration: 2000,
            isClosable: true
          });

          // Redirect to the OTP verification page upon verification failure
          // navigate('/otp-verified');
        }
      })
      .catch(err => {
        console.log(err);
        toast({
          title: 'Oops',
          description: 'Invalid OTP.',
          status: 'error',
          duration: 2000,
          isClosable: true
        });

        // Redirect to the OTP verification page upon verification failure
        //navigate('/otp-verified');
      });
  };
  const ResendOtp = () => {
    const data = {
      email: customer_email
    };

    axios
      .post(`${BASE_URL}/api/customer/resend_otp`, data)
      .then(res => {
        if (res.status === 200) {
          toast({
            title: 'Success',
            description: 'Otp Send Successfully!',
            status: 'success',
            duration: 4000,
            isClosable: true
          });
        } else {
          toast({
            title: 'Oops',
            description: 'Invalid OTP.',
            status: 'error',
            duration: 2000,
            isClosable: true
          });

          // Redirect to the OTP verification page upon verification failure
          // navigate('/otp-verified');
        }
      })
      .catch(err => {
        console.log(err);
        toast({
          title: 'Oops',
          description: 'Invalid OTP.',
          status: 'error',
          duration: 2000,
          isClosable: true
        });
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
        <Card border="1px solid #fffff" boxShadow={' rgba(0, 100, 0, 0) 0px 0px 0px 0px'} alignItems={'center'}>
          <Text fontWeight={'bold'} className="auth_hending">
            OTP
          </Text>
          <Flex p={5} flex={1} align={'center'} justify={'center'}>
            <HStack>
              <PinInput>
                <PinInputField value={otp1} onChange={e => setOtp1(e.target.value)} />
                <PinInputField value={otp2} onChange={e => setOtp2(e.target.value)} />
                <PinInputField value={otp3} onChange={e => setOtp3(e.target.value)} />
                <PinInputField value={otp4} onChange={e => setOtp4(e.target.value)} />
              </PinInput>
            </HStack>
          </Flex>
          <Box as="div" _hover={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={ResendOtp}>
            <Heading as="h6" size="xs" className="auth_hending_content">
              Resend
            </Heading>
          </Box>
          <Center mt="4">{isLoading && <Spinner />}</Center>
        </Card>
      </Flex>
    </Stack>
  );
}
