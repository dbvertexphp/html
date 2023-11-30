import {
  Box,
  Button,
  HStack,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
  useDisclosure,
  Image,
  Flex,
  Tag,
  Spacer,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { FiPlusCircle, FiRefreshCcw, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  DeleteCarByID,
  getCarByID,
  getCarsByVendorID,
} from "../../Redux/App/Actions/Vendors/Car.action";
import { BsFillEyeFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import PaginationBox from "../Extra/Pagination";
import ViewSingleCarModal from "../Extra/ViewSingleCarModal";
import TableLoader from "../Extra/TableLoader";

const VendorCar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  let { Vendor_detail, token } = useSelector(
    (store) => store?.VendorAuthManager
  );
  const vendor =
    Vendor_detail ||
    JSON.parse(localStorage.getItem("vendor_detail_carvendor"));
  let vendortoken =
    token || JSON.parse(localStorage.getItem("vendor_token_carvendor"));

  const [page, setPage] = useState(1);
  const [sortby, setsortby] = useState("");
  const [refresh, setrefresh] = useState(false);

  const itemsPerPage = 5; //
  const startingSerialNumber = (page - 1) * itemsPerPage + 1;

  const { totalCars, loading, error } = useSelector(
    (state) => state?.CarManager
  );
  const [VendorCars, setVendorCars] = useState([]);
  const {
    isOpen: isViewOpen,
    onOpen: onViewOpen,
    onClose: onViewClose,
  } = useDisclosure();
  const [ViewSingleCar, setViewSingleCar] = useState({});

  const {
    isOpen: isDocOpen,
    onOpen: onDocOpen,
    onClose: onDocClose,
  } = useDisclosure();

  const getData = () => {
    let data = { sortby };
    dispatch(
      getCarsByVendorID(
        Vendor_detail?._id,
        page,
        data,
        setVendorCars,
        vendortoken
      )
    );
  };

  useEffect(() => {
    getData();
  }, [page, sortby]);

  const DeleteCarById = (id) => {
    dispatch(DeleteCarByID(id, toast, getData, vendortoken));
  };
  const GetCarByID = (id) => {
    dispatch(getCarByID(id, toast, setViewSingleCar, vendortoken));
    onViewOpen();
  };
  const refreshAll = (e) => {
    setsortby("");
    setrefresh((prev) => !prev);
  };
  const returnCategoryValue = (el) => {
    if (el?.featured_car == 1) return "featured_car";
    if (el?.trending_car == 1) return "trending_car";
    if (el?.hotdeal_car == 1) return "hotdeal_car";
    if (el?.upcoming_car == 1) return "upcoming_car";
  };
  return (
    <Box background={"white"} p="5" borderRadius="5px">
      <Text
        mb="2"
        p={"10px"}
        fontWeight={"500"}
        fontSize={{ base: "1.3rem", md: "2rem" }}
      >
        Cars Management
      </Text>
      <HStack
        py={"10px"}
        justifyContent={"space-between"}
        alignContent={"center"}
      >
        <HStack
          py={"10px"}
          justifyContent={"space-between"}
          alignContent={"center"}
        >
          <Spacer />
          <Text display={{ base: "none", md: "flex" }}>SORT BY:</Text>
          <Select
            placeholder="All"
            w={{ base: "40%", md: "100%" }}
            bg="gray.100"
            value={sortby}
            onChange={(e) => {
              if (e.target.value == "") return setrefresh((prev) => !prev);
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

          <Button
            colorScheme="blue"
            variant={"solid"}
            p={0}
            onClick={() => {
              refreshAll();
              return;
            }}
          >
            <FiRefreshCcw />
          </Button>
        </HStack>
        <Link to="/vendor/cars/add-car">
          <Button
            colorScheme="blue"
            variant={"solid"}
            rightIcon={<FiPlusCircle />}
          >
            Add car
          </Button>
        </Link>
      </HStack>
      <TableContainer
        position={"relative"}
        my={"10px"}
        maxHeight={"700px"}
        overflowY={"auto"}
        backgroundColor={"white"}
      >
        <Table size={"sm"} variant="simple">
          <Thead
            backgroundColor={"white"}
            position={"sticky"}
            top="0"
            zIndex={3}
          >
            <Tr>
              <Th sx={headCellStyle}>Sr. no</Th>
              <Th sx={headCellStyle}>Image</Th>
              <Th sx={headCellStyle}>Car details</Th>
              <Th sx={headCellStyle}>Vendor detail</Th>
              <Th sx={headCellStyle}>Location</Th>
              <Th sx={headCellStyle}>Description</Th>

              <Th sx={headCellStyle}>Status</Th>
              <Th sx={headCellStyle}>{"Booking\nStatus"}</Th>
              <Th sx={headCellStyle}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <TableLoader />
            ) : VendorCars?.length > 0 ? (
              VendorCars?.map((row, index) => {
                return (
                  <Tr key={row?._id}>
                    <Td sx={{ ...cellStyle, textAlign: "center" }}>
                      {index + startingSerialNumber}
                    </Td>
                    <Td sx={cellStyle}>
                      <Image
                        src={row.primary_image}
                        w={{ base: "60px", md: "180px" }}
                        h={{ base: "40px", md: "100px" }}
                        objectFit={"cover"}
                        objectPosition={"center"}
                      />
                    </Td>
                    <Td sx={cellStyle}>
                      <div>
                        <b>Car Name : {row?.name?.name}</b>
                      </div>
                      <div>
                        <b>Model : {row?.model?.name}</b>
                      </div>
                      <div>
                        <b>Brand : {row?.make?.name}</b>
                      </div>
                      <div>Registered Year : {row?.regYear}</div>
                      <div>Ownership : {row?.ownership}</div>
                    </Td>
                    <Td sx={cellStyle}>
                      <div>
                        <b>{row?.vendorID?.vendor_code}</b>
                      </div>
                      <div>
                        <b>{row?.vendorID?.vendor_name}</b>
                      </div>
                      <div>{row?.vendorID?.email}</div>
                      <div>{row?.vendorID?.mobile_number}</div>
                    </Td>
                    <Td sx={cellStyle}>
                      <Flex flexWrap={"wrap"} width={"250px"} gap={"1"}>
                        {row?.location?.map((el) => (
                          <Text key={el._id} variant="solid" colorScheme="blue">
                            {el.name},
                          </Text>
                        ))}
                      </Flex>
                    </Td>
                    <Td sx={cellStyle}>
                      <Flex alignItems={"center"} gap={"1"}>
                        <Text>
                          <b>Color : </b>
                        </Text>
                        <Tag size={"sm"} bg={row?.color?.code}></Tag> <br />
                      </Flex>

                      <Text>
                        <b>Price : ₹ {row?.price}</b>
                      </Text>
                      {returnCategoryValue(row) ? (
                        <Tag
                          size={"xs"}
                          p={1}
                          textTransform={"capitalize"}
                          fontWeight={"500"}
                        >
                          {returnCategoryValue(row)?.split("_")[0]}
                        </Tag>
                      ) : (
                        <></>
                      )}
                    </Td>

                    <Td sx={{ ...cellStyle, textAlign: "center" }}>
                      <Tag
                        size={"xs"}
                        bg={
                          row.status === "pending"
                            ? "orange.300"
                            : row.status === "under review"
                            ? "purple.500"
                            : row.status === "approved"
                            ? "green.500"
                            : row.status === "rejected"
                            ? "red.500"
                            : row.status === "online"
                            ? "teal.500"
                            : "red.500"
                        }
                        p={1}
                        color={"white"}
                        textTransform={"capitalize"}
                        fontSize={"13px"}
                      >
                        {row?.status}
                      </Tag>
                    </Td>
                    <Td sx={cellStyle}>
                      <Button size={"xs"} colorScheme={"gray"}>
                        {row?.booking_status?.toUpperCase()}
                      </Button>
                    </Td>
                    <Td sx={cellStyle}>
                      <HStack w={"100%"} justifyContent={"center"}>
                        <Button
                          variant={"solid"}
                          colorScheme={"blue"}
                          size={"sm"}
                          p={0}
                          onClick={() => {
                            GetCarByID(row._id);
                          }}
                        >
                          <BsFillEyeFill />
                        </Button>
                        <Button
                          isDisabled={row?.status === "approved"}
                          variant={"solid"}
                          colorScheme={"blue"}
                          size={"sm"}
                          p={0}
                          onClick={() => {
                            navigate(`/vendor/cars/edit-car/${row?._id}`);
                          }}
                        >
                          <AiFillEdit />
                        </Button>
                        <Button
                          variant={"solid"}
                          colorScheme="red"
                          size={"sm"}
                          p={0}
                          onClick={() => DeleteCarById(row._id)}
                        >
                          <FiTrash2 />
                        </Button>
                      </HStack>
                    </Td>
                  </Tr>
                );
              })
            ) : (
              <Tr>
                <Td colSpan={"15"}>
                  {" "}
                  <center>No Cars Found</center>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
        {<PaginationBox total={totalCars || 0} page={page} setpage={setPage} />}
      </TableContainer>

      {/**<!--*------- <View Single Car Modal> ----------->*/}
      <ViewSingleCarModal
        ViewSingleCar={ViewSingleCar}
        isViewOpen={isViewOpen}
        onViewClose={onViewClose}
        isViewLoading={loading}
        setViewSingleCar={setViewSingleCar}
        onDocClose={onDocClose}
        isDocOpen={isDocOpen}
        onDocOpen={onDocOpen}
      />
    </Box>
  );
};
const cellStyle = {
  padding: "3px",
  fontSize: "12px",
  fontWeight: "500",
};

const inputStyle = {
  border: "none",
  margin: "0px",
  padding: "0px",
  textAlign: "center",
};
const headCellStyle = {
  padding: "5px",
  textAlign: "center",
  whiteSpace: "pre",

  wordWrap: "break-word",
};

export default VendorCar;
