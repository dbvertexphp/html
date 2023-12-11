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
  import {getAllCarsByEmployeeID,} from "../../Redux/App/Actions/Admin/Website/Website.action";
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
  const [Cars, setCars] = useState([]);
  console.log( Cars);
  
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
   
    dispatch(getAllCarsByEmployeeID(Employee_detail?._id, page, data, setCars, employeetoken));
   
 
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
         Booking
        </Text>
        <HStack
          py={"10px"}
          justifyContent={"space-between"}
          alignContent={"center"}
        >
          
          <Spacer />
          <Text display={{ base: "none", md: "flex" }}>SORT BY:</Text>
         
  
          <Button
             bg="#30829c"
             color="white"
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
              ) : Cars && Cars?.length > 0 ? (
                
                Cars?.map((row, index) => {
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
                     
                      <Td sx={cellStyle} w={"180px"}>
                       
                      </Td>
                      <Td sx={cellStyle}>
                       
                        <Text>
                          <b>Price : ₹ {row?.price}</b>
                        </Text>
                      
                      </Td>
                      <Td sx={cellStyle}>
                        {/* <Box display={"flex"} flexDirection={"column"} w={"100%"}> */}
                        
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
                          
                        </Box>
  
                        
                      </Td>
                    </Tr>
                  );
                })
              ) : (
                <Tr>
                  <Td colSpan={"12"}>
                    <center>
                      <Text>No Cars Found dxfd</Text>
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
  