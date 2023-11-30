import React, { useState, useEffect } from "react";
import { Button, Flex, Input, Box } from "@chakra-ui/react";

import axios from "axios";
import { BASE_URL } from "../../utils/config";

const SearchBarComponent = ({ setMarkvendor }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBar, setSearchBar] = useState("");
  const [FilterEntity, setFilteredEntity] = useState([]);
  useEffect(() => {
    let data = { first_name: { $regex: searchQuery, $options: "i" } };
    const GetFilterEntity = () => {
      axios
        .post(`${BASE_URL}/api/vendor/search-vendor`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => setFilteredEntity(res?.data?.Vendors))
        .catch((err) => console.log(err));
    };
    const Timer = setTimeout(() => {
      if (searchQuery !== "") {
        GetFilterEntity();
      }
    }, 300);
    return () => {
      setFilteredEntity([]);
      clearTimeout(Timer);
    };
  }, [searchQuery]);

  const HandleSelectvendor = (vendor) => {
    setFilteredEntity([]);
    setSearchBar(
      `${vendor.first_name} ${vendor.last_name} - code: ${vendor.customer_code}`
    );
    setMarkvendor(vendor);
  };

  const liststyles = {
    padding: "6px 12px",
    border: "0.1px dotted gray",
    borderRadius: "2px",
  };
  const UlStyles = {
    position: "absolute",
    background: "white",
    zIndex: "5",
    width: "100%",
    listStyle: "none",
    maxHeight: "260px",
    overflowY: "scroll",
    overflowX: "hidden",
  };

  const closedropdown = (e) => {
    if (!e.target.matches("[data-dropdown]")) {
      setFilteredEntity([]);
    }
  };
  return (
    <Flex width={"100%"} onClick={closedropdown} bg="white">
      <Box width={"100%"} style={{ position: "relative" }}>
        <Input
          type="text"
          value={searchBar}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setSearchBar(e.target.value);
          }}
          placeholder="Search for a vendor..."
        />

        {FilterEntity?.length > 0 && (
          <ul style={UlStyles} data-dropdown>
            {FilterEntity?.map((vendor, index) => (
              <li
                onClick={() => HandleSelectvendor(vendor)}
                style={liststyles}
                key={index}
              >
                <Box display={"inline-block"} style={{ width: "280px" }}>
                  {vendor.first_name} {vendor.last_name}
                </Box>
                <Box display={"inline-block"} style={{ width: "150px" }}>
                  - {vendor.customer_code}
                </Box>
                <Box display={"inline-block"} style={{ width: "300px" }}>
                  - {vendor.email}
                </Box>
              </li>
            ))}
          </ul>
        )}
      </Box>
    </Flex>
  );
};

export default SearchBarComponent;
