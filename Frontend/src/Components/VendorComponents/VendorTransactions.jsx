import { Box, Table, Button, TableContainer, Tbody, Td, Th, Thead, Tr, Text, useToast, Container } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { getTransactionsByVendorID } from '../../Redux/App/Actions/Transaction.action';
import { extractDateAndTime } from '../../utils/DatesFunctions';
import IndianNumberSystem from '../../utils/IndianNumSystem';
import TableLoader from '../Extra/TableLoader';

const VendorTransactions = () => {
  const navigate = useNavigate();
  const toast = useToast();
  let { Vendor_detail, token } = useSelector(store => store?.VendorAuthManager);
  const vendor = Vendor_detail || JSON.parse(localStorage.getItem('vendor_detail_carvendor'));
  let vendortoken = token || JSON.parse(localStorage.getItem('vendor_token_carvendor'));
  const [page, setPage] = useState(1);
  const [dateSelectValue, setDateSelectValue] = useState({
    startDate: '',
    endDate: ''
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const [days, setDays] = useState(searchParams.get('filterBydays') || '');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('searchQuery') || '');

  const dispatch = useDispatch();
  const [transactions, setTransactions] = useState([]);

  const { totalTransactions, loading, error } = useSelector(store => store?.TransactionManager);

  // const handleFilterBydays = (e) => {
  //   let params = {};
  //   for (let entries of searchParams.entries()) {
  //     params[entries[0]] = entries[1];
  //   }
  //   if (e.target.value == "custom") {
  //     setShowDateSelect(true);
  //     setSearchParams({...params, filterByDays: e.target.value });
  //   } else {
  //     setShowDateSelect(false);
  //     setSearchParams({...params, filterByDays: e.target.value });
  //     setPage(1);
  //   }
  // };

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
    // let params = {
    //   filterByDays: searchParams.get("filterByDays"),
    //   page: page,
    //   searchQuery: searchParams.get("searchQuery"),
    // };
    // if (params.filterByDays === "custom") {
    //   params["fromDate"] = searchParams.get("fromDate");
    //   params["toDate"] = searchParams.get("toDate");
    // }

    // dispatch(getTransactions(params,vendortoken));
    let id = vendor?._id;
    dispatch(getTransactionsByVendorID(id, setTransactions, vendortoken));
  };

  useEffect(() => {
    handleDateSelector();
  }, [dateSelectValue]);

  useEffect(() => {
    getData();
  }, [page, searchParams]);

  // const handleSearchQuery = () => {
  //   let val = searchQuery;
  //   if (val.length < 3 || val.length < 0) {
  //     return toast({
  //       title: "Search Query must contain atleast 3 charachters",
  //       status: "warning",
  //       position: "top",
  //       duration: 3000,
  //     });
  //   }

  //   let params = {};
  //   for (let entries of searchParams.entries()) {
  //     params[entries[0]] = entries[1];
  //   }

  //   setSearchParams({ ...params, searchQuery: val });
  // };

  const itemsPerPage = 50; //
  const startingSerialNumber = (page - 1) * itemsPerPage + 1;
  return (
    <>
      <Container maxW="container" borderRadius="5px" minH={'610px'} padding={'20px'} backgroundColor={'white'}>
        <Text mb="2" p={'10px'} fontWeight={'500'} fontSize={{ base: '1.3rem', md: '2rem' }}>
          Transactions
        </Text>
        {/* <HStack
              py={"10px"}
              justifyContent={"space-between"}
              alignContent={"center"}
            >
              <Select backgroundColor={"white"} onChange={handleFilterBydays}>
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

              <InputGroup w={"full"}>
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={"Search by Customer Details"}
                />
                <InputRightElement>
                  {searchQuery ? (
                    <FiX
                      onClick={() => {
                        setSearchQuery("");
                        delete searchParams.searchQuery;
                        getData();
                      }}
                    />
                  ) : (
                    <Search2Icon color="gray.300" />
                  )}
                </InputRightElement>
              </InputGroup>

              {searchQuery && (
                <Button color={"blue.500"} onClick={handleSearchQuery}>
                  <Search2Icon />
                </Button>
              )}

              <Button
                colorScheme="blue"
                variant={"solid"}
                onClick={() => {
                  setSearchParams({});
                  setSearchQuery("");
                  setDays("");
                }}
              >
                <FiRefreshCcw />
              </Button>
            </HStack> */}

        <TableContainer position={'relative'} mt="0" backgroundColor={'white'} border={'1px solid #ddd'}>
          <Table size={'sm'} variant="striped">
            <Thead backgroundColor={'white'} position={'sticky'} top="0" zIndex={'3'}>
              <Tr>
                <Th sx={headCellStyle}>Sr. no</Th>
                <Th sx={headCellStyle}>Transaction</Th>

                <Th sx={headCellStyle}>Car Details</Th>
                <Th sx={headCellStyle}>Customer Details</Th>
                <Th sx={headCellStyle}> Amount</Th>

                <Th sx={headCellStyle}>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {loading ? (
                <TableLoader />
              ) : transactions?.length > 0 ? (
                transactions?.map((item, index) => {
                  return (
                    <Tr key={item?._id}>
                      <Td sx={cellStyle} style={{ textAlign: 'center' }}>
                        {index + startingSerialNumber}
                      </Td>
                      <Td sx={cellStyle} style={{ textAlign: 'left' }}>
                        <div>
                          <b>ID : </b>
                          {item?._id}
                        </div>
                        <div>
                          <b>Date :</b>
                          {extractDateAndTime(item?.createdAt)?.date} <b>Time :</b>
                          {extractDateAndTime(item?.createdAt)?.time}
                        </div>
                        <div>
                          <b>Reason : {item?.transaction_type}</b>
                        </div>
                        <div>
                          <b>
                            Admin Pay :{' '}
                            {item?.status === 'PAYMENT_SUCCESS'
                              ? item?.vendor_pay_amount !== undefined
                                ? item.vendor_pay_amount !== null
                                  ? item.vendor_pay_amount
                                  : 'Not Commission Add'
                                : 0
                              : 0}
                          </b>
                        </div>
                      </Td>
                      <Td sx={{ ...cellStyle, paddingLeft: '8px' }}>
                        <div>
                          <b>Car Name : </b>
                          {item?.car_id?.name?.name}
                        </div>
                        <div>
                          <b>Model : </b>
                          {item?.car_id?.model?.name}
                        </div>
                        <div>
                          <b>Brand :</b> {item?.car_id?.make?.name}
                        </div>
                      </Td>
                      <Td sx={{ ...cellStyle, paddingLeft: '8px' }}>
                        <div>
                          <b>{item?.customer_id?.first_name + item?.customer_id?.last_name}</b>
                        </div>
                        <div>{item?.customer_id?.email}</div>
                        <div>{item?.customer_id?.city + ' , ' + item?.customer_id?.pin}</div>
                      </Td>

                      <Td
                        sx={{
                          ...cellStyle,
                          textAlign: 'center',
                          padding: '12px'
                        }}
                      >
                        <Text fontSize={'18px'} fontWeight={'800'}>
                          ₹ {IndianNumberSystem(item?.amount_to_pay)}
                        </Text>
                      </Td>
                      <Td sx={{ ...cellStyle, textAlign: 'center' }}>
                        <Box display={'flex'} justifyContent={'center'} ml={'-20px'}>
                          <Button
                            borderRadius={'5px'}
                            bg={item?.status === 'PAYMENT_SUCCESS' ? 'green.500' : item?.status === 'PAYMENT_ERROR' ? 'red.500' : 'blue.500'}
                            color={'white'}
                            size={'xs'}
                            variant={'ghost'}
                            border={'1px solid'}
                            value={item?.status}
                          >
                            {item?.status === 'PAYMENT_SUCCESS' ? 'SUCCESS' : item?.status === 'PAYMENT_ERROR' ? 'FAILED' : 'PENDING'}
                          </Button>
                        </Box>
                      </Td>
                    </Tr>
                  );
                })
              ) : (
                <Tr>
                  <Td colSpan={'10'}>
                    <center> No Transactions </center>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};
const cellStyle = {};
const headCellStyle = {};
export default VendorTransactions;
