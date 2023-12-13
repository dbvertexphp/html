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
    getCarByID,
    getAllTestdriveByEmployeeID,
  } from "../../Redux/App/Actions/Admin/Website/Website.action"; 
   import { BsFillEyeFill } from "react-icons/bs";
  import { getVendors } from "../../Redux/App/Actions/Vendor.action";
  import { getTestDrivesCarIds } from "../../Redux/App/Actions/TestDrive.action";
  import ViewSingleCarModal from "../Extra/ViewSingleCarModal";
  import PaginationBox from "../Extra/Pagination";
  import TableLoader from "../Extra/TableLoader";
  
  const EmployeeBooking = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();

    let { Employee_detail, token } = useSelector(
      (store) => store?.EmployeeAuthManager
    );

    const employee =
    Employee_detail ||
      JSON.parse(localStorage.getItem("employee_detail_carvendor"));
    let employeetoken =
      token || JSON.parse(localStorage.getItem("employee_token_carvendor"));
    
    const [refresh, setrefresh] = useState(false);
    const [sortby, setsortby] = useState("");
    const [page, setPage] = useState(1);

    const itemsPerPage = 5; //
  const startingSerialNumber = (page - 1) * itemsPerPage + 1;

  const { totalCars, loading, error } = useSelector(
    (state) => state?.VendorManager
  );
  const [testDrives, setCars] = useState([]);

  
  const {
    isOpen: isViewOpen,
    onOpen: onViewOpen,
    onClose: onViewClose,
  } = useDisclosure();
  const [ViewSingleCar, setViewSingleCar] = useState();

  const {
    isOpen: isDocOpen,
    onOpen: onDocOpen,
    onClose: onDocClose,
  } = useDisclosure();

  const getData = () => {
     
    let data = { sortby };
   
    dispatch(getAllTestdriveByEmployeeID(Employee_detail?._id, page, data, setCars, employeetoken));
   
 
};


useEffect(() => {
  getData();
}, [page, sortby]);


  
   
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
         Testdrive
        </Text>
      
        <TableContainer
          position={"relative"}
          my={"10px"}
          maxHeight={"700px"}
          overflowY={"auto"}
          backgroundColor={"white"}
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
            
                <Th sx={headCellStyle}>Car Details</Th>
                <Th sx={headCellStyle}>Customer Details</Th>
                <Th sx={headCellStyle}>Vendor Details</Th>
                <Th sx={headCellStyle}>Payment Details</Th>
                <Th sx={headCellStyle}>Status</Th>
                {/* <Th sx={headCellStyle}>Actions</Th> */}
              </Tr>
            </Thead>
            <Tbody>
              {loading ? (
                <TableLoader />
              ) : testDrives?.length > 0 ? (
                testDrives?.map((item, index) => {
                  console.log(item);
                  return (
                    <Tr key={item._id}>
                      <Td sx={cellStyle} style={{ textAlign: "center" }}>
                        {index + startingSerialNumber}
                      </Td>
                     
                      <Td sx={{ ...cellStyle, paddingLeft: "8px" }}>
                        <div>
                          Booking : <b> {item?.booking_code}</b>
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
                            {item?.name}
                          </b>
                        </div>
                        <div>{item?.email}</div>
                        <div>{item?.phone_number}</div>
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
                          <b>Total Amount : 500 </b>
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
                              item.status === "approved"
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
                    <center>No Test Drives Found</center>
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
       
      </Container>
    );
  };
  
  export default EmployeeBooking;
  
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
  