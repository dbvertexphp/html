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
  useDisclosure,
  useToast,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalOverlay,
  ModalFooter,
  Stack,
  Spinner,
  Container
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FiDelete, FiPlusCircle, FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteColorByID, getColors, postColor } from '../../../../Redux/App/Actions/Admin/CarComponents/Color.action';
import PaginationBox from '../../../Extra/Pagination';
import TableLoader from '../../../Extra/TableLoader';

const ColorTable = () => {
  let { User_detail, token } = useSelector(store => store?.UserAuthManager);
  const user = User_detail || JSON.parse(localStorage.getItem('user_detail_carvendor'));
  let admintoken = token || JSON.parse(localStorage.getItem('admin_token_carvendor'));
  const [page, setPage] = useState(1);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [color, setColor] = useState();
  const [colorCode, setColorCode] = useState();
  const [onEdit, setOnEdit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { totalColors, loading, error, colors } = useSelector(state => state?.CarComponentManager);

  const getData = () => {
    dispatch(getColors(page, admintoken));
  };

  const handleSubmit = e => {
    e.preventDefault();
    let data = {
      name: color,
      code: colorCode
    };
    if (color && token) {
      dispatch(postColor(data, navigate, toast, getData, admintoken));
      onClose();
    }
  };

  const handleDelete = id => {
    dispatch(DeleteColorByID(id, toast, getData, admintoken));
  };

  useEffect(() => {
    getData();
  }, [page]);

  const itemsPerPage = 10; //
  const startingSerialNumber = (page - 1) * itemsPerPage + 1;

  const cellStyle = {
    border: '1px solid #ddd',
    padding: '0px',
    textAlign: 'center'
  };

  const inputStyle = {
    border: 'none',
    margin: '0px',
    padding: '0px',
    textAlign: 'center'
  };
  const headCellStyle = {
    border: '1px solid #ddd',
    padding: '5px',
    textAlign: 'center'
  };
  const cellStyleSet = {
    border: '1px solid #ddd',
    padding: '5px',
    textAlign: 'center'
  };

  const headCellStyleSet = {
    border: '1px solid #ddd',
    padding: '5px',
    overflow: 'hidden',
    whiteSpace: 'pre',
    textAlign: 'center',
    wordWrap: 'break-word'
  };
  return (
    <Container maxW="container" borderRadius="5px" minH={'610px'} padding={'20px'} backgroundColor={'white'}>
      <HStack py={'10px'} justifyContent={'space-between'} alignContent={'center'}>
        <Text mb="2" p={'10px'} fontWeight={'600'} fontSize="1.5rem">
          Colors
        </Text>

        <Button bg="#30829c" color="white" variant={'solid'} onClick={onOpen} leftIcon={<FiPlusCircle />}>
          Add Color
        </Button>
      </HStack>
      <TableContainer position={'relative'} my={'10px'} maxHeight={'700px'} overflowY={'auto'} backgroundColor={'white'}>
        <Table size={'sm'} variant="simple">
          <Thead backgroundColor={'white'} position={'sticky'} top="0" zIndex={3}>
            <Tr>
              <Th sx={headCellStyle}>Sr. no</Th>
              <Th sx={headCellStyle}>Color Name</Th>
              <Th sx={headCellStyle}>Color Code</Th>
              <Th sx={headCellStyle}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <TableLoader />
            ) : (
              colors?.length > 0 &&
              colors?.map((item, index) => {
                return (
                  <Tr key={item?._id}>
                    <Td sx={cellStyleSet}>{index + startingSerialNumber}</Td>
                    <Td sx={cellStyleSet}>{item?.name}</Td>
                    <Td sx={cellStyleSet} backgroundColor={item?.code}></Td>
                    <Td sx={cellStyleSet}>
                      <HStack w={'100%'} justifyContent={'center'}>
                        <Button onClick={() => handleDelete(item?._id)} variant={'solid'} colorScheme="red" p={0} size="sm">
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
      {<PaginationBox total={totalColors || 0} page={page} setpage={setPage} />}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter Color Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box padding={'10px'}>
              <form onSubmit={handleSubmit}>
                <FormControl mb={'5'}>
                  <FormLabel>Name :</FormLabel>
                  <Input
                    type={'text'}
                    placeholder="Enter Colour Name"
                    onChange={e => setColor(e.target.value)}
                    onKeyPress={e => {
                      if (e.key === 'Enter') {
                        handleSubmit(e);
                      }
                    }}
                  />
                </FormControl>
                <FormControl mb={'5'}>
                  <FormLabel>Color Code :</FormLabel>
                  <Input
                    type={'color'}
                    onChange={e => setColorCode(e.target.value)}
                    onKeyPress={e => {
                      if (e.key === 'Enter') {
                        handleSubmit(e);
                      }
                    }}
                  />
                  <Text align={'end'}>{colorCode}</Text>
                </FormControl>
                <Button type="submit" colorScheme="blue" mr={3} mt={4}>
                  Add
                </Button>
              </form>
            </Box>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default ColorTable;
