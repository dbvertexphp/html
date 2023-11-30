import {
  Box,
  Button,
  Card,
  Heading,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Flex,
  Text,
  Th,
  Thead,
  Tr,
  Spinner,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBookingsByUserId } from "../../Redux/App/Actions/Booking.action";
import TableLoader from "../Extra/TableLoader";

export default function Orders() {
  let { Customer_detail, token } = useSelector(
    (store) => store?.CustomerAuthManager
  );
  const customer =
    Customer_detail ||
    JSON.parse(localStorage.getItem("customer_detail_carvendor"));
  let customertoken =
    token || JSON.parse(localStorage.getItem("customer_token_carvendor"));
  const { bookings, loading } = useSelector((state) => state.BookingManager);

  let dispatch = useDispatch();
  let navigate = useNavigate();

  const getData = () => {
    dispatch(getBookingsByUserId(customer?._id, customertoken));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Heading my="5" fontWeight={"500"} color="#30829c">
        Bookings
      </Heading>
      <Card p="5" border="1px solid #ddd">
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

                <Th sx={headCellStyle}>Vendor Details</Th>
                <Th sx={headCellStyle}>Payment Details</Th>
                <Th sx={headCellStyle}>Status</Th>
                {/* <Th sx={headCellStyle}>Actions</Th> */}
              </Tr>
            </Thead>
            <Tbody>
              {loading ? (
                <TableLoader />
              ) : (
                bookings?.length > 0 &&
                bookings?.map((item, index) => {
                  return (
                    <Tr key={item._id}>
                      <Td sx={cellStyle} style={{ textAlign: "center" }}>
                        {index + 1}
                      </Td>
                      <Td sx={{ ...cellStyle, textAlign: "center" }}>
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
                            borderRadius={"5px"}
                            bg={
                              item.status === "paid"
                                ? "green.500"
                                : item.status === "pending"
                                ? "orange.500"
                                : "blue.500"
                            }
                            color={"white"}
                            size={"xs"}
                            variant={"ghost"}
                            border={"1px solid"}
                            value={item?.status}
                          >
                            {item.status.toUpperCase()}
                          </Button>
                        </Box>
                      </Td>
                      {/* <Td sx={cellStyle}>
                        <Flex gap={1}>
                          <Button
                            colorScheme="blue"
                            size={"xs"}
                            leftIcon={<BsFillEyeFill />}
                          >
                            View
                          </Button>
                        </Flex>
                      </Td> */}
                    </Tr>
                  );
                })
              )}
            </Tbody>
          </Table>

          {!loading && Customer_detail && bookings?.length == 0 && (
            <Box textAlign={"center"}>
              <Image
                margin={"auto"}
                w={"40%"}
                src="https://img.freepik.com/free-vector/curiosity-brain-concept-illustration_114360-10736.jpg?w=740&t=st=1694594838~exp=1694595438~hmac=ac4b6600e5b81488c82030c2d811700634117c44015194ba3b5d1d75e9aade92"
              />
              <Box bg={"teal"} color={"white"}>
                <Text>No Bookings Found</Text>
              </Box>
            </Box>
          )}
        </TableContainer>
      </Card>
    </>
  );
}
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
