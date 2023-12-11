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
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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
import {
  DeleteEmployeeByID,
  UpdateEmployeeByID,
  getEmployeeByID,
  getEmployees,
} from "../../Redux/App/Actions/Employee.actions";

import { BsFillEyeFill } from "react-icons/bs";
import PaginationBox from "../Extra/Pagination";
import EmployeeDetailsModal from "./Modals&Popups/EmployeeDetailsModal";
import { Search2Icon } from "@chakra-ui/icons";
import TableLoader from "../Extra/TableLoader";

const AdminEmployees = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let { User_detail, token } = useSelector((store) => store?.UserAuthManager);
  const user =
    User_detail || JSON.parse(localStorage.getItem("user_detail_carvendor"));
  let admintoken =
    token || JSON.parse(localStorage.getItem("admin_token_carvendor"));
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  const cancelRef = React.useRef();
  const [editingID, seteditingID] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [singleEmployee, setSingleEmployee] = useState();
  const [showDateSelect, setShowDateSelect] = useState(false);
  const [dateSelectValue, setDateSelectValue] = useState({
    startDate: "",
    endDate: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("searchQuery") || ""
  );
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const { totalEmployees, employees, loading, error } = useSelector(
    (store) => store?.EmployeeManager
  );

  const ChangeOrderStatusFunction = (id, data) => {
    seteditingID(id);
    let title = `Set Employee Status to ${data.status.toUpperCase()}`;

    dispatch(UpdateEmployeeByID(id, data, toast, getData, title, admintoken));
  };
  const DeleteOrderFunction = (id) => {
    seteditingID(id);
    dispatch(DeleteEmployeeByID(id, toast, getData, admintoken));
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleViewCustomer = (id) => {
    dispatch(
      getEmployeeByID(id, setSingleEmployee, toast, navigate, admintoken)
    );
  };
  const handleStatusChange = (id, value) => {
    const data = {
      status: value,
    };
    dispatch(
      UpdateEmployeeByID(
        id,
        data,
        toast,
        getData,
        "Status Changed Successfully",
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

    dispatch(getEmployees(params, admintoken));
  };

  useEffect(() => {
    handleDateSelector();
  }, [dateSelectValue]);

  useEffect(() => {
    getData();
  }, [page, searchParams]);
  const refreshAll = (e) => {
    setSearchParams({});
    setSearchQuery("");
    setPage(1);
    setShowDateSelect(false);
    document.getElementById("selectFilterByDays").value = "";
    getData();
  };
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
          Employees Management
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
              placeholder={"Search by Employee Details"}
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
            <Button color={"#30829c"} onClick={handleSearchQuery}>
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
          <Link to={"/admin/employees/add-employees"}>
            <Button
               bg="#30829c"
               color="white"
              variant={"solid"}
              leftIcon={<FiPlusCircle />}
            >
              Add Employees
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
                <Th sx={headCellStyle}>Employees Code</Th>
                <Th sx={headCellStyle}>Name</Th>
                <Th sx={headCellStyle}>Email</Th>
                <Th sx={headCellStyle}>Contact no.</Th>
                <Th sx={headCellStyle}>Location</Th>
                <Th sx={headCellStyle}>Status</Th>
                <Th sx={headCellStyle}>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {loading ? (
                <TableLoader />
              ) : (
                employees?.length > 0 &&
                employees?.map((item, index) => {
                  return (
                    <Tr key={item._id}>
                      <Td sx={cellStyle} style={{ textAlign: "center" }}>
                        {index + startingSerialNumber}
                      </Td>
                      <Td sx={cellStyle}>{item?.employee_code}</Td>
                      <Td sx={cellStyle}>{item?.employee_name || "--"}</Td>
                      <Td sx={cellStyle}>{item?.email || "--"}</Td>
                      <Td sx={cellStyle}>{item?.phone_number || "--"}</Td>
                      <Td sx={cellStyle}>
                        {item?.address.city}, {item?.address.state}
                      </Td>

                      <Td sx={cellStyle}>
                        <Box
                          display={"flex"}
                          justifyContent={"center"}
                          ml={"-20px"}
                        >
                          <Select
                            borderRadius={"5px"}
                            bg={
                              item.status === "active"
                                ? "green.500"
                                : item.status === "disabled"
                                ? "red.500"
                                : "#30829c"
                            }
                            color={"white"}
                            size={"xs"}
                            variant={"ghost"}
                            border={"1px solid"}
                            value={item?.status}
                            onChange={(e) =>
                              handleStatusChange(item?._id, e.target.value)
                            }
                          >
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
                        <Flex gap={1}>
                          <Button
                            variant={"solid"}
                            colorScheme="green"
                            style={{ padding: "0px" }}
                            size={"xs"}
                            onClick={() =>
                              navigate(`/admin/employees/edit/${item._id}`)
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
                          <EmployeeDetailsModal
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            employee={singleEmployee}
                          />
                        </Flex>
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
            total={totalEmployees || 0}
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
              Delete Employee
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
              Disable Employee
            </AlertDialogHeader>

            <AlertDialogBody>
              You are Temporarily Disabling this Employee
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
const cellStyle = {};
const headCellStyle = {};
export default AdminEmployees;
