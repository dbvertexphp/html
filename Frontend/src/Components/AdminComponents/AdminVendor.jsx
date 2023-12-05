import {
  Box,
  HStack,
  Select,
  Table,
  Button,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Flex,
  useDisclosure,
  useToast,
  Container,
  Spinner,
  Input,
  InputRightElement,
  InputGroup,
  FormErrorMessage,
  FormControl,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  DeleteVendorByID,
  UpdateVendorByID,
  getVendorByID,
  getVendors,
} from "../../Redux/App/Actions/Vendor.action";
import {
  FiEdit3,
  FiPlusCircle,
  FiRefreshCcw,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { BsFillEyeFill } from "react-icons/bs";
import VendorDetailsModal from "./Modals&Popups/VendorDetailsModal";
import {
  getAllCars,
  getCars,
} from "../../Redux/App/Actions/Vendors/Car.action";
import PaginationBox from "../Extra/Pagination";
import { Search2Icon } from "@chakra-ui/icons";
import TableLoader from "../Extra/TableLoader";

const AdminVendor = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();

  let { User_detail, token } = useSelector((store) => store?.UserAuthManager);
  const user =
    User_detail || JSON.parse(localStorage.getItem("user_detail_carvendor"));
  let admintoken =
    token || JSON.parse(localStorage.getItem("admin_token_carvendor"));

  const [CarVMap, setCarVMap] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState(1);
  const [showDateSelect, setShowDateSelect] = useState(false);
  const [dateSelectValue, setDateSelectValue] = useState({
    startDate: "",
    endDate: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("searchQuery") || ""
  );
  const [vendors, setvendors] = useState([]);
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  const cancelRef = React.useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [singleVendor, setSingleVendor] = useState();
  const [editingID, seteditingID] = useState("");

  const { totalVendors, loading, error } = useSelector(
    (store) => store?.VendorManager
  );
  const setCarMap = (data) => {
    let cars = data?.Cars;
    let map = {};
    for (const car of cars) {
      if (car?.vendorID?._id && map[car?.vendorID?._id]) {
        map[car.vendorID._id]++;
      } else if (car?.vendorID?._id) {
        map[car.vendorID._id] = 1;
      }
    }
    setCarVMap(map);
  };

  const ChangeOrderStatusFunction = (id, data) => {
    seteditingID(id);
    data.updatetype = "statusUpdate";
    let title = `Set Vendor Status to ${data.status.toUpperCase()}`;

    dispatch(
      UpdateVendorByID(
        id,
        data,
        toast,
        navigate,
        "/admin/vendor",
        getData,
        title,
        admintoken
      )
    );
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleViewCustomer = (id) => {
    dispatch(getVendorByID(id, setSingleVendor, toast, navigate, admintoken));
  };
  const DeleteOrderFunction = (id) => {
    seteditingID(id);
    dispatch(DeleteVendorByID(id, toast, getData, admintoken));
  };
  const handleFilterBydays = (e) => {
    let params = {};
    for (let entries of searchParams.entries()) {
      params[entries[0]] = entries[1];
    }
    if (e.target.value == "custom") {
      setShowDateSelect(true);
      setSearchParams({ ...params, filterByDays: e.target.value });
    } else {
      setShowDateSelect(false);
      setSearchParams({ ...params, filterByDays: e.target.value });
      setPage(1);
    }
  };

  const handleDateSelector = () => {
    if (dateSelectValue.startDate !== "" && dateSelectValue.endDate !== "") {
      const startDateObj = new Date(dateSelectValue?.startDate)?.toISOString();
      const endDateObj = new Date(dateSelectValue?.endDate)?.toISOString();
      if (endDateObj < startDateObj) {
        return toast({
          title: "End Date cannot occur before Start Date",
          status: "error",
          position: "top",
          duration: 4000,
        });
      } else {
        let params = {};
        for (let entries of searchParams.entries()) {
          params[entries[0]] = entries[1];
        }
        setSearchParams({
          ...params,
          filterByDays: "custom",
          fromDate: startDateObj,
          toDate: endDateObj,
        });
        setPage(1);
      }
    }
  };

  const getData = () => {
    let params = { page: page };

    let filterByDays = searchParams.get("filterByDays");
    let searchQuery = searchParams.get("searchQuery");

    if (filterByDays) params.filterByDays = filterByDays;
    if (searchQuery) params.searchQuery = searchQuery;
    if (params?.filterByDays === "custom") {
      params["fromDate"] = searchParams.get("fromDate");
      params["toDate"] = searchParams.get("toDate");
    }

    dispatch(getVendors(params, setvendors, admintoken));
    dispatch(getAllCars(setCarMap));
  };

  const handleSearchQuery = () => {
    let val = searchQuery;
    if (val.length < 3 || val.length < 0) {
      return toast({
        title: "Search Query must contain atleast 3 charachters",
        status: "warning",
        position: "top",
        duration: 3000,
      });
    }

    let params = {};
    for (let entries of searchParams.entries()) {
      params[entries[0]] = entries[1];
    }

    setSearchParams({ ...params, searchQuery: val });
  };

  const refreshAll = () => {
    setSearchParams({});
    setSearchQuery("");
    setPage(1);
    setShowDateSelect(false);
    document.getElementById("selectFilterByDays").value = "";
    getData();
  };
  useEffect(() => {
    handleDateSelector();
  }, [dateSelectValue]);

  useEffect(() => {
    getData();
  }, [page, searchParams]);

  const itemsPerPage = 10; //
  const startingSerialNumber = (page - 1) * itemsPerPage + 1;

  return (
    <>
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
          Vendors Management
        </Text>
        <HStack
          py={"10px"}
          justifyContent={"space-between"}
          alignContent={"center"}
        >
          <InputGroup w={"full"}>
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={"Search by Vendor Details"}
            />
            <InputRightElement>
              {searchQuery ? (
                <FiX onClick={refreshAll} />
              ) : (
                <Search2Icon color="gray.300" />
              )}
            </InputRightElement>
          </InputGroup>

          {searchQuery && (
            <Button color={"blue.500"} onClick={handleSearchQuery}>
              <Search2Icon />
            </Button>
          )}
          <Select
            backgroundColor={"white"}
            onChange={handleFilterBydays}
            id="selectFilterByDays"
          >
            <option value={""}>Filter By Days</option>
            <option value={"today"}>today</option>
            <option value={"yesterday"}>yesterday</option>
            <option value={"7days"}>last 7 days</option>
            <option value={"thismonth"}>this month</option>
            <option value={"lastmonth"}>last month</option>
            <option value={"last3month"}>last 3 month</option>
            <option value={"thisyear"}>this year</option>
            <option value={"custom"}>Custom range</option>
          </Select>

          {showDateSelect && (
            <HStack p={1.5} borderRadius={"5px"}>
              <HStack>
                <p>From</p>
                <Input
                  type={"date"}
                  size="sm"
                  onChange={(e) =>
                    setDateSelectValue({
                      ...dateSelectValue,
                      startDate: e.target.value,
                    })
                  }
                />
              </HStack>
              <HStack>
                <p>To</p>
                <Input
                  type={"date"}
                  size="sm"
                  onChange={(e) =>
                    setDateSelectValue({
                      ...dateSelectValue,
                      endDate: e.target.value,
                    })
                  }
                />
              </HStack>
            </HStack>
          )}
          <Button
            bg="#30829c"
            color="white"
            variant={"solid"}
            w={"22%"}
            onClick={refreshAll}
          >
            Refresh
          </Button>

          <Link to={"/admin/vendor/add-vendor"}>
            <Button
              bg="#30829c"
              color="white"
              variant={"solid"}
              rightIcon={<FiPlusCircle />}
            >
              Add Vendor
            </Button>
          </Link>
        </HStack>

        <TableContainer
          position={"relative"}
          my={"10px"}
          maxHeight={"700px"}
          overflowY={"auto"}
          backgroundColor={"white"}
          border={"1px solid #ddd"}
          // borderRadius={"5px"}
        >
          <Table variant="striped" size={"sm"}>
            <Thead backgroundColor={"white"} position={"sticky"} top="0">
              <Tr>
                <Th sx={headCellStyle}>Sr. no</Th>
                <Th sx={headCellStyle}>Vendor Code</Th>
                <Th sx={headCellStyle}>Name</Th>
                <Th sx={headCellStyle}>Company Name</Th>
                <Th sx={headCellStyle}>Email</Th>
                <Th sx={headCellStyle}>Contact no.</Th>
                <Th sx={headCellStyle}>Location</Th>
                <Th sx={headCellStyle}>Cars</Th>
                <Th sx={headCellStyle}>Status</Th>
                <Th sx={headCellStyle}>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {loading ? (
                <TableLoader />
              ) : vendors?.length > 0 ? (
                vendors?.map((item, index) => {
                  return (
                    <Tr key={item._id}>
                      <Td sx={cellStyle}>{index + startingSerialNumber}</Td>
                      <Td sx={cellStyle}>{item?.vendor_code}</Td>
                      <Td sx={cellStyle}>{item?.vendor_name || "--"}</Td>
                      <Td sx={cellStyle}>{item.company_name }</Td>
                      <Td sx={cellStyle}>{item?.email || "--"}</Td>
                      <Td sx={cellStyle}>{item?.phone_number || "--"}</Td>
                      <Td sx={cellStyle}>
                        {item?.address.city},<br />
                        {item?.address.state}{" "}
                      </Td>

                      <Td sx={cellStyle}>
                        <Button
                          size={"xs"}
                          colorScheme="teal"
                          onClick={() => {
                            if (CarVMap[item._id] > 0) {
                              navigate("/admin/car?vendor=" + item._id);
                            }
                          }}
                        >
                          {CarVMap[item._id] || 0}
                        </Button>
                      </Td>
                      <Td sx={cellStyle}>
                        <Box display={"flex"} justifyContent={"center"}>
                          <Select
                            borderRadius={"5px"}
                            bg={
                              item.status === "active"
                                ? "green.500"
                                : item.status === "disabled"
                                ? "red.500"
                                : "orange.500"
                            }
                            w={"100%"}
                            color={"white"}
                            size={"xs"}
                            variant={"ghost"}
                            border={"1px solid"}
                            value={item.status}
                            onChange={(e) => {
                              if (e.target.value == "disabled") {
                                onOpen1();
                                seteditingID(item._id);
                              } else {
                                ChangeOrderStatusFunction(item._id, {
                                  status: e.target.value,
                                });
                              }
                            }}
                          >
                            <option value="pending" style={{ color: "orange" }}>
                              Pending
                            </option>
                            <option value="active" style={{ color: "green" }}>
                              Active
                            </option>
                            <option value="disabled" style={{ color: "red" }}>
                              Disabled
                            </option>
                          </Select>
                        </Box>
                      </Td>
                      <Td sx={cellStyle}>
                        <Flex gap={1} opacity={"0.9"}>
                          <Button
                            variant={"solid"}
                            colorScheme="green"
                            style={{ padding: "0px" }}
                            size={"xs"}
                            onClick={() =>
                              navigate(`/admin/vendor/edit/${item._id}`)
                            }
                          >
                            <FiEdit3 />
                          </Button>
                          <Button
                            colorScheme="red"
                            size={"xs"}
                            p={0}
                            onClick={() => {
                              seteditingID(item._id);
                              onOpen();
                            }}
                          >
                            <FiTrash2 />
                          </Button>
                          <Button
                            colorScheme="blue"
                            size={"xs"}
                            p={0}
                            onClick={() => {
                              setIsModalOpen(true);
                              handleViewCustomer(item?._id);
                            }}
                          >
                            <BsFillEyeFill />
                          </Button>
                          <VendorDetailsModal
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            vendor={singleVendor}
                          />
                        </Flex>
                      </Td>
                    </Tr>
                  );
                })
              ) : (
                <Tr>
                  <Td colSpan={"15"}>
                    {" "}
                    <center>No Vendors Found</center>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
        {
          <PaginationBox
            total={totalVendors || 0}
            page={page}
            setpage={setPage}
          />
        }
      </Container>
      {/**<!--*------- <Delete Popup> ----------->*/}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Vendor
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => {
                  DeleteOrderFunction(editingID);
                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      {/**<!--*------- <Disable Poput> ----------->*/}
      <AlertDialog
        isCentered
        isOpen={isOpen1}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Disable Vendor
            </AlertDialogHeader>

            <AlertDialogBody>
              You are temporarily disabling this Vendor
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose1}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  ChangeOrderStatusFunction(editingID, {
                    status: "disabled",
                  });
                  onClose1();
                }}
                ml={3}
              >
                Disable
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
const cellStyle = {
  // border: "1px solid #ddd",
  // padding: "8px",
  fontSize: "13px",
};
const headCellStyle = {
  // border: "1px solid #ddd",
  // padding: "8px",
  // textAlign: "center",
};
export default AdminVendor;
