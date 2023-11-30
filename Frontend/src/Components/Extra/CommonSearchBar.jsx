import React, { useState, useEffect } from "react";
import {
  Flex,
  Input,
  Box,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { FiXCircle } from "react-icons/fi";

const ReusableSearchBar = ({
  searchUrl,
  datatype,
  placeholder,
  Entities,
  setData,
  getData,
  setFiltering,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBar, setSearchBar] = useState("");
  let token =
    JSON.parse(localStorage.getItem("admin_token_carvendor")) ||
    JSON.parse(localStorage.getItem("vendor_token_carvendor")) ||
    JSON.parse(localStorage.getItem("customer_token_carvendor"));

  useEffect(() => {
    let data = { [datatype]: { $regex: searchQuery, $options: "i" } };
    const GetFilterEntity = () => {
      axios
        .post(`${BASE_URL}/api/${searchUrl}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setData(res?.data[Entities]))
        .catch((err) => console.log(err));
    };
    const Timer = setTimeout(() => {
      if (searchQuery !== "") {
        GetFilterEntity();
      }
    }, 300);
    return () => {
      clearTimeout(Timer);
    };
  }, [searchQuery]);

  return (
    <InputGroup>
      <Input
        type="text"
        value={searchBar}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setSearchBar(e.target.value);
          setFiltering(true);
        }}
        placeholder={placeholder}
      />
      <InputRightElement>
        <FiXCircle
          onClick={() => {
            setSearchBar("");
            setSearchQuery("");
            getData();
          }}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default ReusableSearchBar;
