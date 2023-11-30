import {
  Card,
  Heading,
  CardBody,
  Flex,
  Table,
  TableContainer,
  Text,
  Box,
  Button,
  Container,
  Select,
  Tbody,
  Td,
  Th,
  useToast,
  Thead,
  Tr,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getTestDrivesByCustomerID } from "../../Redux/App/Actions/TestDrive.action";
import { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/DatesFunctions";
import DocumentModal from "../Extra/DocumentModal";
import TableLoader from "../Extra/TableLoader";
import NoTableDataFound from "../Extra/NoTableDataFound";

export default function TestDrive() {
  const toast = useToast();
  const navigate = useNavigate();
  let { Customer_detail, token } = useSelector(
    (store) => store?.CustomerAuthManager
  );
  const customer =
    Customer_detail ||
    JSON.parse(localStorage.getItem("customer_detail_carvendor"));
  let customertoken =
    token || JSON.parse(localStorage.getItem("customer_token_carvendor"));
  const [selectedDocument, setSelectedDocument] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [testDrives, settestDrives] = useState([]);
  const { loading, error } = useSelector((store) => store?.TestDriveManager);
  const getData = () => {
    dispatch(
      getTestDrivesByCustomerID(
        Customer_detail._id,
        settestDrives,
        customertoken
      )
    );
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Heading my="5" fontWeight={"500"} color="#30829c">
        Test Drives
      </Heading>
      <Card p="5" border="1px solid #ddd">
        <TableContainer
          position={"relative"}
          mx={{ md: "5" }}
          mt="0"
          backgroundColor={"white"}
          border={"1px solid #ddd"}
          // borderRadius={"5px"}
        >
          <Table size={"sm"} variant="striped">
            <Thead
              backgroundColor={"white"}
              position={"sticky"}
              top="0"
              zIndex={"3"}
            >
              <Tr>
                <Th sx={headCellStyle}>Sr. no</Th>

                <Th sx={headCellStyle}>Car Name</Th>
                <Th sx={headCellStyle}>Prefered Date</Th>
                <Th sx={headCellStyle}>Prefered Time</Th>
                <Th sx={headCellStyle}>DL</Th>
                <Th sx={headCellStyle}>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {loading ? (
                <TableLoader />
              ) : testDrives?.length > 0 ? (
                testDrives?.map((item, index) => {
                  return (
                    <Tr key={index}>
                      <Td sx={cellStyle}>{index + 1}</Td>

                      <Td sx={cellStyle}>
                        <b>{item.car_id?.name?.name}</b> <br /> <b>Model : </b>
                        {item?.car_id?.model.name} <br />
                        <b>Brand : </b>
                        {item?.car_id?.make.name}
                      </Td>
                      <Td sx={cellStyle}>{formatDate(item.test_drive_date)}</Td>
                      <Td sx={cellStyle}>{item.test_drive_slot} </Td>
                      <Td sx={cellStyle}>
                        <Button
                          size={"xs"}
                          leftIcon={<FiEye />}
                          variant={"outline"}
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
                          <Button
                            size={"sm"}
                            variant={"solid"}
                            colorScheme={
                              item.status == "approved"
                                ? "green"
                                : item.status == "pending"
                                ? "orange"
                                : "red"
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
                <NoTableDataFound elem={"Test Drives"} />
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
      <DocumentModal
        isOpen={isOpen}
        onClose={onClose}
        name={"DRIVING LICENSE DOCUMENT"}
        doc={selectedDocument}
      />
    </>
  );
}

const cellStyle = {
  padding: "8px 8px",
  textAlign: "center",
};
const headCellStyle = {
  padding: "8px 4px",
  textAlign: "center",
  color: "black",
};
