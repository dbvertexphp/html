import {
  Box,
  Button,
  Container,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
  useToast,
  VStack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionReport } from '../../../Redux/App/Actions/Admin/Report.action';
import { getTransactions } from '../../../Redux/App/Actions/Transaction.action';
import Papa from 'papaparse';

const ReportTransaction = () => {
  let { User_detail, token } = useSelector(store => store?.UserAuthManager);
  const user = User_detail || JSON.parse(localStorage.getItem('user_detail_carvendor'));
  let admintoken = token || JSON.parse(localStorage.getItem('admin_token_carvendor'));
  const [dateSelectValue, setDateSelectValue] = useState({
    startDate: '',
    endDate: ''
  });
  const toast = useToast();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [tableshow, setTableShow] = useState(false);
  const [transactionType, setTransactionType] = useState('');
  const [status, setStatus] = useState('');
  const dispatch = useDispatch();
  const { totalTransactions, transactions, loading, error } = useSelector(store => store?.TransactionManager);
  const { loading: reportDataLoading, error: reportDataError } = useSelector(store => store?.ReportManager);

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    dispatch(getTransactions({}, admintoken));
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
        let params = {
          fromDate: dateSelectValue?.startDate,
          toDate: dateSelectValue?.endDate
        };
        if (transactionType) params.transactionType = transactionType;
        if (status) params.status = status;
        dispatch(getTransactionReport(params, setData, admintoken));
        setTableShow(true);
        setShow(true);
      }
    } else {
      return toast({
        title: 'Please select the range first.',
        status: 'warning',
        position: 'top',
        duration: 4000
      });
    }
  };
  const exportToCsv = (data, filename) => {
    const csv = Papa.unparse(data);
    const csvData = new Blob([csv], { type: 'text/csv' });
    const csvUrl = URL.createObjectURL(csvData);
    const hiddenElement = document.createElement('a');
    hiddenElement.href = csvUrl;
    hiddenElement.target = '_blank';
    hiddenElement.download = filename;
    hiddenElement.click();
  };

  const handleExport = () => {
    if (data?.length > 0) {
      const rowData = data;
      const fieldsToExport = rowData.map(item => ({
        Transaction_type: item?.transaction_type,
        Payement_status: item?.status,
        Amount_to_pay: item?.amount_to_pay,

        Customer_id: item?.customer_id?.customer_code,
        Customer_name: item?.customer_id?.first_name + ' ' + item?.customer_id?.last_name,
        Customer_email: item?.customer_id?.email,
        Customer_phone_number: item?.customer_id?.phone_number,
        Customer_city: item?.customer_id?.city,

        Test_Drive_name: item?.test_drive_id?.name || 'NA',
        Test_Drive_phone_number: item?.test_drive_id?.phone_number || 'NA',
        Test_Drive_address: item?.test_drive_id?.address || 'NA',
        Test_Drive_prefered_date: item?.test_drive_id?.test_drive_date || 'NA',
        Test_Drive_prefered_slot: item?.test_drive_id?.test_drive_slot || 'NA',
        Test_Drive_status: item?.test_drive_id?.status || 'NA',

        Car_ID: item?.car_id?.Car_id || 'NA',
        Car_Brand: item?.car_id?.cmake || 'NA',
        Car_Model: item?.car_id?.cmodel || 'NA',
        Car_Name: item?.car_id?.cname || 'NA',
        Car_Color: item?.car_id?.ccolor,

        Vendor_code: item?.car_id?.vendorID?.vendor_code,
        Vendor_name: item?.car_id?.vendorID?.vendor_name,
        Vendor_gst_number: item?.car_id?.vendorID?.gst_number,
        Vendor_pan_number: item?.car_id?.vendorID?.pan_number,
        Vendor_mobile_number: item?.car_id?.vendorID?.mobile_number,
        Vendor_phone_number: item?.car_id?.vendorID?.phone_number,
        Vendor_status: item?.car_id?.vendorID?.status
      }));
      exportToCsv(
        fieldsToExport,
        `TransactionReport-${new Date(dateSelectValue?.startDate).toLocaleDateString()}-${new Date(dateSelectValue?.endDate).toLocaleDateString()}`
      );
    } else {
      return toast({
        title: 'No data to Export',
        status: 'error',
        position: 'top',
        duration: 4000
      });
    }
  };
  return (
    <Box padding={'20px'}>
      <Text mb="2" p={'10px'} fontWeight={'500'} fontSize={{ base: '1rem', md: '1.5rem' }}>
        Transaction report
      </Text>
      <VStack
        maxW="container"
        // border="0.4px solid"

        borderRadius="5px"
        padding={'20px'}
        backgroundColor={'white'}
      >
        <Text w="full">Total Records Count : {totalTransactions || 0}</Text>
        <Text w="full">Total Test Drive Transactions : {transactions?.filter(el => el.transaction_type == 'Test Drive Booking')?.length || 0}</Text>
        <Text w="full">Total Booking Transactions : {transactions?.filter(el => el.transaction_type == 'Booking Car 10% Pay')?.length || 0}</Text>
      </VStack>
      <br />
      <VStack borderRadius="5px" padding={'20px'} justifyContent={'flex-start'} backgroundColor={'white'}>
        <VStack w="full" mb={5}>
          <FormLabel w="full">
            Select Date Range <span style={{ color: 'red' }}>*</span> :{' '}
          </FormLabel>
          <HStack w="full">
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
        </VStack>
        <VStack w="full" mb={5}>
          <FormLabel w="full">
            Select Transaction type <span style={{ color: 'red' }}>*</span> :{' '}
          </FormLabel>
          <HStack w="full">
            <Select w="50%" size={'sm'} value={transactionType} onChange={e => setTransactionType(e.target.value)}>
              <option value="">Select All</option>
              <option value="Booking Car 10% Pay">Booking Car Advance</option>
              <option value="Booking Car 90% Pay">Booking Car Full Payment </option>
              <option value="Test Drive Booking">Test Drive</option>
            </Select>
          </HStack>
        </VStack>
        <VStack w="full" mb={5}>
          <FormLabel w="full">Select Status : </FormLabel>
          <HStack w="full">
            <Select w="50%" size={'sm'} onChange={e => setStatus(e.target.value)}>
              <option value="">All Status</option>
              <option value="PAYMENT_SUCCESS">Success</option>
              <option value="PAYMENT_PENDING">Pending</option>
              <option value="PAYMENT_ERROR">Failed</option>
            </Select>
          </HStack>
        </VStack>
      </VStack>
      <HStack>
        <Button onClick={handleDateSelector} colorScheme="blue" variant="solid" isLoading={loading || reportDataLoading}>
          Fetch
        </Button>
        <Button
          onClick={() => {
            handleExport();
          }}
          colorScheme="blue"
          isDisabled={data?.length > 0 ? false : true}
          m={'20px'}
          ml={'0'}
          variant="solid"
        >
          Download
        </Button>
        {show && <Text colorScheme={'blue'}> {data?.length || 0} Records found.</Text>}
      </HStack>
      {tableshow && (
        <TableContainer>
          <Table size="md" variant="striped" colorScheme="blackAlpha">
            <Thead>
              <Tr>
                <Th>SR. No</Th>

                <Th>Transaction Type</Th>
                <Th>Payement Status</Th>
                <Th>Amount To Pay</Th>

                <Th>Customer ID</Th>
                <Th>Customer Name</Th>
                <Th>Customer Email</Th>
                <Th>Customer Phone</Th>
                <Th>Customer City</Th>

                <Th>Test Drive Name</Th>
                <Th>Test Drive Phone</Th>
                <Th>Test Drive Address</Th>
                <Th>Test Drive Prefered Date</Th>
                <Th>Test Drive Prefered Slot</Th>
                <Th>Test Drive Status</Th>

                <Th>Car ID</Th>
                <Th>Car Brand</Th>
                <Th>Car Model</Th>
                <Th>Car Name</Th>
                <Th>Car Color</Th>

                <Th>Vendor Id</Th>
                <Th>Vendor Name</Th>
                <Th>Vendor Company Name</Th>
                <Th>Vendor Gst Number</Th>
                <Th>Vendor Pen Number</Th>
                <Th>Vendor Mobile Number</Th>
                <Th>Vendor Phone Number</Th>
                <Th>Vendor Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>

                  <Td>{item?.transaction_type}</Td>
                  <Td>{item?.status}</Td>
                  <Td>{item?.amount_to_pay}</Td>

                  <Td>{item?.customer_id?.customer_code || 'NA'}</Td>
                  <Td>{item?.customer_id?.first_name + ' ' + item?.customer_id?.last_name || 'NA'}</Td>
                  <Td>{item?.customer_id?.email || 'NA'}</Td>
                  <Td>{item?.customer_id?.phone_number || 'NA'}</Td>
                  <Td>{item?.customer_id?.city || 'NA'}</Td>

                  <Td>{item?.test_drive_id?.name || 'NA'}</Td>
                  <Td>{item?.test_drive_id?.phone_number || 'NA'}</Td>
                  <Td>{item?.test_drive_id?.address || 'NA'}</Td>
                  <Td>{item?.test_drive_id?.test_drive_date || 'NA'}</Td>
                  <Td>{item?.test_drive_id?.test_drive_slot || 'NA'}</Td>
                  <Td>{item?.test_drive_id?.status || 'NA'}</Td>

                  <Td>{item?.car_id?.Car_id || 'NA'}</Td>
                  <Td>{item?.car_id?.cmake || 'NA'}</Td>
                  <Td>{item?.car_id?.cmodel || 'NA'}</Td>
                  <Td>{item?.car_id?.cname || 'NA'}</Td>
                  <Td>{item?.car_id?.ccolor || 'NA'}</Td>

                  <Td>{item?.car_id?.vendorID?.vendor_code}</Td>
                  <Td>{item?.car_id?.vendorID?.vendor_name}</Td>
                  <Td>{item?.car_id?.vendorID?.company_name}</Td>
                  <Td>{item?.car_id?.vendorID?.gst_number}</Td>
                  <Td>{item?.car_id?.vendorID?.pan_number}</Td>
                  <Td>{item?.car_id?.vendorID?.mobile_number}</Td>
                  <Td>{item?.car_id?.vendorID?.phone_number}</Td>
                  <Td>{item?.car_id?.vendorID?.status}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ReportTransaction;
