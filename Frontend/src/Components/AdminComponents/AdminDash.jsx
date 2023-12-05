import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";

import { PieChart } from "../Extra/PieChart";
import BarChart from "../Extra/BarChart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDashDetails } from "../../Redux/App/Actions/Admin/Website/Website.action";
import { useNavigate } from "react-router-dom";

const AdminDash = () => {
  let { User_detail, token } = useSelector((store) => store?.UserAuthManager);
  const user =
    User_detail || JSON.parse(localStorage.getItem("user_detail_carvendor"));
  let admintoken =
    token || JSON.parse(localStorage.getItem("admin_token_carvendor"));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Dash, setDash] = useState({});
  const getData = () => {
    dispatch(getDashDetails(setDash, admintoken));
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Text mb="2" px={"10px"} fontWeight={"500"} fontSize="2rem">
        Dashboard
      </Text>
      <Flex
        width="99%"
        my={5}
        flexWrap={"wrap"}
        gap={2}
        direction={{ base: "column", md: "row" }}
      >
        <Card
        bg={"#d9aca7"}
        color="white"
        
          width={{ md: "24%" }}
          alignItems={"center"}
          justifyContent={"center"}
          onClick={() => navigate("/admin/booking")}
        >
          <CardHeader>
            <Heading fontSize={"1.5rem"}>Total Bookings</Heading>
          </CardHeader>
          <CardBody>
            <Heading color="white" size={"2xl"}>
              {Dash?.Bookings ?? <Spinner />}
            </Heading>
          </CardBody>
        </Card>
        <Card
         bg={"#bbe2eb"}
         color="white"
          width={{ md: "24%" }}
          alignItems={"center"}
          justifyContent={"center"}
          onClick={() => navigate("/admin/car")}
        >
          <CardHeader>
            <Heading fontSize={"1.5rem"}>Total Cars</Heading>
          </CardHeader>
          <CardBody>
            
            <Heading color="white" size={"2xl"}>
              {Dash?.Cars || <Spinner />}
            </Heading>
          </CardBody>
        </Card>
        <Card
         bg={"#e8ca9b"}
         color="white"
          width={{ md: "24%" }}
          alignItems={"center"}
          justifyContent={"center"}
          onClick={() => navigate("/admin/vendor")}
        >
          <CardHeader>
            <Heading fontSize={"1.5rem"}>Total Vendors</Heading>
          </CardHeader>
          <CardBody>
            <Heading color="white" size={"2xl"}>
              {Dash?.Vendors || <Spinner />}
            </Heading>
          </CardBody>
        </Card>
        <Card
        color="white"
        bg={"#accbde"}
          onClick={() => navigate("/admin/customer")}
          width={{ md: "24%" }}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <CardHeader>
            <Heading fontSize={"1.5rem"}>Total Customers</Heading>
          </CardHeader>
          <CardBody>
            
            <Heading color="white" size={"2xl"}>
              {Dash?.Customers || <Spinner />}
            </Heading>
          </CardBody>
        </Card>

        <Card
        bg={"#dcb2b2"}
        color="white"
          width={{ md: "24%" }}
          alignItems={"center"}
          justifyContent={"center"}
          onClick={() => navigate("/admin/employees")}
        >
          <CardHeader>
            <Heading fontSize={"1.5rem"}>Total Employees</Heading>
          </CardHeader>
          <CardBody>
            <Heading color="white" size={"2xl"}>
              {Dash?.Employees || <Spinner />}
            </Heading>
          </CardBody>
        </Card>
        <Card
        bg={"#e3d4bd"}
        color="white"
          width={{ md: "24%" }}
          alignItems={"center"}
          justifyContent={"center"}
          onClick={() => navigate("/admin/test-drives")}
        >
          <CardHeader>
            <Heading fontSize={"1.5rem"}>Total Test Drives</Heading>
          </CardHeader>
          <CardBody>
            <Heading color="white" size={"2xl"}>
              {Dash?.Tdrives || <Spinner />}
            </Heading>
          </CardBody>
        </Card>

        <Card
        color="white"
        bg={"#a9ccbc"}
          width={{ md: "24%" }}
          alignItems={"center"}
          justifyContent={"center"}
          onClick={() => navigate("/admin/transaction")}
        >
          <CardHeader>
            <Heading fontSize={"1.5rem"}>Total Transactions</Heading>
          </CardHeader>
          <CardBody>
            <Heading color="white" size={"2xl"}>
              {Dash?.Transactions || <Spinner />}
            </Heading>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
};

export const PieData = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "#FF6384", // Red
        "#36A2EB", // Blue
        "#FFCE56", // Yellow
        "#4CAF50", // Green
        "#9C27B0", // Purple
        "#FF9800", // Orange
      ],

      borderColor: ["white", "white", "white", "white", "white", "white"],
      borderWidth: 1,
    },
  ],
};

let lawyers = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

export const BarData = {
  labels: lawyers,
  datasets: [
    {
      label: "Total Customers",
      data: [100, 200, 300, 400, 500, 600, 700, 800, 900, 100],
      backgroundColor: "#ff5801",
    },
    {
      label: "Total Shipments",
      data: [100, 200, 300, 400, 500, 600, 700, 800, 900, 100],
      backgroundColor: "grey",
    },
  ],
};

{
  /* <Flex gap={2} direction={{ base: "column", md: "row" }}>
<Card p={5} width={{ md: "46%" }}>
  <BarChart data={BarData} />
</Card>
<Card p={5} gap={2} width={{ md: "25%" }}>
  <PieChart style={{ maxWidth: "300px" }} data={PieData} />
</Card>
<Card p={5} gap={2} width={{ md: "25%" }}>
  <PieChart style={{ maxWidth: "300px" }} data={PieData} />
</Card>
</Flex> */
}
export default AdminDash;
