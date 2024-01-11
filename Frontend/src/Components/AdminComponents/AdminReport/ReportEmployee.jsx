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
import { getEmployeeReport } from '../../../Redux/App/Actions/Admin/Report.action';
import { getEmployees } from '../../../Redux/App/Actions/Employee.actions';
import Papa from 'papaparse';

const ReportEmployee = () => {
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
  // const [transactionType, setTransactionType] = useState("");
  // const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const { totalEmployees, employees, loading, error } = useSelector(store => store?.EmployeeManager);

  const { loading: reportDataLoading, error: reportDataError } = useSelector(store => store?.ReportManager);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    dispatch(getEmployees({}, admintoken));
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
        dispatch(getEmployeeReport(params, setData, admintoken));
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
        employee_code: item?.employee_code,
        employee_name: item?.employee_name,
        employee_phone_number: item?.phone_number,
        employee_email: item?.email,

        employee_address: item?.address?.address1 + ' ' + item?.address?.address1,
        employee_city: item?.address?.city,
        employee_state: item?.address?.state,
        employee_pincode: item?.address?.pincode,

        status: item?.status,
        createdAt: item?.createdAt
      }));
      exportToCsv(
        fieldsToExport,
        `EmployeeReport-${new Date(dateSelectValue?.startDate).toLocaleDateString()}-${new Date(dateSelectValue?.endDate).toLocaleDateString()}`
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
        Employee report
      </Text>
      <VStack
        maxW="container"
        // border="0.4px solid"
        borderRadius="5px"
        padding={'20px'}
        backgroundColor={'white'}
      >
        <Text w="full">Total Records Count : {totalEmployees || employees?.length || 0}</Text>
        {/* <Text w="full">Total Booking Transactions : {transactions?.filter(el => el.transaction_type == "Test Drive Booking")?.length || 0}</Text>
                <Text w="full">Total Test Drive Transactions : {transactions?.filter(el => el.transaction_type == "Booking Car 10% Pay")?.length || 0}</Text> */}
      </VStack>
      <br />
      <VStack borderRadius="5px" padding={'20px'} justifyContent={'flex-start'} backgroundColor={'white'}>
        <VStack w="full" mb={5}>
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
      </VStack>
      <HStack>
        <Button
          onClick={handleDateSelector}
          colorScheme="blue"
          variant="solid"
          sx={{ background: '#3182ce' }}
          isLoading={loading || reportDataLoading}
        >
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
          sx={{ background: '#3182ce' }}
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

                <Th>Employee ID</Th>
                <Th>Employee Name</Th>
                <Th>Employee Email</Th>
                <Th>Employee Phone</Th>
                <Th>Employee City</Th>
                <Th>Employee Address</Th>
                <Th>Employee State</Th>
                <Th>Employee Pin</Th>
                <Th>Employee Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>

                  <Td>{item?.employee_code || 'NA'}</Td>
                  <Td>{item?.employee_name || 'NA'}</Td>
                  <Td>{item?.email || 'NA'}</Td>
                  <Td>{item?.phone_number || 'NA'}</Td>
                  <Td>{item?.address?.city || 'NA'}</Td>
                  <Td>{item?.address?.address1 + ' ' + item?.address?.address1 || 'NA'}</Td>
                  <Td>{item?.address?.state || 'NA'}</Td>
                  <Td>{item?.address?.pincode || 'NA'}</Td>
                  <Td>{item?.status}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ReportEmployee;
