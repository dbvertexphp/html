import {
  AbsoluteCenter,
  Card,
  CardBody,
  Flex,
  Text,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import Pie from "../Extra/ProfileCircle";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { customerProfileCompletePercentage } from "../../utils/ProfilePercentCalc";
import { useEffect } from "react";
import { getBookingsByUserId } from "../../Redux/App/Actions/Booking.action";

export default function Dashboard() {
  const navigate = useNavigate();

  let { Customer_detail, token } = useSelector(
    (store) => store?.CustomerAuthManager
  );
  let { bookings } = useSelector((store) => store?.BookingManager);
  const customer =
    Customer_detail ||
    JSON.parse(localStorage.getItem("customer_detail_carvendor"));
  let customertoken =
    token || JSON.parse(localStorage.getItem("customer_token_carvendor"));

  let dispatch = useDispatch();

  const getData = () => {
    dispatch(getBookingsByUserId(customer?._id, customertoken));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Heading my="5" fontWeight={"500"} color="#30829c">
        Dashboard
      </Heading>
      <Card p="5" border="1px solid #ddd">
        <Flex
          width={{ md: "99%" }}
          my={5}
          flexWrap={"wrap"}
          gap={2}
          direction={{ base: "column", md: "row" }}
        >
          {/**<!--*------- <Welcome Card> ----------->*/}
          <Card
            width={{ base: "100%", md: "50%" }}
            p={5}
            textAlign={"center"}
            border="1px solid #ddd"
            boxShadow={" rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
          >
            <Text fontSize={"23px"} fontWeight={"600"} my={"auto"}>
              Welcome To EasyGoCarz!
            </Text>
            <Text fontSize={"18px"} fontWeight={"400"} my={"auto"}>
              Welcome to your personalized user dashboard!
              <br />
              Here, you can easily manage your profile and access all the
              features tailored just for you.
            </Text>
          </Card>
          {/**<!--*------- <Total Classes Card> ----------->*/}
          <Card
            width={{ base: "100%", md: "24%" }}
            onClick={() => navigate("/customer/bookings")}
            border="1px solid #ddd"
            boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
          >
            <CardBody
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Flex
                border={"5px solid teal"}
                borderRadius={"50%"}
                p={1}
                justifyContent={"center"}
                alignItems={"center"}
                pos={"relative"}
              >
                <Flex
                  border={"5px solid pink"}
                  borderRadius={"50%"}
                  width={40}
                  justifyContent={"center"}
                  alignItems={"center"}
                  height={40}
                >
                  <Heading mx={"auto"} size={"3xl"} color="#30829c">
                    {bookings?.length || 0}
                  </Heading>
                  <AbsoluteCenter
                    left={4}
                    top={"78%"}
                    background={"white"}
                    borderRadius={"50%"}
                  >
                    <BsFillCheckCircleFill fontSize={"40px"} color="teal" />
                  </AbsoluteCenter>
                </Flex>
              </Flex>
            </CardBody>

            <Heading fontSize={"1.2rem"} mx={"auto"} my={5}>
              Total Bookings
            </Heading>
          </Card>
          {/**<!--*------- <Profile complete Card> ----------->*/}
          <Card
            p={5}
            gap={2}
            width={{ base: "100%", md: "24%" }}
            alignItems={"center"}
            justifyContent={"center"}
            onClick={() => navigate("/customer/edit-profile")}
            border="1px solid #ddd"
            boxShadow={" rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
          >
            <Pie
              percentage={
                customerProfileCompletePercentage(Customer_detail) || 0
              }
              colour="blue"
            />
            <Heading fontSize={"1.2rem"} mt={5}>
              Profile Completeness
            </Heading>
          </Card>
        </Flex>
      </Card>
    </>
  );
}
