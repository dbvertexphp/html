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
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/config";
import { useDispatch } from "react-redux";
import { loginCustomer } from "../Redux/Auth/Auth.action";

export default function CustomerLoginEmail() {
  const [isPass, setIsPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPass, setInputPass] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setInputEmail(event.target.value);
  };

  const handleInputPass = (event) => {
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
        title: "Error",
        description: "Please Input Email",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    const data = {
      email: inputEmail,
    };
    axios
      .post(`${BASE_URL}/api/customer/verify`, data)
      .then((res) => {
        if (res.status == 200) {
          setIsPass(true);
          toast({
            title: "Success",
            description: "You are registered! please Enter your Password",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Oops",
          description: "You are not registered! please register yourself",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        setIsPass(false);
        navigate("/customer-register");
      });
  };

  const confirmPass = () => {
    const payload = {
      email: inputEmail,
      password: inputPass,
    };
    dispatch(loginCustomer(payload, navigate, toast));
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
            Email Login
          </Text>
          <Text>
            {isPass
              ? `Enter password linked with ${inputEmail}`
              : "for Better Experience, Order tracking & Regular updates"}
          </Text>

          {!isPass && (
            <InputGroup mt="10">
              <Input
                isRequired
                type="email"
                placeholder="Enter Email ID"
                onChange={handleInputChange}
              />
            </InputGroup>
          )}

          {isPass && (
            <InputGroup mt="10">
              <Input
                type="password"
                value={inputPass}
                placeholder="Enter Password"
                onChange={handleInputPass}
              />
            </InputGroup>
          )}

          {!isPass && (
            <Center m="4">
              {!isLoading && (
                <Button
                  bg="#30829c"
                  color="white"
                  type="submit"
                  onClick={nextHandler}
                >
                  Next
                </Button>
              )}
            </Center>
          )}

          {isPass && (
            <Center m="4">
              {!isLoading && (
                <Button
                  bg="#30829c"
                  color="white"
                  type="submit"
                  onClick={confirmPass}
                >
                  Submit
                </Button>
              )}
            </Center>
          )}

          <Flex gap={"1"}>
            By continuing I agree with the
            <Text color="blue.500" as={Link} to="/privacy-policy">
              Privacy Policy
            </Text>
            and
            <Text color="blue.500" as={Link} to="/terms-conditions">
              Terms & Conditions
            </Text>
          </Flex>
          <Center mt="4">{isLoading && <Spinner />}</Center>

          <Text
            color="#30829c"
            textAlign={"center"}
            mt="5"
            textDecor={"underline"}
            as={Link}
            to="/customer-login"
          >
            Login with Phone
          </Text>
        </Card>
      </Flex>
    </Stack>
  );
}
