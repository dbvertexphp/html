import {
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginCustomerPhone } from "../Redux/Auth/Auth.action";

export default function CustomerLogin() {
  const [isOtp, setIsOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputPhone, setInputPhone] = useState("");
  const [inputOtp, setInputOtp] = useState("");
  const { loading } = useSelector((state) => state?.CustomerAuthManager);

  let dispatch = useDispatch();
  let navigate = useNavigate();
  let toast = useToast();
  const handleInputChange = (event) => {
    setInputPhone(event.target.value);
  };

  const handleInputOtp = (event) => {
    setInputOtp(event.target.value);
  };

  const sendOtp = () => {
    setIsOtp(true);
  };

  const confirmOtp = () => {
    console.log(inputPhone, inputOtp);

    if (inputPhone == "9876543210" && inputOtp == "1234") {
      navigate("/customer");
    } else {
      navigate("/customer-register");
    }
  };

  // Temp

  const CheckPhoneAvailable = (e) => {
    let phone = inputPhone;
    dispatch(loginCustomerPhone(phone, navigate, toast));
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
            {/* {isOtp ? "OTP Verification" : "Login or Register"} */}
            Login or Register
          </Text>
          <Text>
            {/* {isOtp
              ? `OTP has been sent to ${inputPhone}`
              : "for Better Experience, Order tracking & Regular updates"} */}
            {"for Better Experience, Order tracking & Regular updates"}
          </Text>

          {!isOtp && (
            <InputGroup mt="10">
              <InputLeftAddon children="+91 " />
              <Input
                type="number"
                placeholder="Enter Phone Number"
                onChange={handleInputChange}
              />
            </InputGroup>
          )}

          {/* {isOtp && (
            <InputGroup mt="10">
              <Input
                type="number"
                placeholder="Enter OTP"
                onChange={handleInputOtp}
              />
            </InputGroup>
          )} */}

          {!isOtp && (
            <Center m="4">
              {!isLoading && (
                <Button
                  bg="#30829c"
                  color="white"
                  type="submit"
                  isLoading={loading}
                  // onClick={sendOtp}
                  onClick={CheckPhoneAvailable}
                >
                  Login with Phone Number
                  {/* Send OTP */}
                </Button>
              )}
            </Center>
          )}

          {/* {isOtp && (
            <Center m="4">
              {!isLoading && (
                <Button
                  bg="#30829c"
                  color="white"
                  type="submit"
                  onClick={confirmOtp}
                >
                  Confirm
                </Button>
              )}
            </Center>
          )} */}

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
            to="/customer-email-login"
          >
            Login with Email
          </Text>
        </Card>
      </Flex>
    </Stack>
  );
}
