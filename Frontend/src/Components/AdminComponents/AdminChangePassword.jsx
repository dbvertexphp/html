import { Button, Card, CardBody, Center, Heading, Input, Text, useToast } from '@chakra-ui/react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';

const UserChangePassword = () => {
  const toast = useToast();
  const navigate = useNavigate();

  let { User_detail, token } = useSelector(store => store?.UserAuthManager);
  const user = User_detail || JSON.parse(localStorage.getItem('user_detail_caruser'));
  let usertoken = token || JSON.parse(localStorage.getItem('user_token_caruser'));

  const oldPassInput = useRef();
  const newPassInput = useRef();
  const confirmPassInput = useRef();

  const changePassHandler = event => {
    event.preventDefault();
    const enteredNewPass = newPassInput.current.value;
    const enteredConfirmPass = confirmPassInput.current.value;
    if (enteredNewPass !== enteredConfirmPass) {
      return toast({
        status: 'error',
        title: 'Passwords do not Match'
      });
    }

    let body = {
      newPass: enteredConfirmPass,
      email: user.email
    };

    axios
      .patch(`${BASE_URL}/api/user/change-pass/${user._id}`, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('admin_token_carvendor'))}`
        }
      })
      .then(res => {
        if (res.status === 200) {
          toast({
            status: 'success',
            title: 'Password Changed Successfully'
          });
          navigate('/admin/dashboard', { replace: true });
        }
      })
      .catch(err => {
        console.log(err);
        toast({
          status: 'error',
          title: err?.response?.data?.message || 'Something Went Wrong'
        });
      });
  };

  return (
    <>
      <Center p="5" m={'auto'}>
        <Card width="400px" border="0.2px solid #ddd" p="5">
          <Text p={'10px'} fontWeight={'500'} fontSize={{ base: '1.3rem', md: '2rem' }}>
            Change Password
          </Text>
          <CardBody>
            <Text>Enter new Password</Text>
            <Input my="1" placeholder="Enter 8 digit password" width="300px" ref={newPassInput} />
            <Text>Confirm new Password</Text>
            <Input my="1" placeholder="Enter 8 digit password" width="300px" ref={confirmPassInput} />
          </CardBody>
          <Button bg="#30829c" colorScheme="green" width="50%" mx="auto" onClick={changePassHandler}>
            Submit
          </Button>
        </Card>
      </Center>
    </>
  );
};

export default UserChangePassword;
