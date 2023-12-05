import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiEye, FiRefreshCcw, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  UpdateTestDriveByID,
  getTestDrives,
  getTestDrivesByCarID,
} from "../../Redux/App/Actions/TestDrive.action";
import { formatDate } from "../../utils/DatesFunctions";
import DocumentModal from "../Extra/DocumentModal";
import PaginationBox from "../Extra/Pagination";
import AlertMessageModal from "../Extra/AlertMessageModal";
import { Search2Icon } from "@chakra-ui/icons";
import TableLoader from "../Extra/TableLoader";

const AdminTestdrive = () => {
  const navigate = useNavigate();

  let { User_detail, token } = useSelector((store) => store?.UserAuthManager);
  const user =
    User_detail || JSON.parse(localStorage.getItem("user_detail_carvendor"));
  let admintoken =
    token || JSON.parse(localStorage.getItem("admin_token_carvendor"));

  const [showDateSelect, setShowDateSelect] = useState(false);
  const [dateSelectValue, setDateSelectValue] = useState({
    startDate: "",
    endDate: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [days, setDays] = useState(searchParams.get("filterBydays") || "");
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("searchQuery") || ""
  );
  const [page, setPage] = useState(1);
  const toast = useToast();
  const dispatch = useDispatch();

  const locat = useLocation();
  const queryParams = new URLSearchParams(locat.search);
  const q = queryParams.get("car") || "";

  const [testDrives, settestDrives] = useState([]);
  const { totalTestDrives, loading, error } = useSelector(
    (store) => store?.TestDriveManager
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDocument, setSelectedDocument] = useState("");
  const [AlertMsg1, setAlertMsg1] = useState({
    open: false,
    text: "",
  });

  const handleStatusChange = (id, value) => {
    const data = {
      status: value,
    };
    dispatch(
      UpdateTestDriveByID(
        id,
        data,
        toast,
        getData,
        "Status Changed Successfully",
        setAlertMsg1,
        admintoken
      )
    );
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
    let params = {};
    for (let entries of searchParams.entries()) {
      params[entries[0]] = entries[1];
    }

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
    let params = {
      filterByDays: searchParams.get("filterByDays"),
      page: page,
    };
    if (params?.filterByDays === "custom") {
      params["fromDate"] = searchParams.get("fromDate");
      params["toDate"] = searchParams.get("toDate");
    }
    if (searchQuery) params.search = searchQuery;

    if (!q) {
      dispatch(getTestDrives(params, settestDrives, admintoken));
    } else {
      dispatch(getTestDrivesByCarID(q, settestDrives, admintoken));
    }
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

  const itemsPerPage = 5;
  const startingSerialNumber = (page - 1) * itemsPerPage + 1;
  return (
    <Container
      maxW="container"
      borderRadius="5px"
      minH={"610px"}
      padding={"20px"}
      backgroundColor={"white"}
    >
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Text
          mb="2"
          p={"10px"}
          fontWeight={"500"}
          fontSize={{ base: "1.3rem", md: "2rem" }}
        >
          Test Drives
        </Text>
      </Flex>

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
            placeholder={"Search by Customer Details"}
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
          w={"20%"}
          onClick={refreshAll}
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
        border={"1px solid #ddd"}
      >
        <Table size={"sm"} variant="striped">
          <Thead backgroundColor={"white"} position={"sticky"} top="0">
            <Tr>
              <Th sx={headCellStyle}>Sr. no</Th>
              <Th sx={headCellStyle}>Customer </Th>
              <Th sx={headCellStyle}>Vendor </Th>
              <Th sx={headCellStyle}>Employee </Th>
              <Th sx={headCellStyle}>Car Details</Th>
              <Th sx={headCellStyle}>Prefered Date & Time</Th>
              <Th sx={headCellStyle}>Address</Th>
              <Th sx={headCellStyle}>DL</Th>
              <Th sx={headCellStyle}>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <TableLoader />
            ) : testDrives.length > 0 ? (
              testDrives.map((item, index) => {
                return (
                  <Tr key={"asgt" + index}>
                    <Td sx={{ ...cellStyle, textAlign: "center" }}>
                      {index + startingSerialNumber}
                    </Td>
                    <Td sx={cellStyle}>
                      <Stack>
                        <Text fontWeight={"500"}>
                          {" "}
                          <b>{item?.name}</b>
                        </Text>
                        <Text>{item?.customer_id?.customer_code}</Text>
                        <Text>{item?.phone_number}</Text>
                      </Stack>
                    </Td>
                    <Td sx={cellStyle}>
                      {item?.vendor_id ? (
                        <Stack>
                          <Text fontWeight={"500"}>
                            <b>{item?.vendor_id?.vendor_name}</b>
                          </Text>
                          <Text>{item?.vendor_id?.vendor_code}</Text>
                          <Text>{item?.vendor_id?.phone_number}</Text>
                        </Stack>
                      ) : (
                        "NA"
                      )}
                    </Td>

                    <Td sx={cellStyle}>
                      {item?.vendor_id?.reference ? (
                        <Stack>
                          <Text fontWeight={"500"}>
                            <b>{item?.vendor_id?.reference?.employee_name}</b>
                          </Text>
                          <Text>
                            {item?.vendor_id?.reference?.employee_code}
                          </Text>
                          <Text>
                            {item?.vendor_id?.reference?.phone_number}
                          </Text>
                        </Stack>
                      ) : (
                        "NA"
                      )}
                    </Td>
                    <Td
                      sx={{
                        ...cellStyle,
                        maxWidth: "140px",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      <Stack>
                        <Text>
                          <b>{item?.car_id?.name?.name}</b>
                        </Text>
                        <Text>Brand: {item?.car_id?.make?.name}</Text>
                        <Text>Model: {item?.car_id?.model?.name}</Text>
                      </Stack>
                    </Td>
                    <Td sx={cellStyle}>
                      <Stack>
                        <Text>{formatDate(item.test_drive_date)}</Text>
                        <Text>{item.test_drive_slot} </Text>
                      </Stack>
                    </Td>
                    <Td
                      sx={{
                        ...cellStyle,
                        maxWidth: "140px",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {item?.address}
                    </Td>
                    <Td sx={cellStyle}>
                      <Button
                        size={"xs"}
                        rightIcon={<FiEye />}
                        variant={"solid"}
                        colorScheme="blue"
                        onClick={() => {
                          onOpen();
                          setSelectedDocument(item?.driving_license);
                        }}
                      >
                        VIEW
                      </Button>
                    </Td>
                    <Td sx={cellStyle}>
                      <Box display={"flex"} justifyContent={"center"}>
                        <Select
                          bg={
                            item.status === "pending"
                              ? "orange.300"
                              : item.status === "under review"
                              ? "purple.400"
                              : item.status === "approved"
                              ? "green.400"
                              : item.status === "rejected"
                              ? "red.400"
                              : item.status === "online"
                              ? "teal.400"
                              : "red.400" // Default case
                          }
                          color={"white"}
                          w={"100px"}
                          value={item.status}
                          size={"xs"}
                          onChange={(e) =>
                            handleStatusChange(item._id, e.target.value)
                          }
                        >
                          <option value="pending" style={{ color: "blue" }}>
                            Pending
                          </option>
                          <option value="approved" style={{ color: "green" }}>
                            Approved
                          </option>
                          <option value="rejected" style={{ color: "red" }}>
                            Rejected
                          </option>
                        </Select>
                      </Box>
                    </Td>
                  </Tr>
                );
              })
            ) : (
              <Tr>
                <Td colSpan={"12"}>
                  <center>No Testdrives Found</center>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      {!q && (
        <PaginationBox
          total={totalTestDrives || 0}
          page={page}
          setpage={setPage}
        />
      )}

      <DocumentModal
        isOpen={isOpen}
        onClose={onClose}
        name={"DRIVING LICENSE DOCUMENT"}
        doc={selectedDocument}
      />
      <AlertMessageModal
        text={AlertMsg1.text}
        openModal={AlertMsg1.open}
        setAlertMsg1={setAlertMsg1}
      />
    </Container>
  );
};

export default AdminTestdrive;

const cellStyle = {
  padding: "4px 8px",
  fontSize: "14px",
  textAlign: "left",
};
const headCellStyle = {
  padding: "8px 4px",
  textAlign: "center",
  color: "black",
};
