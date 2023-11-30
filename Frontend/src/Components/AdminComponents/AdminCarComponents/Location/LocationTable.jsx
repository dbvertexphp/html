import {
  Box,
  Button,
  HStack,
  Select,
  Table,
  TableContainer,
  Tbody,
  Text,
  Tr,
  Td,
  Th,
  Thead,
  useDisclosure,
  useToast,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalOverlay,
  ModalFooter,
  Spinner,
  Container,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiDelete, FiPlusCircle, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  DeleteLocationByID,
  getLocations,
  postLocation,
} from "../../../../Redux/App/Actions/Admin/CarComponents/Location.action";
import PaginationBox from "../../../Extra/Pagination";
import TableLoader from "../../../Extra/TableLoader";

const LocationTable = () => {
  let { User_detail, token } = useSelector((store) => store?.UserAuthManager);
  const user =
    User_detail || JSON.parse(localStorage.getItem("user_detail_carvendor"));
  let admintoken =
    token || JSON.parse(localStorage.getItem("admin_token_carvendor"));
  const [page, setPage] = useState(1);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [location, setLocation] = useState();
  const [shortname, setShortname] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { totalLocations, loading, error, locations } = useSelector(
    (state) => state?.CarComponentManager
  );

  const getData = () => {
    dispatch(getLocations(page, admintoken));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      name: location,
      short_name: shortname,
      city: city,
      state: state,
    };
    if (location && token) {
      dispatch(postLocation(data, navigate, toast, getData, admintoken));
      onClose();
    }
  };

  const handleDelete = (id) => {
    dispatch(DeleteLocationByID(id, toast, getData, admintoken));
  };

  useEffect(() => {
    getData();
  }, [page]);

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
      <HStack
        py={"10px"}
        justifyContent={"space-between"}
        alignContent={"center"}
      >
        <Text mb="2" p={"10px"} fontWeight={"600"} fontSize="1.5rem">
          Locations
        </Text>

        <Button
          colorScheme="blue"
          variant={"solid"}
          onClick={onOpen}
          leftIcon={<FiPlusCircle />}
        >
          Add Location
        </Button>
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
              <Th sx={headCellStyle}>Name</Th>
              {/* <Th sx={headCellStyle}>Short Name</Th>
              <Th sx={headCellStyle}>City</Th>
              <Th sx={headCellStyle}>State</Th> */}
              <Th sx={headCellStyle}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <TableLoader />
            ) : (
              locations?.length > 0 &&
              locations?.map((item, index) => {
                return (
                  <Tr key={item?._id}>
                    <Td sx={cellStyleSet}>{index + startingSerialNumber}</Td>
                    <Td sx={cellStyleSet}>{item?.name}</Td>
                    {/* <Td sx={cellStyleSet}>{item.short_name}</Td>
                    <Td sx={cellStyleSet}>{item.city}</Td>
                    <Td sx={cellStyleSet}>{item.state}</Td> */}
                    <Td sx={cellStyleSet}>
                      <HStack w={"100%"} justifyContent={"center"}>
                        <Button
                          onClick={() => handleDelete(item?._id)}
                          variant={"solid"}
                          colorScheme="red"
                          p={0}
                          size="sm"
                        >
                          <FiTrash2 />
                        </Button>
                      </HStack>
                    </Td>
                  </Tr>
                );
              })
            )}
          </Tbody>
        </Table>
      </TableContainer>
      {
        <PaginationBox
          total={totalLocations || 0}
          page={page}
          setpage={setPage}
        />
      }
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter Details :</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box padding={"10px"}>
              <form>
                <FormControl>
                  <FormLabel>Location :</FormLabel>
                  <Input
                    type={"text"}
                    placeholder="Enter Location Name"
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </FormControl>
              </form>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};
const headCellStyle = {
  border: "1px solid #ddd",
  padding: "5px",
  textAlign: "center",
};
const cellStyleSet = {
  border: "1px solid #ddd",
  padding: "5px",
  textAlign: "center",
};
export default LocationTable;
