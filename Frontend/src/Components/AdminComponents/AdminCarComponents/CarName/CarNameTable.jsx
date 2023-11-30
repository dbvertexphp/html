import React, { useEffect, useState } from "react";
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
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Spinner,
  Container,
} from "@chakra-ui/react";
import { FiDelete, FiPlusCircle, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMakes } from "../../../../Redux/App/Actions/Admin/CarComponents/Make.action";
import {
  DeleteCarNameByID,
  getCarName,
  postCarName,
} from "../../../../Redux/App/Actions/Admin/CarComponents/CarName.action";
import PaginationBox from "../../../Extra/Pagination";
import TableLoader from "../../../Extra/TableLoader";

const initialData = {
  name: "",
  make_id: "",
};

const CarNameTable = () => {
  let { User_detail, token } = useSelector((store) => store?.UserAuthManager);
  const user =
    User_detail || JSON.parse(localStorage.getItem("user_detail_carvendor"));
  let admintoken =
    token || JSON.parse(localStorage.getItem("admin_token_carvendor"));
  const [page, setPage] = useState(1);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState(initialData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { totalCarNames, loading, error, carNames, allCarModels, allMakes } =
    useSelector((state) => state?.CarComponentManager);
  const getData = () => {
    dispatch(getCarName(page));
    dispatch(getMakes(page));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data && token) {
      dispatch(postCarName(data, navigate, toast, getData, admintoken));
      onClose();
    }
  };

  const handleDelete = (id) => {
    dispatch(DeleteCarNameByID(id, toast, getData, admintoken));
  };

  useEffect(() => {
    getData();
  }, [page]);

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
          Car Names
        </Text>
        <Button
          colorScheme="blue"
          variant={"solid"}
          onClick={onOpen}
          leftIcon={<FiPlusCircle />}
        >
          Add Car Name
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
        <Table size={"sm"} variant="simple">
          <Thead
            backgroundColor={"white"}
            position={"sticky"}
            top="0"
            zIndex={3}
          >
            <Tr>
              <Th sx={headCellStyle}>Sr. no</Th>
              <Th sx={headCellStyle}>Car Name</Th>
              <Th sx={headCellStyle}>Brand Name</Th>
              <Th sx={headCellStyle}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <TableLoader />
            ) : (
              carNames?.length > 0 &&
              carNames?.map((item, index) => {
                return (
                  <Tr key={item?._id}>
                    <Td sx={cellStyleSet}>{index + startingSerialNumber}</Td>
                    <Td sx={cellStyleSet}>{item?.name}</Td>
                    <Td sx={cellStyleSet}>{item?.make_id?.name}</Td>
                    <Td sx={cellStyleSet}>
                      <HStack w={"100%"} justifyContent={"center"}>
                        <Button
                          onClick={() => handleDelete(item._id)}
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
          total={totalCarNames || 0}
          page={page}
          setpage={setPage}
        />
      }
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter Car Name Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box padding={"10px"}>
              <form>
                <FormControl>
                  <FormLabel>Select Brand Name :</FormLabel>
                  <Select
                    onChange={(e) =>
                      setData({ ...data, make_id: e.target.value })
                    }
                  >
                    <option value="">--select brand--</option>
                    {allMakes?.length > 0 &&
                      allMakes?.map((el) => {
                        return (
                          <option key={el._id} value={el._id}>
                            {el?.name}
                          </option>
                        );
                      })}
                  </Select>
                </FormControl>
                <br />
                <FormControl>
                  <FormLabel>Enter Car Name :</FormLabel>
                  <Input
                    type={"text"}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
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

export default CarNameTable;
