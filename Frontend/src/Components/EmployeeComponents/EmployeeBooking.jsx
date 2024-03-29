import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Container,
  Image,
  Spinner,
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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import PaginationBox from "../Extra/Pagination";
import { getBookingsByEmployeeId } from "../../Redux/App/Actions/Booking.action";
import TableLoader from "../Extra/TableLoader";
import { extractDateAndTime } from "../../utils/DatesFunctions";
const EmployeeBooking = () => {
  let { Employee_detail, token } = useSelector(
    (store) => store?.EmployeeAuthManager
  );
  const employee =
  Employee_detail ||
    JSON.parse(localStorage.getItem("employee_detail_carvendor"));
  let employeetoken =
    token || JSON.parse(localStorage.getItem("employee_token_carvendor"));

  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  const cancelRef = React.useRef();
  const [editingID, seteditingID] = useState("");
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
  const employeeDetails = JSON.parse(
    localStorage.getItem("employee_detail_carvendor")
  );
  const dispatch = useDispatch();

  const { totalbookings, bookings, loading, error } = useSelector(
    (store) => store?.BookingManager
  );

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
    let params = {
      filterByDays: searchParams.get("filterByDays"),
      page: page,
    };
    if (params?.filterByDays === "custom") {
      params["fromDate"] = searchParams.get("fromDate");
      params["toDate"] = searchParams.get("toDate");
    }

    dispatch(getBookingsByEmployeeId(employeeDetails?._id, params, employeetoken));
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
          Bookings
        </Text>

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
            <Thead
              backgroundColor={"white"}
              position={"sticky"}
              top="0"
              zIndex={"3"}
            >
              <Tr>
                <Th sx={headCellStyle}>Sr. no</Th>
                <Th sx={headCellStyle}></Th>
                <Th sx={headCellStyle}>Car Details</Th>
                <Th sx={headCellStyle}>Customer Details</Th>
                <Th sx={headCellStyle}>Vendor Details</Th>
                <Th sx={headCellStyle}>Payment Details</Th>
                <Th sx={headCellStyle}>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {loading ? (
                <TableLoader />
              ) : bookings?.length > 0 ? (
                bookings?.map((item, index) => {
                  return (
                    <Tr key={item._id}>
                      <Td sx={cellStyle} style={{ textAlign: "center" }}>
                        {index + startingSerialNumber}
                      </Td>
                      <Td sx={cellStyle}>
                        <Image
                          src={item.car_id?.primary_image}
                          w={{ base: "60px", md: "180px" }}
                          h={{ base: "40px", md: "100px" }}
                          objectFit={"cover"}
                          objectPosition={"center"}
                        />
                      </Td>
                      <Td sx={{ ...cellStyle, paddingLeft: "8px" }}>
                        <div>
                          Booking : <b> {item?.booking_code}</b>
                        </div>
                        <div>
                          Booking Date :
                          <b> {extractDateAndTime(item?.createdAt)?.date}</b>
                        </div>
                        <div>
                          Car Name :<b> {item.car_id?.name?.name}</b>
                        </div>
                        <div>
                          Model :<b> {item.car_id?.model?.name}</b>
                        </div>
                        <div>
                          Brand :<b> {item.car_id?.make?.name}</b>
                        </div>
                        <div>
                          Registered Year :<b>{item.car_id?.regYear}</b>{" "}
                        </div>
                        <div>
                          Ownership :<b> {item.car_id?.ownership}</b>
                        </div>
                      </Td>

                      <Td sx={cellStyle}>
                        <div>
                          <b>{item?.customer_id?.customer_code}</b>
                        </div>
                        <div>
                          <b>
                            {item?.customer_id?.first_name +
                              " " +
                              item?.customer_id?.last_name}
                          </b>
                        </div>
                        <div>{item?.customer_id?.email}</div>
                        <div>{item?.customer_id?.mobile_number}</div>
                      </Td>
                      <Td sx={cellStyle}>
                        <div>
                          <b>{item?.vendor_id?.vendor_code}</b>
                        </div>
                        <div>
                          <b>{item?.vendor_id?.vendor_name}</b>
                        </div>
                        <div>{item?.vendor_id?.email}</div>
                        <div>{item?.vendor_id?.mobile_number}</div>
                      </Td>

                      <Td sx={cellStyle}>
                        <div>
                          <b>Total Amount : {item?.total_amount}</b>
                        </div>
                        <div>
                          <b>
                            Booking Amount : {item?.test_drive_booking_amount}
                          </b>
                        </div>
                        <div>
                          <b>Advance Paid : {item?.advanced_amount}</b>
                        </div>
                        <div>
                          <b>Remaining Amount : {item?.remaining_amount}</b>
                        </div>
                      </Td>
                      <Td sx={cellStyle}>
                        <Box
                          display={"flex"}
                          justifyContent={"center"}
                          ml={"-20px"}
                        >
                          <Button
                            color={"white"}
                            size={"xs"}
                            variant={"ghost"}
                            border={"1px solid"}
                            bg={
                              item.status === "paid"
                                ? "green.500"
                                : item.status === "pending"
                                ? "orange.500"
                                : "blue.500"
                            }
                          >
                            {item.status.toUpperCase()}
                          </Button>
                        </Box>
                      </Td>
                    </Tr>
                  );
                })
              ) : (
                <Tr>
                  <Td colSpan={"15"}>
                    {" "}
                    <center>No Bookings Found</center>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
        {
          <PaginationBox
            total={totalbookings / 10 || 0}
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
              Delete booking
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
        isOpen={isOpen1}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Disable booking
            </AlertDialogHeader>

            <AlertDialogBody>
              You are Temporarily Disabling this booking
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose1}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
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
  padding: "3px 6px",
  fontSize: "12px",
};
const headCellStyle = {
  // border: "1px solid #ddd",
  // padding: "8px",
  // textAlign: "center",
  // whiteSpace: "pre",
  // wordWrap: "break-word",
};
export default EmployeeBooking;
