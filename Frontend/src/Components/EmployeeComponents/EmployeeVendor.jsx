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
  Tag,
  Spacer,
  Spinner
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useEffect } from 'react';

import { FiEdit3, FiPlusCircle, FiRefreshCcw, FiTrash2, FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllVendorsByemployee } from '../../Redux/App/Actions/Admin/Website/Website.action';
import { DeleteVendorByID, UpdateVendorByID, getVendorByID, getVendors } from '../../Redux/App/Actions/Vendor.action';
import { BsFillEyeFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import PaginationBox from '../Extra/Pagination';
import VendorDetailsModal from '../AdminComponents/Modals&Popups/VendorDetailsModal';
import ViewSingleCarModal from '../Extra/ViewSingleCarModal';
import TableLoader from '../Extra/TableLoader';

const EmployeeVendor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  let { Employee_detail, token } = useSelector(store => store?.EmployeeAuthManager);
  const employee = Employee_detail || JSON.parse(localStorage.getItem('employee_detail_carvendor'));
  let employeetoken = token || JSON.parse(localStorage.getItem('employee_token_carvendor'));

  const [page, setPage] = useState(1);
  const [sortby, setsortby] = useState('');
  const [refresh, setrefresh] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [singleVendor, setSingleVendor] = useState();
  const [editingID, seteditingID] = useState('');

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleViewCustomer = id => {
    dispatch(getVendorByID(id, setSingleVendor, toast, navigate, employeetoken));
  };

  const itemsPerPage = 5; //
  const startingSerialNumber = (page - 1) * itemsPerPage + 1;

  const { totalVendors, loading, error } = useSelector(state => state?.VendorManager);

  const [EmployeeVendors, setEmployeeVendors] = useState([]);

  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();
  const cancelRef = React.useRef();

  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();
  const [ViewSingleCar, setViewSingleCar] = useState({});

  const { isOpen: isDocOpen, onOpen: onDocOpen, onClose: onDocClose } = useDisclosure();

  const getData = () => {
    let data = { sortby };

    dispatch(getAllVendorsByemployee(Employee_detail?._id, page, data, setEmployeeVendors, employeetoken));
  };

  useEffect(() => {
    getData();
  }, [page, sortby]);

  return (
    <Box background={'white'} p="5" borderRadius="5px">
      <Text mb="2" p={'10px'} fontWeight={'500'} fontSize={{ base: '1.3rem', md: '2rem' }}>
        Vendors Management
      </Text>
      <HStack py={'10px'} justifyContent={'space-between'} alignContent={'center'}></HStack>
      <TableContainer position={'relative'} my={'10px'} maxHeight={'700px'} overflowY={'auto'} backgroundColor={'white'}>
        <Table variant="striped" size={'sm'}>
          <Thead backgroundColor={'white'} position={'sticky'} top="0">
            <Tr>
              <Th sx={headCellStyle}>Sr. no</Th>
              <Th sx={headCellStyle}>Vendor Code</Th>
              <Th sx={headCellStyle}>Name</Th>
              <Th sx={headCellStyle}>Company Name</Th>
              <Th sx={headCellStyle}>Email</Th>
              <Th sx={headCellStyle}>Contact no.</Th>
              <Th sx={headCellStyle}>Location</Th>
              <Th sx={headCellStyle}>Cars</Th>
              <Th sx={headCellStyle}>Status</Th>
              <Th sx={headCellStyle}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <TableLoader />
            ) : EmployeeVendors?.length > 0 ? (
              EmployeeVendors?.map((item, index) => {
                return (
                  <Tr key={item._id}>
                    <Td sx={cellStyle}>{index + startingSerialNumber}</Td>
                    <Td sx={cellStyle}>{item?.vendor_code}</Td>
                    <Td sx={cellStyle}>{item?.vendor_name || '--'}</Td>
                    <Td sx={cellStyle}>{item.company_name}</Td>
                    <Td sx={cellStyle}>{item?.email || '--'}</Td>
                    <Td sx={cellStyle}>{item?.phone_number || '--'}</Td>
                    <Td sx={cellStyle}>
                      {item?.address.city},<br />
                      {item?.address.state}{' '}
                    </Td>
                    <Td sx={cellStyle}>
                      <Button
                        size={'xs'}
                        colorScheme="teal"
                        onClick={() => {
                          if (item?.carCount > 0) {
                            navigate('/admin/car?vendor=' + item._id);
                          }
                        }}
                      >
                        {item?.carCount || 0}
                      </Button>
                    </Td>
                    <Td sx={cellStyle}>
                      <Box display={'flex'} justifyContent={'center'}>
                        <Select
                          borderRadius={'5px'}
                          bg={item.status === 'active' ? 'green.500' : item.status === 'disabled' ? 'red.500' : 'orange.500'}
                          w={'100%'}
                          color={'white'}
                          size={'xs'}
                          variant={'ghost'}
                          border={'1px solid'}
                          value={item.status}
                          onChange={e => {
                            if (e.target.value == 'disabled') {
                              onOpen1();
                              seteditingID(item._id);
                            } else {
                              ChangeOrderStatusFunction(item._id, {
                                status: e.target.value
                              });
                            }
                          }}
                        >
                          <option value="pending" style={{ color: 'orange' }}>
                            Pending
                          </option>
                          <option value="active" style={{ color: 'green' }}>
                            Active
                          </option>
                          <option value="disabled" style={{ color: 'red' }}>
                            Disabled
                          </option>
                        </Select>
                      </Box>
                    </Td>
                    <Td sx={cellStyle}>
                      <Flex gap={1} opacity={'0.9'}>
                        <Button
                          variant={'solid'}
                          colorScheme="green"
                          style={{ padding: '0px' }}
                          size={'xs'}
                          onClick={() => navigate(`/employee/vendor/edit/${item._id}`)}
                        >
                          <FiEdit3 />
                        </Button>
                        <Button colorScheme="red" size={'xs'} p={0}>
                          <FiTrash2 />
                        </Button>
                        <Button
                          colorScheme="blue"
                          size={'xs'}
                          p={0}
                          onClick={() => {
                            setIsModalOpen(true);
                            handleViewCustomer(item?._id);
                          }}
                        >
                          <BsFillEyeFill />
                        </Button>
                        <VendorDetailsModal isOpen={isModalOpen} onClose={closeModal} vendor={singleVendor} />
                      </Flex>
                    </Td>
                  </Tr>
                );
              })
            ) : (
              <Tr>
                <Td colSpan={'15'}>
                  {' '}
                  <center>No Vendors Found</center>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
        {<PaginationBox total={totalVendors || 0} page={page} setpage={setPage} />}
      </TableContainer>

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
    </Box>
  );
};
const cellStyle = {
  padding: '3px',
  fontSize: '12px',
  fontWeight: '500'
};

const inputStyle = {
  border: 'none',
  margin: '0px',
  padding: '0px',
  textAlign: 'center'
};
const headCellStyle = {
  padding: '5px',
  whiteSpace: 'pre',
  wordWrap: 'break-word'
};

export default EmployeeVendor;
