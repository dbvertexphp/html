import React, { useState, useEffect } from "react";
import { Input, InputGroup, Select } from "@chakra-ui/react";

import axios from "axios";
import { BASE_URL } from "../../utils/config";

const ReusableDateFilter = ({
  searchUrl,
  datatype,
  Entities,
  setData,

  setFiltering,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
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
    <InputGroup width={"500px"}>
      <Input
        type="date"
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setFiltering(true);
        }}
      />
    </InputGroup>
  );
};

export default ReusableDateFilter;
