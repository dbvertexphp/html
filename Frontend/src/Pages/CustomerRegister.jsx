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
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { signupCustomer } from "../Redux/Auth/Auth.action";

export default function CustomerRegister() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [userDetails, setUserDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pin: "",
    password: "",
  });
  const [confirmPass, setConfirmPass] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const verifyCredentials = () => {
    if (
      userDetails.first_name == "" ||
      userDetails.last_name == "" ||
      userDetails.email == "" ||
      userDetails.address == "" ||
      userDetails.city == "" ||
      userDetails.state == "" ||
      userDetails.pin == "" ||
      userDetails.password == "" ||
      confirmPass == ""
    ) {
      return false;
    }
    return true;
  };

  const submitHandler = () => {
    if (!verifyCredentials()) {
      toast({
        title: "please Input All the fields",
        status: "warning",
        position: "bottom",
        duration: 4000,
      });
    } else {
      if (userDetails.password !== confirmPass) {
        toast({
          title: "Password and Confirm Password should be same",
          status: "warning",
          position: "bottom",
          duration: 4000,
        });
      } else {
        dispatch(signupCustomer(userDetails, navigate, toast));
      }
    }
  };

  return (
    <Stack minH={"80vh"} direction={{ base: "column", md: "row" }}>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          objectPosition="center"
          src="https://img.freepik.com/premium-photo/happy-family-with-car-travel-summer-vacation-car-sunset_76964-24706.jpg"
          style={{
            boxShadow: "inset 67px - 76px 66px 10px rgba(255, 255, 255, 1)",
          }}
        />
      </Flex>
      <Flex p={5} flex={1} align={"center"} justify={"center"}>
        <Card
          p="10"
          border="1px solid #ddd"
          boxShadow={" rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
        >
          <Text fontWeight={"semibold"} fontSize={"24"}>
            Registration Form
          </Text>
          <Flex
            gap="3"
            flexDirection={{ base: "column", md: "row" }}
            mb="3"
            mt="10"
          >
            <FormControl>
              <FormLabel>First name :</FormLabel>
              <Input
                placeholder="Enter first name"
                name="first_name"
                isRequired={true}
                size="sm"
                value={userDetails.first_name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel> Last name :</FormLabel>
              <Input
                placeholder="Enter last name"
                name="last_name"
                isRequired={true}
                size="sm"
                value={userDetails.last_name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Phone Number :</FormLabel>
              <Input
                placeholder="Enter Phone Number"
                name="phone_number"
                isRequired={true}
                size="sm"
                value={userDetails.phone_number}
                onChange={handleInputChange}
              />
            </FormControl>
          </Flex>
          <Flex gap="3" flexDirection={{ base: "column", md: "row" }} mb="3">
            <FormControl>
              <FormLabel>Email :</FormLabel>
              <Input
                type="email"
                placeholder="Enter email id"
                name="email"
                isRequired={true}
                size="sm"
                value={userDetails.email}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel> Address :</FormLabel>
              <Input
                placeholder="Enter address"
                name="address"
                isRequired={true}
                size="sm"
                value={userDetails.address}
                onChange={handleInputChange}
              />
            </FormControl>
          </Flex>
          <Flex gap="3" flexDirection={{ base: "column", md: "row" }} mb="3">
            <FormControl>
              <FormLabel> City :</FormLabel>
              <Input
                placeholder="Enter city"
                name="city"
                isRequired={true}
                size="sm"
                value={userDetails.city}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>State :</FormLabel>
              <Input
                placeholder="Enter state "
                name="state"
                isRequired={true}
                size="sm"
                value={userDetails.state}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>PIN :</FormLabel>
              <Input
                type="number"
                placeholder="Enter pin code"
                name="pin"
                isRequired={true}
                size="sm"
                value={userDetails.pin}
                onChange={handleInputChange}
              />
            </FormControl>
          </Flex>
          <Flex gap="3" flexDirection={{ base: "column", md: "row" }} mb="3">
            <FormControl>
              <FormLabel>Password :</FormLabel>
              <Input
                size="sm"
                type="password"
                placeholder="Enter password"
                name="password"
                isRequired={true}
                value={userDetails.password}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel> Confirm Password :</FormLabel>
              <Input
                size="sm"
                placeholder="Confirm password"
                type="password"
                isRequired={true}
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            </FormControl>
          </Flex>
          <Button
            w={{ md: "30%" }}
            m="5"
            bg="#30829c"
            color="white"
            alignSelf={"center"}
            onClick={submitHandler}
          >
            Submit Details
          </Button>
        </Card>
      </Flex>
    </Stack>
  );
}
