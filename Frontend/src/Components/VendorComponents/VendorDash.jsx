import React, { useEffect, useState } from "react";
import {
  AbsoluteCenter,
  Card,
  CardBody,
  Flex,
  Heading,
  Text,
  CardHeader,
  Spinner,
} from "@chakra-ui/react";
import Pie from "../Extra/ProfileCircle";

import { BsFillCheckCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCarsByVendorID } from "../../Redux/App/Actions/Vendors/Car.action";
import { getVendorDashDetails } from "../../Redux/App/Actions/Admin/Website/Website.action";
import { vendorProfileCompletePercentage } from "../../utils/ProfilePercentCalc";

const VendorDash = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { Vendor_detail, token } = useSelector(
    (store) => store?.VendorAuthManager
  );
  const vendor =
    Vendor_detail ||
    JSON.parse(localStorage.getItem("vendor_detail_carvendor"));
  let vendortoken =
    token || JSON.parse(localStorage.getItem("vendor_token_carvendor"));

  const [VendorCars, setVendorCars] = useState([]);
  const [Dash, setDash] = useState({});

  const { loading, error } = useSelector((state) => state?.CarManager);

  const getData = () => {
    dispatch(getCarsByVendorID(vendor?._id, 1, {}, setVendorCars, vendortoken));
    dispatch(getVendorDashDetails(vendor?._id, setDash, vendortoken));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Text
        mb="2"
        px={"10px"}
        fontWeight={"500"}
        fontSize={{ base: "1.3rem", md: "2rem" }}
      >
        Dashboard
      </Text>

      <Flex
        width={{ md: "99%" }}
        my={5}
        flexWrap={"wrap"}
        gap={2}
        direction={{ base: "column", md: "row" }}
      >
        {/**<!--*------- <Welcome Card> ----------->*/}
        <Card width={{ base: "100%", md: "50%" }} p={5} textAlign={"center"}>
          <Text fontSize={"23px"} fontWeight={"600"} my={"auto"}>
            Welcome To EasyGoCarz!
          </Text>
          <Text fontSize={"18px"} fontWeight={"400"} my={"auto"}>
            Welcome to your personalized vendor dashboard!
            <br />
            Here, you can easily manage your profile and access all the features
            tailored just for you.
          </Text>
        </Card>
        {/**<!--*------- <Total Classes Card> ----------->*/}
        <Card width={{ base: "100%", md: "24%" }}>
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
                  {VendorCars?.length >= 0 ? VendorCars?.length : <Spinner />}
                </Heading>
                <AbsoluteCenter
                  left={4}
                  top={"78%"}
                  background={"white"}
                  borderRadius={"50%"}
                >
                  <BsFillCheckCircleFill fontSize={"40px"} color="lightgreen" />
                </AbsoluteCenter>
              </Flex>
            </Flex>
          </CardBody>

          <Heading fontSize={"1.2rem"} mx={"auto"} my={5}>
            Total Cars
          </Heading>
        </Card>
        {/**<!--*------- <Profile complete Card> ----------->*/}

        <Card
          p={5}
          gap={2}
          width={{ base: "100%", md: "24%" }}
          alignItems={"center"}
          justifyContent={"center"}
          onClick={() => navigate("/vendor/edit-profile")}
        >
          <Pie
            percentage={vendorProfileCompletePercentage(vendor)}
            colour="#2bb341"
          />
          <Text fontSize={"1.2rem"} fontWeight={"700"}>
            Your Profile Completeness
          </Text>
        </Card>
      </Flex>
      <Flex
        width="99%"
        my={5}
        flexWrap={"wrap"}
        gap={2}
        direction={{ base: "column", md: "row" }}
      >
        <Card
          width={{ md: "32%" }}
          alignItems={"center"}
          justifyContent={"center"}
          onClick={() => navigate("/vendor/bookings")}
        >
          <CardHeader>
            <Heading fontSize={"1.5rem"}>Total Bookings</Heading>
          </CardHeader>
          <CardBody>
            <Heading color="#30829c" size={"2xl"}>
              {Dash?.Bookings >= 0 ? Dash?.Bookings : <Spinner />}
            </Heading>
          </CardBody>
        </Card>
        <Card
          width={{ md: "32%" }}
          alignItems={"center"}
          justifyContent={"center"}
          onClick={() => navigate("/vendor/testdrives")}
        >
          <CardHeader>
            <Heading fontSize={"1.5rem"}>Total Test Drives</Heading>
          </CardHeader>
          <CardBody>
            <Heading color="#30829c" size={"2xl"}>
              {Dash?.Tdrives >= 0 ? Dash?.Tdrives : <Spinner />}
            </Heading>
          </CardBody>
        </Card>
        <Card
          width={{ md: "32%" }}
          alignItems={"center"}
          justifyContent={"center"}
          onClick={() => navigate("/vendor/transactions")}
        >
          <CardHeader>
            <Heading fontSize={"1.5rem"}>Total Transactions</Heading>
          </CardHeader>
          <CardBody>
            <Heading color="#30829c" size={"2xl"}>
              {Dash?.Transactions >= 0 ? Dash?.Transactions : <Spinner />}
            </Heading>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
};

export default VendorDash;

const teachers = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const Bardata = {
  labels: teachers,
  datasets: [
    {
      label: "Total Bookings",
      data: generateRandomData(teachers.length),
      backgroundColor: ["teal", "gray"],
    },
  ],
};
const Piedata = {
  labels: [
    "Mathematics",
    "English",
    "Science",
    "History",
    "Geography",
    "Physics",
  ],
  datasets: [
    {
      label: "# of Vendors Joined",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "#FF6384", // Red
        "#36A2EB", // Blue
        "#FFCE56", // Yellow
        "#4CAF50", // Green
        "#9C27B0", // #961595
        "#FF9800", // Orange
      ],

      borderColor: "white",
      borderWidth: 2,
    },
  ],
};

function generateRandomData(length) {
  const data = [];
  for (let i = 0; i < length; i++) {
    data.push(Math.floor(Math.random() * 12) + 1);
  }
  return data;
}
{
  /* <Flex gap={2} direction={{ base: "column", md: "row" }}>
        <Card p={5} width={{ md: "46%" }}>
          <BarChart data={Bardata} />
        </Card>
        <Card p={5} gap={2} width={{ md: "25%" }}>
          <PieChart style={{ maxWidth: "300px" }} data={Piedata} />
        </Card>
        <Card p={5} gap={2} width={{ md: "25%" }}>
          <PieChart style={{ maxWidth: "300px" }} data={Piedata} />
        </Card>
      </Flex> */
}
