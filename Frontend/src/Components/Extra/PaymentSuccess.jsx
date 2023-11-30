import { Flex, Heading, Tag, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./status.css";

let count = 5;
const PaymentSuccess = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  let navigate = useNavigate();
  const [i, seti] = useState(count);
  useEffect(() => {
    let id = setInterval(() => {
      if (count <= 1) {
        let carId = searchParams.get("carId");

        if (carId) {
          clearInterval(id);
          return navigate(`/product/${carId}`);
        }
        clearInterval(id);
        navigate("/");
        return;
      } else {
        seti((p) => p - 1);
        count = count - 1;
      }
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      w={"full"}
      h={"100vh"}
    >
      <Heading>
        Payment Success{" "}
        <Tag bg={"green"}>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 130.2 130.2"
          >
            <polyline
              className="path check"
              fill="none"
              stroke="white"
              strokeWidth="10"
              strokeLinecap="round"
              strokeMiterlimit="10"
              points="100.2,40.2 51.5,88.8 29.8,67.5 "
            />
          </svg>
        </Tag>
      </Heading>
      <Text>Redirect in {i}</Text>
    </Flex>
  );
};

export default PaymentSuccess;
