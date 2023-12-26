import {
  Card,
  Heading,
  Table,
  TableContainer,
  Text,
  Box,
  Button,
  Tbody,
  Td,
  Th,
  useToast,
  Thead,
  Tr,
  Spinner,
  useDisclosure
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DocumentModal from '../Extra/DocumentModal';
import { getTransactionsByUserID } from '../../Redux/App/Actions/Transaction.action';
import { extractDateAndTime } from '../../utils/DatesFunctions';
import IndianNumberSystem from '../../utils/IndianNumSystem';
import TableLoader from '../Extra/TableLoader';

export default function Transaction() {
  const toast = useToast();
  const navigate = useNavigate();
  let { Customer_detail, token } = useSelector(store => store?.CustomerAuthManager);
  const customer = Customer_detail || JSON.parse(localStorage.getItem('customer_detail_carvendor'));
  let customertoken = token || JSON.parse(localStorage.getItem('customer_token_carvendor'));
  const [selectedDocument, setSelectedDocument] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [transactions, settransactions] = useState([]);
  const { loading, error } = useSelector(store => store?.TestDriveManager);
  console.log(customer?._id);
  const getData = () => {
    dispatch(getTransactionsByUserID(customer?._id, settransactions, customertoken));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Heading my="5" fontWeight={'500'} color="#30829c">
        Transaction
      </Heading>
      <Card p="5" border="1px solid #ddd">
        <TableContainer position={'relative'} mx={{ md: '5' }} mt="0" backgroundColor={'white'} border={'1px solid #ddd'}>
          <Table size={'sm'} variant="striped">
            <Thead backgroundColor={'white'} position={'sticky'} top="0" zIndex={'3'}>
              <Tr>
                <Th sx={headCellStyle}>Sr. no</Th>
                <Th sx={headCellStyle}> Amount</Th>
                <Th sx={headCellStyle}>Transaction</Th>

                <Th sx={headCellStyle}>Car Details</Th>
                {/* <Th sx={headCellStyle}>Customer Details</Th> */}

                <Th sx={headCellStyle}>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {loading ? (
                <TableLoader />
              ) : transactions?.length > 0 ? (
                transactions?.map((item, index) => {
                  return (
                    <Tr key={item._id}>
                      <Td sx={cellStyle} style={{ textAlign: 'center' }}>
                        {index + 1}
                      </Td>
                      <Td
                        sx={{
                          ...cellStyle,
                          textAlign: 'center',
                          padding: '12px'
                        }}
                      >
                        <Text fontSize={'18px'} fontWeight={'800'}>
                          ₹ {IndianNumberSystem(item.amount_to_pay)}
                        </Text>
                      </Td>
                      <Td sx={cellStyle} style={{ textAlign: 'left' }}>
                        <div>
                          <b>ID : </b>
                          {item._id}
                        </div>
                        <div>
                          <b>Date :</b>
                          {extractDateAndTime(item.createdAt)?.date} <b>Time :</b>
                          {extractDateAndTime(item.createdAt)?.time}
                        </div>
                        <div>
                          <b>Reason : {item?.transaction_type}</b>
                        </div>
                      </Td>
                      <Td sx={{ ...cellStyle, paddingLeft: '8px' }}>
                        <div>
                          <b>Car Name : </b>
                          {item.car_id?.name?.name}
                        </div>
                        <div>
                          <b>Model : </b>
                          {item.car_id?.model?.name}
                        </div>
                        <div>
                          <b>Brand :</b> {item.car_id?.make?.name}
                        </div>
                      </Td>

                      <Td sx={{ ...cellStyle, textAlign: 'center' }}>
                        <Box display={'flex'} justifyContent={'center'} ml={'-20px'}>
                          <Button
                            borderRadius={'5px'}
                            bg={item.status === 'PAYMENT_SUCCESS' ? 'green.500' : item.status === 'PAYMENT_ERROR' ? 'red.500' : 'blue.500'}
                            color={'white'}
                            size={'xs'}
                            variant={'ghost'}
                            border={'1px solid'}
                            value={item?.status}
                          >
                            {item.status === 'PAYMENT_SUCCESS' ? 'SUCCESS' : item.status === 'PAYMENT_ERROR' ? 'FAILED' : 'PENDING'}
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
      </Card>
      <DocumentModal isOpen={isOpen} onClose={onClose} name={'DRIVING LICENSE DOCUMENT'} doc={selectedDocument} />
    </>
  );
}

const cellStyle = {
  padding: '8px 8px',
  fontSize: '13px',
  textAlign: 'left'
};
const headCellStyle = {
  padding: '8px 4px',
  textAlign: 'center',
  color: 'black'
};
