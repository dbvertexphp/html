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

const EmployeeDash = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  

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
       
     
      </Flex>

    </>
  );
};

export default EmployeeDash;

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
