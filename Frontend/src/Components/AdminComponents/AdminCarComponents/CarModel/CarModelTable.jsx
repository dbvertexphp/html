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
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Spinner,
  Container
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { FiDelete, FiPlusCircle, FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteCarModelByID, getCarModels, postCarModel } from '../../../../Redux/App/Actions/Admin/CarComponents/CarModel.action';
import { getMakes } from '../../../../Redux/App/Actions/Admin/CarComponents/Make.action';
import PaginationBox from '../../../Extra/Pagination';
import TableLoader from '../../../Extra/TableLoader';

const initialData = {
  name: '',
  make_id: ''
};

const CarModelTable = () => {
  let { User_detail, token } = useSelector(store => store?.UserAuthManager);
  const user = User_detail || JSON.parse(localStorage.getItem('user_detail_carvendor'));
  let admintoken = token || JSON.parse(localStorage.getItem('admin_token_carvendor'));
  const [page, setPage] = useState(1);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState(initialData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { totalCarModels, loading, error, carModels, allMakes } = useSelector(state => state?.CarComponentManager);
  const getData = () => {
    dispatch(getCarModels(page));
    dispatch(getMakes(page));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (data && token) {
      dispatch(postCarModel(data, navigate, toast, getData, admintoken));
      onClose();
    }
  };

  const handleDelete = id => {
    dispatch(DeleteCarModelByID(id, toast, getData, admintoken));
  };

  useEffect(() => {
    getData();
  }, [page]);

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
        <Text mb="2" p={'10px'} fontWeight={'600'} fontSize="1.5rem">
          Car Models
        </Text>

        <Button bg="#30829c" color="white" variant={'solid'} onClick={onOpen} leftIcon={<FiPlusCircle />}>
          Add Car Model
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
              <Th sx={headCellStyle}>Car Model Name</Th>
              <Th sx={headCellStyle}>Brand Name</Th>
              <Th sx={headCellStyle}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <TableLoader />
            ) : (
              carModels.length > 0 &&
              carModels.map((item, index) => {
                return (
                  <Tr key={item?._id}>
                    <Td sx={cellStyleSet}>{index + startingSerialNumber}</Td>
                    <Td sx={cellStyleSet}>{item?.name}</Td>
                    <Td sx={cellStyleSet}>{item?.make_id?.name}</Td>
                    <Td sx={cellStyleSet}>
                      <HStack w={'100%'} justifyContent={'center'}>
                        <Button onClick={() => handleDelete(item._id)} variant={'solid'} colorScheme="red" p={0} size="sm">
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
      {<PaginationBox total={totalCarModels / 50 || 0} page={page} setpage={setPage} />}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter Car Model Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box padding={'10px'}>
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <FormLabel>Select Brand Name :</FormLabel>
                  <Select onChange={e => setData({ ...data, make_id: e.target.value })}>
                    <option value="">--select brand--</option>
                    {allMakes.length > 0 &&
                      allMakes.map(el => {
                        return (
                          <option value={el?._id} key={el?._id}>
                            {el?.name}
                          </option>
                        );
                      })}
                  </Select>
                </FormControl>
                <br />
                <FormControl>
                  <FormLabel>Enter Model Name :</FormLabel>
                  <Input
                    type={'text'}
                    onChange={e => setData({ ...data, name: e.target.value })}
                    onKeyPress={e => {
                      if (e.key === 'Enter') {
                        handleSubmit(e);
                      }
                    }}
                  />
                </FormControl>
                <Button type="submit" colorScheme="blue" mt={4}>
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

export default CarModelTable;
