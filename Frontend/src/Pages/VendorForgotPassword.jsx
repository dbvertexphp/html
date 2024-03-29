import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Image,
    useToast,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { NavLink, useNavigate } from "react-router-dom";
  import logo from "../assets/Icons/logo.png";
  import { ForgotVendor } from "../Redux/Auth/Auth.action";
  import { theme2 } from "../utils/colours";
  
  export default function Forgot() {
    const [form, setForm] = useState({
      email: "",
      
    });
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();
  
    const { loading } = useSelector((store) => store.UserAuthManager);
  
    const handleChange = (event) => {
      const { value, name } = event.target;
  
      setForm({ ...form, [name]: value });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      dispatch(ForgotVendor(form, navigate, toast));
    };
  
    return (
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack
            bg={"white"}
            spacing={4}
            w={"full"}
            maxW={"md"}
            p={6}
            border={"1px solid #ddd"}
            borderRadius={"5px"}
          >
            <NavLink to="/">
              <Image
                src={logo}
                display={"block"}
                margin={"auto"}
                width="100%"
                h="200px"
                position={"center"}
                objectFit={"cover"}
              />
            </NavLink>
          
            <Heading fontSize={"2xl"}>Forgot Password </Heading>
            <form action="" onSubmit={handleSubmit}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  placeholder="Enter Email"
                  type="email"
                  value={form?.email}
                  name="email"
                  onChange={handleChange}
                  required
                />
              </FormControl>
            
              <br />
              <Stack spacing={6}>
               
                <Button
                  bg={theme2}
                  color={"white"}
                  mx="auto"
                  width="50%"
                  variant={"solid"}
                  type="submit"
                  isLoading={loading}
                >
                 Forgot
                </Button>
              </Stack>
            </form>
          </Stack>
        </Flex>
      
      </Stack>
    );
  }