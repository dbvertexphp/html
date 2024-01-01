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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormLabel,
  FormControl,
  Input,
  useToast,
  Alert,
  Spinner,
  Container
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Form, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteBodyTypeByID, getBodyTypes, postBodyType } from '../../../../Redux/App/Actions/Admin/CarComponents/BodyType.action';

import { FiEdit, FiDelete, FiTrash2, FiPlusCircle } from 'react-icons/fi';
import PaginationBox from '../../../Extra/Pagination';
import TableLoader from '../../../Extra/TableLoader';

const BodyTypeTable = () => {
  let { User_detail, token } = useSelector(store => store?.UserAuthManager);
  const user = User_detail || JSON.parse(localStorage.getItem('user_detail_carvendor'));
  let admintoken = token || JSON.parse(localStorage.getItem('admin_token_carvendor'));
  const [page, setPage] = useState(1);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bodyType, setBodyType] = useState();
  const [onEdit, setOnEdit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { totalBodyTypes, loading, error, bodyTypes } = useSelector(state => state?.CarComponentManager);

  const getData = () => {
    dispatch(getBodyTypes(page, admintoken));
  };

  const handleSubmit = e => {
    e.preventDefault();
    let data = {
      name: bodyType
    };
    if (bodyType && token) {
      dispatch(postBodyType(data, navigate, toast, getData, admintoken));
      onClose();
    }
  };

  const handleDelete = id => {
    dispatch(DeleteBodyTypeByID(id, toast, getData, admintoken));
  };

  useEffect(() => {
    getData();
  }, [page]);

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

  const itemsPerPage = 10; //
  const startingSerialNumber = (page - 1) * itemsPerPage + 1;
  return (
    <Container maxW="container" borderRadius="5px" minH={'610px'} padding={'20px'} backgroundColor={'white'}>
      <HStack py={'10px'} justifyContent={'space-between'} alignContent={'center'}>
        <Text mb="2" p={'10px'} fontWeight={'700'} fontSize="1.5rem">
          Body Types
        </Text>

        <Button bg="#30829c" color="white" variant={'solid'} onClick={onOpen} leftIcon={<FiPlusCircle />}>
          Add Body Type
        </Button>
      </HStack>
      <TableContainer
        position={'relative'}
        my={'10px'}
        maxHeight={'700px'}
        overflowY={'auto'}
        backgroundColor={'white'}
        // borderRadius={"5px"}
      >
        <Table size={'sm'} variant="simple">
          <Thead backgroundColor={'white'} position={'sticky'} top="0" zIndex={3}>
            <Tr>
              <Th sx={headCellStyle}>Sr. no</Th>
              <Th sx={headCellStyle}>Body Model Name</Th>
              <Th sx={headCellStyle}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <TableLoader />
            ) : (
              bodyTypes.length > 0 &&
              bodyTypes.map((item, index) => {
                return (
                  <Tr key={item?._id}>
                    <Td sx={cellStyleSet}>{index + startingSerialNumber}</Td>
                    <Td sx={cellStyleSet}>{item?.name}</Td>
                    <Td sx={cellStyleSet}>
                      <HStack w={'100%'} justifyContent={'center'}>
                        <Button onClick={() => handleDelete(item?._id)} variant={'solid'} p={0} size="sm" colorScheme="red">
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
      {<PaginationBox total={totalBodyTypes || 0} page={page} setpage={setPage} />}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter Body Type Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box padding={'10px'}>
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <FormLabel>Enter Name :</FormLabel>
                  <Input
                    type={'text'}
                    onChange={e => setBodyType(e.target.value)}
                    onKeyPress={e => {
                      if (e.key === 'Enter') {
                        handleSubmit(e);
                      }
                    }}
                  />
                </FormControl>
                <Button type="submit" colorScheme="#30829c" mt={4}>
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

export default BodyTypeTable;
