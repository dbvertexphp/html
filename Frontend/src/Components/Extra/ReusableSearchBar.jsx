import React, { useState, useEffect } from "react";
import {
  Flex,
  Input,
  Box,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import axios from "axios";

import { FiX } from "react-icons/fi";
import { Search2Icon } from "@chakra-ui/icons";
import { BASE_URL } from "../../utils/config";

const ReusableSearchBar = ({
  width,
  searchUrl,
  datatype,
  placeholder,
  Entities,
  setData,
  getData,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBar, setSearchBar] = useState("");

  let token =
    JSON.parse(localStorage.getItem("admin_token_carvendor")) ||
    JSON.parse(localStorage.getItem("vendor_token_carvendor")) ||
    JSON.parse(localStorage.getItem("customer_token_carvendor"));

  useEffect(() => {
    let data = {
      search: { [datatype]: { $regex: searchQuery, $options: "i" } },
    };
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
    <InputGroup w={width || "full"}>
      <Input
        type="text"
        value={searchBar}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setSearchBar(e.target.value);
          // setFiltering(true);
        }}
        placeholder={placeholder}
      />
      <InputRightElement>
        {searchBar ? (
          <FiX
            onClick={() => {
              setSearchBar("");
              setSearchQuery("");
              getData();
            }}
          />
        ) : (
          <Search2Icon color="gray.300" />
        )}
      </InputRightElement>
    </InputGroup>
  );
};

export default ReusableSearchBar;
