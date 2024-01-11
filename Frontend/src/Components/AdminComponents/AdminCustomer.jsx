import {
  Container,
  HStack,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Flex,
  Spinner,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Select,
  Box,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { FiEdit3, FiPlusCircle, FiRefreshCcw, FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { BsFillTrash2Fill, BsFillEyeFill } from 'react-icons/bs';

import { DeleteCustomerByID, UpdateCustomerByID, getCustomerByID, getCustomers } from '../../Redux/App/Actions/Customer.action';
import UserDetailsModal from './Modals&Popups/UserDetailsModal';
import PaginationBox from '../Extra/Pagination';
import { Search2Icon } from '@chakra-ui/icons';
import TableLoader from '../Extra/TableLoader';

const AdminCustomer = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [userID, setUserID] = useState('');
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [AllCustomers, setAllCustomers] = useState();
  const [singleCustomer, setSingleCustomer] = useState();

  const [showDateSelect, setShowDateSelect] = useState(false);
  const [dateSelectValue, setDateSelectValue] = useState({
    startDate: '',
    endDate: ''
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('searchQuery') || '');

  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  let { User_detail, token } = useSelector(store => store?.UserAuthManager);
  const user = User_detail || JSON.parse(localStorage.getItem('user_detail_carvendor'));
  let admintoken = token || JSON.parse(localStorage.getItem('admin_token_carvendor'));

  let { totalCustomers, loading, error } = useSelector(store => store?.CustomerManager);

  const handleDelete = id => {
    dispatch(DeleteCustomerByID(id, toast, getData, admintoken));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleViewCustomer = id => {
    dispatch(getCustomerByID(id, setSingleCustomer, toast, navigate, admintoken));
  };

  const handleStatusChange = (id, value) => {
    const data = {
      status: value,
      updateType: 'statusUpdate'
    };
    dispatch(UpdateCustomerByID(id, data, toast, getData, 'Status Changed Successfully', admintoken));
  };

  const handleFilterBydays = e => {
    let params = {};
    for (let entries of searchParams.entries()) {
      params[entries[0]] = entries[1];
    }
    if (e.target.value == 'custom') {
      setShowDateSelect(true);
      setSearchParams({ ...params, filterByDays: e.target.value });
    } else {
      setShowDateSelect(false);
      setSearchParams({ ...params, filterByDays: e.target.value });
      setPage(1);
    }
  };

  const handleDateSelector = () => {
    if (dateSelectValue.startDate !== '' && dateSelectValue.endDate !== '') {
      const startDateObj = new Date(dateSelectValue?.startDate)?.toISOString();
      const endDateObj = new Date(dateSelectValue?.endDate)?.toISOString();
      if (endDateObj < startDateObj) {
        return toast({
          title: 'End Date cannot occur before Start Date',
          status: 'error',
          position: 'top',
          duration: 4000
        });
      } else {
        let params = {};
        for (let entries of searchParams.entries()) {
          params[entries[0]] = entries[1];
        }
        setSearchParams({
          ...params,
          filterByDays: 'custom',
          fromDate: startDateObj,
          toDate: endDateObj
        });
        setPage(1);
      }
    }
  };

  const getData = () => {
    let params = { page: page };

    let filterByDays = searchParams.get('filterByDays');
    let searchQuery = searchParams.get('searchQuery');

    if (filterByDays) params.filterByDays = filterByDays;
    if (searchQuery) params.searchQuery = searchQuery;
    if (params?.filterByDays === 'custom') {
      params['fromDate'] = searchParams.get('fromDate');
      params['toDate'] = searchParams.get('toDate');
    }

    dispatch(getCustomers(params, setAllCustomers, admintoken));
  };

  const handleSearchQuery = () => {
    let val = searchQuery;
    if (val.length < 3 || val.length < 0) {
      return toast({
        title: 'Search Query must contain atleast 3 charachters',
        status: 'warning',
        position: 'top',
        duration: 3000
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
    setSearchQuery('');
    setPage(1);
    setShowDateSelect(false);
    document.getElementById('selectFilterByDays').value = '';
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
    <Container maxW="container" borderRadius="5px" minH={'610px'} padding={'20px'} backgroundColor={'white'}>
      <Text mb="2" p={'10px'} fontWeight={'500'} fontSize={{ base: '1.3rem', md: '2rem' }}>
        Customers Management
      </Text>
      <HStack py={'10px'} justifyContent={'space-between'} alignContent={'center'}>
        <InputGroup w={'full'}>
          <Input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder={'Search by Customer Details'} />
          <InputRightElement>{searchQuery ? <FiX onClick={refreshAll} /> : <Search2Icon color="gray.300" />}</InputRightElement>
        </InputGroup>

        {searchQuery && (
          <Button bg="#30829c" color={'blue.500'} onClick={handleSearchQuery}>
            <Search2Icon />
          </Button>
        )}

        <Select backgroundColor={'white'} onChange={handleFilterBydays} id="selectFilterByDays">
          <option value={''}>Filter By Days</option>
          <option value={'today'}>today</option>
          <option value={'yesterday'}>yesterday</option>
          <option value={'7days'}>last 7 days</option>
          <option value={'thismonth'}>this month</option>
          <option value={'lastmonth'}>last month</option>
          <option value={'last3month'}>last 3 month</option>
          <option value={'thisyear'}>this year</option>
          <option value={'custom'}>Custom range</option>
        </Select>

        {showDateSelect && (
          <HStack p={1.5} borderRadius={'5px'}>
            <HStack>
              <p>From</p>
              <Input
                type={'date'}
                size="sm"
                onChange={e =>
                  setDateSelectValue({
                    ...dateSelectValue,
                    startDate: e.target.value
                  })
                }
              />
            </HStack>
            <HStack>
              <p>To</p>
              <Input
                type={'date'}
                size="sm"
                onChange={e =>
                  setDateSelectValue({
                    ...dateSelectValue,
                    endDate: e.target.value
                  })
                }
              />
            </HStack>
          </HStack>
        )}

        <Button bg="#30829c" color="white" variant={'solid'} w={'20%'} onClick={refreshAll}>
          Refresh
        </Button>
      </HStack>
      <Flex gap={2}>
        <Link to="/admin/add-user"></Link>
      </Flex>

      <TableContainer
        position={'relative'}
        my={'10px'}
        maxHeight={'700px'}
        overflowY={'auto'}
        backgroundColor={'white'}
        border={'1px solid #ddd'}
        // borderRadius={"5px"}
      >
        <Table size={'sm'} variant="striped">
          <Thead backgroundColor={'white'} position={'sticky'} top="0">
            <Tr>
              <Th sx={{ ...headCellStyle, textAlign: 'center' }}>Sr. no</Th>
              <Th sx={headCellStyle}>Customer Code </Th>
              <Th sx={headCellStyle}>User Name </Th>

              <Th sx={headCellStyle}>Contact</Th>

              <Th sx={{ headCellStyle, textAlign: 'center' }}>Status</Th>
              <Th sx={{ headCellStyle, textAlign: 'center' }}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <TableLoader />
            ) : AllCustomers?.length > 0 ? (
              AllCustomers?.map((item, index) => {
                return (
                  <Tr key={item.customer_code + 'ab'}>
                    <Td sx={{ ...cellStyle, textAlign: 'center' }}>{index + startingSerialNumber}</Td>

                    <Td sx={cellStyle}>{item?.customer_code}</Td>
                    <Td
                      style={{
                        ...cellStyle,
                        borderRight: '1px solid #ddd !important'
                      }}
                    >
                      <p>{item?.first_name + ' ' + item.last_name}</p>
                    </Td>

                    <Td sx={cellStyle}>
                      Email : {item?.email} <br />
                      {item?.phone_number && <>+91 {item?.phone_number}</>}
                    </Td>

                    <Td sx={cellStyle}>
                      <Box display={'flex'} justifyContent={'center'}>
                        <Select
                          borderRadius={'5px'}
                          bg={item.status === 'active' ? 'green.500' : item.status === 'disabled' ? 'red.500' : '#30829c'}
                          w={'60%'}
                          color={'white'}
                          size={'xs'}
                          variant={'ghost'}
                          border={'1px solid'}
                          value={item.status}
                          onChange={e => handleStatusChange(item._id, e.target.value)}
                        >
                          <option value="active" style={{ color: 'green' }}>
                            Active
                          </option>
                          <option value="disabled" style={{ color: 'red' }}>
                            Disabled
                          </option>
                        </Select>
                      </Box>
                    </Td>

                    <Td sx={{ cellStyle, textAlign: 'center' }}>
                      <Button
                        isDisabled={user?.role !== 'Admin'}
                        onClick={() => {
                          setIsModalOpen(true);
                          handleViewCustomer(item?._id);
                        }}
                        colorScheme="blue"
                        variant={'solid'}
                        size={'xs'}
                        p={0}
                        mx={1}
                      >
                        <BsFillEyeFill />
                      </Button>

                      <Button
                        isDisabled={user?.role !== 'Admin'}
                        onClick={() => {
                          setUserID(item?._id);
                          onOpen();
                        }}
                        colorScheme="red"
                        variant={'solid'}
                        size={'xs'}
                        p={0}
                        mx={1}
                      >
                        <BsFillTrash2Fill />
                      </Button>
                      <UserDetailsModal isOpen={isModalOpen} onClose={closeModal} user={singleCustomer} />
                      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                        <AlertDialogOverlay>
                          <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                              Delete Customer
                            </AlertDialogHeader>

                            <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

                            <AlertDialogFooter>
                              <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                              </Button>
                              <Button
                                colorScheme="red"
                                onClick={() => {
                                  onClose();
                                  handleDelete(userID);
                                }}
                                ml={3}
                              >
                                Delete
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialogOverlay>
                      </AlertDialog>
                    </Td>
                  </Tr>
                );
              })
            ) : (
              <Tr>
                <Td colSpan={'8'}>
                  <center>
                    <Text>No Customers Found</Text>
                  </center>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      {<PaginationBox total={totalCustomers / 10 || 0} page={page} setpage={setPage} />}
    </Container>
  );
};
const cellStyle = {
  padding: '7px',
  textAlign: 'left'
};
const headCellStyle = {
  padding: '7px',
  textAlign: 'left',
  color: 'black'
};

export default AdminCustomer;
