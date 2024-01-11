import {
  Box,
  Button,
  Container,
  FormLabel,
  HStack,
  Input,
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
import { getTestDriveReport } from '../../../Redux/App/Actions/Admin/Report.action';
import Papa from 'papaparse';
import { getTestDrives } from '../../../Redux/App/Actions/TestDrive.action';

const ReportTestDrive = () => {
  let { User_detail, token } = useSelector(store => store?.UserAuthManager);
  const user = User_detail || JSON.parse(localStorage.getItem('user_detail_carvendor'));
  let admintoken = token || JSON.parse(localStorage.getItem('admin_token_carvendor'));
  const [dateSelectValue, setDateSelectValue] = useState({
    startDate: '',
    endDate: ''
  });
  const toast = useToast();
  const [data, setData] = useState([]);
  const [tableshow, setTableShow] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { totalTestDrives, loading, error } = useSelector(store => store?.TestDriveManager);
  const { loading: reportDataLoading, error: reportDataError } = useSelector(store => store?.ReportManager);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    dispatch(getTestDrives({}, () => ''));
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
        dispatch(getTestDriveReport(params, setData, admintoken));
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
      const rawData = data;
      const fieldsToExport = rawData.map(item => ({
        Customer_ID: item?.customer_id?.customer_code || 'NA',
        Customer_name: item?.customer_id?.first_name + ' ' + item?.customer_id?.last_name || 'NA',
        Customer_email: item?.customer_id?.email || 'NA',
        Customer_phone_number: item?.customer_id?.phone_number || 'NA',
        Customer_city: item?.customer_id?.city || 'NA',

        Phone_Number: item?.phone_number || 'NA',
        Address: item?.address || 'NA',
        State: item?.address || 'NA',
        Prefered_Date: item?.test_drive_date || 'NA',
        Prefered_Slot: item?.test_drive_slot || 'NA',
        Test_Drive_status: item?.status || 'NA',

        Car_ID: item?.car_id?.Car_id || 'NA',
        Car_Brand: item?.car_id?.cmake || 'NA',
        Car_Model: item?.car_id?.cmodel || 'NA',
        Car_Name: item?.car_id?.cname || 'NA',
        Car_Color: item?.car_id?.ccolor,

        Vendor_code: item?.vendor_id?.vendor_code,
        Vendor_name: item?.vendor_id?.vendor_name,
        Company_name: item?.vendor_id?.company_name,
        Vendor_gst_number: item?.vendor_id?.gst_number,
        Vendor_pan_number: item?.vendor_id?.pan_number,
        Vendor_mobile_number: item?.vendor_id?.mobile_number,
        Vendor_phone_number: item?.vendor_id?.phone_number,
        Vendor_status: item?.vendor_id?.status
      }));
      exportToCsv(
        fieldsToExport,
        `TestDriveReport-${new Date(dateSelectValue?.startDate).toLocaleDateString()}-${new Date(dateSelectValue?.endDate).toLocaleDateString()}`
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
        Test Drives report
      </Text>
      <VStack
        maxW="container"
        // border="0.4px solid"
        borderRadius="5px"
        padding={'20px'}
        backgroundColor={'white'}
      >
        <Text w="full">Total Records Count : {totalTestDrives || 0}</Text>
      </VStack>
      <br />
      <VStack borderRadius="5px" padding={'20px'} justifyContent={'flex-start'} backgroundColor={'white'}>
        <FormLabel w="full">Select Date Range : </FormLabel>
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

                <Th>Customer ID</Th>
                <Th>Customer Name</Th>
                <Th>Customer Email</Th>
                <Th>Customer Phone</Th>
                <Th>Customer City</Th>

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

                  <Td>{item?.customer_id?.customer_code || 'NA'}</Td>
                  <Td>{item?.customer_id?.first_name + ' ' + item?.customer_id?.last_name || 'NA'}</Td>
                  <Td>{item?.customer_id?.email || 'NA'}</Td>
                  <Td>{item?.customer_id?.phone_number || 'NA'}</Td>
                  <Td>{item?.customer_id?.city || 'NA'}</Td>

                  <Td>{item?.car_id?.Car_id || 'NA'}</Td>
                  <Td>{item?.car_id?.cmake || 'NA'}</Td>
                  <Td>{item?.car_id?.cmodel || 'NA'}</Td>
                  <Td>{item?.car_id?.cname || 'NA'}</Td>
                  <Td>{item?.car_id?.ccolor || 'NA'}</Td>

                  <Td>{item?.vendor_id?.vendor_code}</Td>
                  <Td>{item?.vendor_id?.vendor_name}</Td>
                  <Td>{item?.vendor_id?.company_name}</Td>
                  <Td>{item?.vendor_id?.gst_number}</Td>
                  <Td>{item?.vendor_id?.pan_number}</Td>
                  <Td>{item?.vendor_id?.mobile_number}</Td>
                  <Td>{item?.vendor_id?.phone_number}</Td>
                  <Td>{item?.vendor_id?.status}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ReportTestDrive;
