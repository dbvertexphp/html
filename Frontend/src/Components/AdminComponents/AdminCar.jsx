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
  Container,
  Tag,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Spacer,
  Spinner,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { FiEdit3, FiRefreshCcw } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  UpdateCarByID,
  getCarByID,
  getCarsAdmin,
  getCarsByVendorID,
} from "../../Redux/App/Actions/Vendors/Car.action";
import { BsFillEyeFill } from "react-icons/bs";
import { getVendors } from "../../Redux/App/Actions/Vendor.action";
import { getTestDrivesCarIds } from "../../Redux/App/Actions/TestDrive.action";
import ViewSingleCarModal from "../Extra/ViewSingleCarModal";
import PaginationBox from "../Extra/Pagination";
import TableLoader from "../Extra/TableLoader";

const AdminCar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  let { User_detail, token } = useSelector((store) => store?.UserAuthManager);
  const user =
    User_detail || JSON.parse(localStorage.getItem("user_detail_carvendor"));
  let admintoken =
    token || JSON.parse(localStorage.getItem("admin_token_carvendor"));

  const queryParams = new URLSearchParams(location.search);
  const q = queryParams.get("vendor") || "";
  const [page, setPage] = useState(1);
  const [cars, setcars] = useState([]);
  const [Tdrives, setTdrives] = useState({});

  const { totalCars, loading, error } = useSelector(
    (state) => state?.CarManager
  );
  const { vendors } = useSelector((state) => state?.VendorManager);

  const [sortby, setsortby] = useState("");
  const [vendorID, setvendorID] = useState(q);
  const [refresh, setrefresh] = useState(false);

  const [Ostatus, setOstatus] = useState("");
  const [editingID, seteditingID] = useState("");
  const cancelRef = useRef();
  const {
    isOpen: isDocOpen,
    onOpen: onDocOpen,
    onClose: onDocClose,
  } = useDisclosure();
  const {
    isOpen: isViewOpen,
    onOpen: onViewOpen,
    onClose: onViewClose,
  } = useDisclosure();
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  const [ViewSingleCar, setViewSingleCar] = useState({});

  const getData = () => {
    if (!vendorID) {
      let data = { sortby, page };
      dispatch(getCarsAdmin(setcars, data, admintoken));
    }
    dispatch(getVendors({}, () => "", admintoken));
  };

  const handleFeaturedInChange = (id, key) => {
    let data = {
      trending_car: 0,
      hotdeal_car: 0,
      upcoming_car: 0,
      featured_car: 0,
    };
    data = { ...data, [key]: 1 };
    dispatch(
      UpdateCarByID(
        id,
        data,
        toast,
        getData,
        "Updated Car Status Successfully",
        admintoken
      )
    );
  };

  const GetCarByID = (id) => {
    dispatch(getCarByID(id, toast, setViewSingleCar, admintoken));
    onViewOpen();
  };

  const handleStatusChange = (value, id) => {
    const data = {
      status: value,
      updateType: "statusUpdate",
    };
    dispatch(
      UpdateCarByID(
        id,
        data,
        toast,
        getData,
        "Status Updated Successfully",
        admintoken
      )
    );
  };
  const returnCategoryValue = (el) => {
    if (el?.featured_car == 1) return "featured_car";
    if (el?.trending_car == 1) return "trending_car";
    if (el?.hotdeal_car == 1) return "hotdeal_car";
    if (el?.upcoming_car == 1) return "upcoming_car";
  };
  const refreshAll = (e) => {
    setvendorID(null);
    setsortby("");
    setrefresh((prev) => !prev);
    setPage(1);
  };

  useEffect(() => {
    if (vendorID) {
      let data = { sortby };
      dispatch(getCarsByVendorID(vendorID, page, data, setcars, admintoken));
    } else {
      getData();
    }
    dispatch(getTestDrivesCarIds(setTdrives, admintoken));
  }, [refresh, sortby, vendorID, page]);

  const itemsPerPage = 10; //
  const startingSerialNumber = (page - 1) * itemsPerPage + 1;
  return (
    <Container
      maxW="container"
      borderRadius="5px"
      minH={"610px"}
      padding={"20px"}
      backgroundColor={"white"}
    >
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
        <Select
          w={"62%"}
          backgroundColor={"white"}
          placeholder="Filter By Vendor"
          onChange={(e) => {
            setvendorID(e.target.value);
          }}
        >
          {vendors?.length > 0 &&
            vendors?.map((el) => {
              return (
                <option key={el._id} value={el._id}>
                  {el.vendor_name}
                </option>
              );
            })}
        </Select>
        <Spacer />
        <Text display={{ base: "none", md: "flex" }}>SORT BY:</Text>
        <Select
          placeholder="All"
          w={{ base: "40%", md: "20%" }}
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
          onClick={() => {
            refreshAll();
            return;
          }}
        >
          Refresh
        </Button>
      </HStack>
      <TableContainer
        position={"relative"}
        my={"10px"}
        maxHeight={"700px"}
        overflowY={"auto"}
        backgroundColor={"white"}
        // borderRadius={"5px"}
      >
        <Table size={"sm"} variant="striped" border={"1px solid #ddd"}>
          <Thead
            backgroundColor={"white"}
            position={"sticky"}
            top="0"
            border={"1px solid white"}
          >
            <Tr>
              <Th sx={headCellStyle}> Sr. no</Th>

              <Th sx={headCellStyle}>Image</Th>
              <Th sx={headCellStyle}>Car details</Th>
              <Th sx={headCellStyle}>Vendor detail</Th>
              <Th sx={headCellStyle}>Location</Th>
              <Th sx={headCellStyle}>Description</Th>
              <Th sx={headCellStyle}>Featured in</Th>

              <Th sx={headCellStyle}>Status/Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <TableLoader />
            ) : cars?.length > 0 ? (
              cars?.map((row, index) => {
                return (
                  <Tr key={row?._id}>
                    <Td sx={{ ...cellStyle, textAlign: "center" }}>
                      {index + startingSerialNumber}
                    </Td>
                    <Td sx={cellStyle}>
                      <Image
                        src={row.primary_image}
                        w={{ base: "60px", md: "200px" }}
                        h={{ base: "40px", md: "100px" }}
                        objectFit={"cover"}
                        objectPosition={"center"}
                      />
                    </Td>
                    <Td sx={{ ...cellStyle, paddingLeft: "8px" }}>
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
                    <Td sx={cellStyle} w={"180px"}>
                      <Flex flexWrap={"wrap"} gap={"1"}>
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
                        <Tag sx={tagsStyle} bg={row?.color?.code}></Tag>
                      </Flex>
                      <Text>
                        <b>Price : ₹ {row?.price}</b>
                      </Text>
                      <Text
                        color={"blue"}
                        cursor={"pointer"}
                        onClick={() => {
                          if (Tdrives[row._id] > 0) {
                            navigate("/admin/test-drives?car=" + row._id);
                          }
                        }}
                      >
                        <b>Test Drives : {Tdrives[row._id] || 0}</b>
                      </Text>
                    </Td>
                    <Td sx={cellStyle}>
                      {/* <Box display={"flex"} flexDirection={"column"} w={"100%"}> */}
                      <Select
                        color={"black"}
                        size={"xs"}
                        variant={"ghost"}
                        border={"1px solid #ddd"}
                        borderRadius={"5px"}
                        p={"1"}
                        value={returnCategoryValue(row) || ""}
                        onChange={(e) =>
                          handleFeaturedInChange(row?._id, e.target.value)
                        }
                        fontWeight={500}
                      >
                        <option value="" style={{ color: "orange" }}>
                          Select category
                        </option>
                        <option
                          value="featured_car"
                          style={{ color: "orange" }}
                        >
                          Featured Car
                        </option>
                        <option
                          value="upcoming_car"
                          style={{ color: "purple" }}
                        >
                          Upcoming Car
                        </option>
                        <option value="hotdeal_car" style={{ color: "green" }}>
                          Hot Deal
                        </option>
                        <option value="trending_car" style={{ color: "red" }}>
                          Trending Car
                        </option>
                      </Select>
                      {/* <Flex flexWrap={"wrap"} width={"210px"} gap={"1"}>
                          {row?.trending_car == 1 && (
                            <Tag
                              sx={tagsStyle}
                              size={"sm"}
                              variant="solid"
                              colorScheme="teal"
                              onClick={() =>
                                handleFeaturedInDelete(row?._id, "trending_car")
                              }
                              style={{ cursor: "pointer" }}
                            >
                              Trending
                            </Tag>
                          )}
                          {row?.upcoming_car == 1 && (
                            <Tag
                              sx={tagsStyle}
                              size={"sm"}
                              variant="solid"
                              colorScheme="teal"
                              onClick={() =>
                                handleFeaturedInDelete(row?._id, "upcoming_car")
                              }
                              style={{ cursor: "pointer" }}
                            >
                              Upcoming
                            </Tag>
                          )}
                          {row?.featured_car == 1 && (
                            <Tag
                              sx={tagsStyle}
                              size={"sm"}
                              variant="solid"
                              colorScheme="teal"
                              onClick={() =>
                                handleFeaturedInDelete(row?._id, "featured_car")
                              }
                              style={{ cursor: "pointer" }}
                            >
                              Featured
                            </Tag>
                          )}
                          {row?.hotdeal_car == 1 && (
                            <Tag
                              sx={tagsStyle}
                              size={"sm"}
                              variant="solid"
                              colorScheme="teal"
                              onClick={() =>
                                handleFeaturedInDelete(row?._id, "hotdeal_car")
                              }
                              style={{ cursor: "pointer" }}
                            >
                              Hot Deal
                            </Tag>
                          )}
                        </Flex> */}
                      {/* </Box> */}
                    </Td>

                    <Td sx={{ ...cellStyle, textAlign: "center" }}>
                      <Box display={"flex"} p={1}>
                        <Select
                          w={"90%"}
                          value={row.status}
                          bg={
                            row.status === "pending"
                              ? "orange.300"
                              : row.status === "under review"
                              ? "purple.400"
                              : row.status === "approved"
                              ? "green.400"
                              : row.status === "rejected"
                              ? "red.400"
                              : "red.400" // Default case
                          }
                          color={"white"}
                          size={"xs"}
                          variant={"ghost"}
                          border={"1px solid"}
                          borderRadius={"5px"}
                          onChange={(e) => {
                            if (
                              e.target.value == "rejected" ||
                              e.target.value == "deactivate"
                            ) {
                              setOstatus(e.target.value);
                              onOpen1();
                              seteditingID(row._id);

                              return;
                            }
                            handleStatusChange(e.target.value, row?._id);
                          }}
                        >
                          <option value="pending" style={{ color: "orange" }}>
                            Pending
                          </option>
                          <option
                            value="under review"
                            style={{ color: "purple" }}
                          >
                            Under Review
                          </option>
                          <option value="approved" style={{ color: "green" }}>
                            Approve
                          </option>
                          <option value="rejected" style={{ color: "red" }}>
                            Reject
                          </option>

                          <option value="deactivate" style={{ color: "red" }}>
                            Deactivate
                          </option>
                        </Select>
                      </Box>

                      <HStack gap={"1"} justifyContent="center">
                        <Button
                          variant={"solid"}
                          colorScheme={"gray"}
                          size={"sm"}
                          p={1}
                          bg={"gray.300"}
                          onClick={() => {
                            GetCarByID(row._id);
                            onViewOpen();
                          }}
                        >
                          <BsFillEyeFill />
                        </Button>
                        <Link to={`/admin/car/edit/${row?._id}`}>
                          <Button
                            p={1}
                            // isDisabled={row?.status === "approved"}
                            colorScheme="blue"
                            size={"sm"}
                            onClick={() => {
                              onViewClose();
                            }}
                          >
                            <FiEdit3 />
                          </Button>
                        </Link>
                      </HStack>
                    </Td>
                  </Tr>
                );
              })
            ) : (
              <Tr>
                <Td colSpan={"12"}>
                  <center>
                    <Text>No Cars Found</Text>
                  </center>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      {<PaginationBox total={totalCars || 0} page={page} setpage={setPage} />}
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
      {/**<!--*------- <Disable Poput> ----------->*/}
      <AlertDialog
        isCentered
        isOpen={isOpen1}
        leastDestructiveRef={cancelRef}
        onClose={onClose1}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Alert! Changing Car Status.
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You want to change this car's status to{" "}
              {Ostatus?.toUpperCase()}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose1}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleStatusChange(Ostatus, editingID);
                  onClose1();
                }}
                ml={3}
              >
                {Ostatus?.toUpperCase()}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
};

export default AdminCar;

const cellStyle = {
  padding: "3px 6px",
  fontSize: "12px",
};

const tagsStyle = {
  padding: "1px 3px",
  fontSize: "12px",
};

const headCellStyle = {
  padding: "1px",
  textAlign: "center",
};
