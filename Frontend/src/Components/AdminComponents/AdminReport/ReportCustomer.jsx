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
import { getCustomerReport } from '../../../Redux/App/Actions/Admin/Report.action';
import { getCustomers } from '../../../Redux/App/Actions/Customer.action';
import Papa from 'papaparse';
import { extractDateAndTime } from '../../../utils/DatesFunctions';

const ReportCustomer = () => {
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
  const dispatch = useDispatch();
  let { totalCustomers, customers, loading, error } = useSelector(store => store?.CustomerManager);
  const { loading: reportDataLoading, error: reportDataError } = useSelector(store => store?.ReportManager);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    dispatch(getCustomers({}, () => '', admintoken));

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
        Customer_ID: item?.customer_code,
        Email: item?.email,
        Name: item?.first_name + ' ' + item?.last_name,
        Address: item?.address,
        City: item?.city,
        State: item?.state,
        Pin: item?.pin,
        Phone_number: item?.phone_number,
        Status: item?.status,
        CreatedAt: extractDateAndTime(item.createdAt)?.date
      }));
      exportToCsv(
        fieldsToExport,
        `CustomerReport-${new Date(dateSelectValue?.startDate).toLocaleDateString()}-${new Date(dateSelectValue?.endDate).toLocaleDateString()}`
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
        dispatch(getCustomerReport(params, setData, admintoken));
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
  return (
    <Box padding={'20px'}>
      <Text mb="2" p={'10px'} fontWeight={'500'} fontSize={{ base: '1rem', md: '1.5rem' }}>
        Customer report
      </Text>
      <VStack
        maxW="container"
        // border="0.4px solid"

        borderRadius="5px"
        padding={'20px'}
        backgroundColor={'white'}
      >
        <Text w="full">Total Records Count : {totalCustomers || customers.length || 0}</Text>
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
          colorScheme="#30829c"
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
          colorScheme="#30829c"
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

                <Th>Customer ID</Th>
                <Th>Customer Name</Th>
                <Th>Customer Email</Th>
                <Th>Customer Phone</Th>
                <Th>Customer City</Th>
                <Th>Customer Address</Th>
                <Th>Customer Pin</Th>
                <Th>Customer Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>

                  <Td>{item?.customer_code || 'NA'}</Td>
                  <Td>{item?.first_name + ' ' + item?.last_name || 'NA'}</Td>
                  <Td>{item?.email || 'NA'}</Td>
                  <Td>{item?.phone_number || 'NA'}</Td>
                  <Td>{item?.city || 'NA'}</Td>
                  <Td>{item?.state || 'NA'}</Td>
                  <Td>{item?.pin || 'NA'}</Td>
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

export default ReportCustomer;
