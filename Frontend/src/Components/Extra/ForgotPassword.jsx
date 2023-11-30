import {
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/config";

const ForgotPassword = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const emailref = useRef();

  const changePassHandler = (event) => {
    event.preventDefault();

    let body = {
      email: emailref.current.value,
    };

    axios
      .patch(`${BASE_URL}/api/vendor/forgot-password`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast({
            status: "success",
            title: "Temporary Password Set Successfully",
            description:
              "You will recieve an email with the temporary password, use it to login.",
            position: "top",
          });
          localStorage.clear();
          navigate("/vendor-login", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        toast({
          status: "error",
          title: err?.response?.data?.message || "Something Went Wrong",
          position: "top",
        });
      });
  };

  return (
    <>
      <Center p="5" m={"auto"} height={"100vh"}>
        <Card width="500px" border="0.2px solid #ddd" p="5">
          <Text
            p={"10px"}
            fontWeight={"500"}
            fontSize={{ base: "1.3rem", md: "2rem" }}
          >
            Change Password With Email
          </Text>
          <CardBody>
            <Text>Enter Registered Email</Text>
            <Input
              my="1"
              border={"1px solid black"}
              placeholder="Enter Email "
              ref={emailref}
            />
            {/* <Text>Enter new Password</Text>
            <Input
              my="1"
              placeholder="Enter 8 digit password"
              width="300px"
              ref={newPassInput}
            />
            <Text>Confirm new Password</Text>
            <Input
              my="1"
              placeholder="Enter 8 digit password"
              width="300px"
              ref={confirmPassInput}
            /> */}
          </CardBody>
          <Flex gap={3} px={4}>
            <Button
              colorScheme="green"
              onClick={changePassHandler}
              width={"80%"}
            >
              Send Code
            </Button>
            <Button colorScheme="gray" onClick={() => navigate("/vendor")}>
              Go Back
            </Button>
          </Flex>
        </Card>
      </Center>
    </>
  );
};

export default ForgotPassword;
