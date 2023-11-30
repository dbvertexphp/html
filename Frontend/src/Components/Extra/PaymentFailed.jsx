import { Flex, Heading, Tag, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./status.css";

let count = 5;
const PaymentFailed = () => {
  let navigate = useNavigate();
  const [i, seti] = useState(count);
  useEffect(() => {
    let id = setInterval(() => {
      if (count <= 1) {
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
        Payment Failed{" "}
        <Tag bg={"red"}>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 130.2 130.2"
          >
            <line
              className="path line"
              fill="none"
              stroke="white"
              strokeWidth="10"
              strokeLinecap="round"
              strokeMiterlimit="10"
              x1="34.4"
              y1="37.9"
              x2="95.8"
              y2="92.3"
            />
            <line
              className="path line"
              fill="none"
              stroke="white"
              strokeWidth="10"
              strokeLinecap="round"
              strokeMiterlimit="10"
              x1="95.8"
              y1="38"
              x2="34.4"
              y2="92.2"
            />
          </svg>
        </Tag>
      </Heading>
      <Text>Redirect in {i}</Text>
    </Flex>
  );
};

export default PaymentFailed;
