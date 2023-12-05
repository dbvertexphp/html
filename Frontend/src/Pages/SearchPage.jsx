import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  GridItem,
  Heading,
  Select,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Spacer,
  Spinner,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import ItemCard from "../Components/WebsiteComponents/ItemCard";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { getCars } from "../Redux/App/Actions/Vendors/Car.action";
import Filters from "../Components/WebsiteComponents/Filters";

import { useLocation } from "react-router-dom";
import { FiRefreshCcw, FiX } from "react-icons/fi";
import AsyncSelector from "../Components/Extra/AsyncSelect";
import { getAllCarNamess } from "../Redux/App/Actions/Admin/CarComponents/CarName.action";
import PaginationBox from "../Components/Extra/Pagination";

const initFilters = {
  minPrice: 0,
  maxPrice: 5000000,
  minKms: 0,
  maxKms: 50000,
  brands: [],
  bodytypes: [],
  features: [],
  transmission: [],
  owners: [],
  colors: [],
  seats: [],
};

const SearchPage = () => {
  const dispatch = useDispatch();
  const [displayFilters, setDisplayFilters] = useState([]);

  const locat = useLocation();
  const queryParams = new URLSearchParams(locat.search);
  const q = queryParams.get("q") || "";

  const { location, loading } = useSelector((store) => store?.CarManager);

  const [cars, setcars] = useState([]);
  const [totalCars, settotalCars] = useState(0);
  const [sortby, setsortby] = useState(q);
  const childRef = useRef();
  const [page, setPage] = useState(1);

  let tempfilters = {
    status: "approved",
    minPrice: 0,
    location: location?._id || null,
    maxPrice: 5000000,
    minKms: 0,
    maxKms: 500000,
  };

  const setPageData = (data) => {
    setcars(data?.Cars);
    settotalCars(data?.totalCars);
  };
  const [filters, setFilters] = useState(tempfilters);

  const getData = () => {
    let data = {
      filters: { ...filters, location: location?._id || null },
      sortby,
      page,
      limit: 9,
    };
    dispatch(getCars(setPageData, data));
  };

  useEffect(() => {
    getData();
  }, [filters, sortby, location, page]);

  const refresh = (e) => {
    setPage(1);
    window.location.reload();
  };

  const handleSearchChange = (val) => {
    let data = { search: { name: val._id } };
    setPage(1);
    dispatch(getCars(setPageData, data));
  };
  const callChildFunction = () => {
    childRef.current.clearFilter();
  };

  const correctFilter = (newDisplay) => {
    childRef.current.correctFilter(newDisplay);
  };

  return (
    <>
      <Box mt="3" mb="10" px={{ md: "5" }}>
        <Grid templateColumns="repeat(6, 1fr)" p="2" gap="5">
          <GridItem
            colSpan={{ base: "6", sm: "2", md: "1" }}
            align="center"
            textAlign={"left"}
          >
            <Filters
              ref={childRef}
              filters={filters}
              setFilters={setFilters}
              displayFilters={displayFilters}
              setDisplayFilters={setDisplayFilters}
              callChildFunction={callChildFunction}
            />
          </GridItem>
          <GridItem colSpan={{ base: "6", sm: "4", md: "5" }}>
            <Stack aligh={"center"} m="2">
              <Flex>
                <AsyncSelector
                  handleChangeFn={handleSearchChange}
                  getItems={getAllCarNamess}
                  placeholder={"Search Car by Name"}
                />
                <Button
                  mx={2}
                  bg={"teal"}
                  color={"white"}
                  onClick={refresh}
                  rightIcon={<FiRefreshCcw />}
                >
                  Refresh
                </Button>
              </Flex>
            </Stack>
            {!!displayFilters.length && (
              <Wrap align={"start"} gap="2" m="5" width={"98%"}>
                <Button
                  colorScheme="orange"
                  size="sm"
                  bg="orange.300"
                  onClick={() => {
                    setDisplayFilters([]);
                    setFilters(initFilters);
                    callChildFunction();
                  }}
                >
                  CLEAR ALL
                </Button>{" "}
                {!!displayFilters.length &&
                  displayFilters.map((item, i) => {
                    return (
                      <WrapItem key={i}>
                        <Button
                          size="sm"
                          rightIcon={<FiX />}
                          onClick={() => {
                            let newDisplay = displayFilters.filter(
                              (fil) => fil != item
                            );
                            setDisplayFilters(newDisplay);
                            correctFilter(newDisplay);
                          }}
                        >
                          {item}
                        </Button>
                      </WrapItem>
                    );
                  })}
              </Wrap>
            )}
            <Flex align={"center"} gap="2" m="2">
              <Text fontWeight={"bold"} m="3" fontSize={"20"}>
                {totalCars || 0} Used Cars in {location?.name || "India"}
              </Text>{" "}
              <Spacer />
              <Text display={{ base: "none", md: "flex" }}>SORT BY:</Text>
              <Select
                placeholder="All"
                w={{ base: "40%", md: "20%" }}
                bg="gray.50"
                value={sortby}
                onChange={(e) => {
                  setsortby(e.target.value);
                }}
              >
                <option value={"trending_car"}>Trending</option>
                <option value={"featured_car"}>Featured </option>
                <option value={"hotdeal_car"}>Hot Deals</option>
                <option value={"upcoming_car"}>Upcoming </option>
                <option value={"low_to_high"}>Low to High</option>
                <option value={"high_to_low"}>High to Low</option>
              </Select>
            </Flex>

            {loading ? (
              <Grid templateColumns="repeat(12, 1fr)">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((index) => {
                  return (
                    <GridItem
                      key={index}
                      as="div"
                      colSpan={{ base: 12, md: 4 }}
                      p="5"
                      borderRadius={"10px"}
                      boxShadow="lg"
                      bg="white"
                      m={5}
                    >
                      <Skeleton bg="white" h="250px" />
                      <SkeletonText
                        mt="4"
                        noOfLines={6}
                        spacing="4"
                        skeletonHeight="2"
                      />
                    </GridItem>
                  );
                })}
              </Grid>
            ) : cars?.length > 0 ? (
              <SimpleGrid
                templateColumns={{
                  base: "1fr",
                  md: "1fr 1fr 1fr ",
                }}
              >
                {cars?.map((card, index) => (
                  <ItemCard
                    key={card._id}
                    name={card.name.name}
                    price={card.price}
                    imageURL={card.primary_image}
                    year={card.regYear}
                    km={card.km_driven}
                    fuel={card.fuel_type}
                    _id={card._id}
                    state={card?.regState?.state_code}
                    booking_status={card.booking_status}
                  />
                ))}
              </SimpleGrid>
            ) : (
              <Box w={"full"} h={"full"} textAlign={"center"}>
                <Heading
                  as="h1"
                  size="2xl"
                  my={4}
                  fontWeight="bold"
                  color={"gray.400"}
                >
                  Total Results 0
                </Heading>

                <Text fontSize="sm" color={"gray"}>
                  No Cars Found.
                </Text>
              </Box>
            )}
            {totalCars > 9 && (
              <PaginationBox
                total={totalCars || 0}
                page={page}
                setpage={setPage}
              />
            )}
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default SearchPage;
