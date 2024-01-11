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
  Spinner,
  Container
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FiDelete, FiPlusCircle, FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteFeaturesByID, getFeaturess, postFeatures } from '../../../../Redux/App/Actions/Admin/CarComponents/Features.action';
import PaginationBox from '../../../Extra/Pagination';
import TableLoader from '../../../Extra/TableLoader';

const FeaturesTable = () => {
  let { User_detail, token } = useSelector(store => store?.UserAuthManager);
  const user = User_detail || JSON.parse(localStorage.getItem('user_detail_carvendor'));
  let admintoken = token || JSON.parse(localStorage.getItem('admin_token_carvendor'));
  const [page, setPage] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [features, setFeatures] = useState();
  const [onEdit, setOnEdit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { totalFeaturess, loading, error, featuress } = useSelector(state => state?.CarComponentManager);

  const getData = () => {
    dispatch(getFeaturess(page));
  };

  const handleSubmit = e => {
    e.preventDefault();
    let data = {
      name: features,
      label: features
    };
    if (features && token) {
      dispatch(postFeatures(data, navigate, toast, getData, admintoken));
      onClose();
    }
  };

  const handleDelete = id => {
    dispatch(DeleteFeaturesByID(id, toast, getData, admintoken));
  };

  useEffect(() => {
    getData();
  }, [page]);

  const itemsPerPage = 10; //
  const startingSerialNumber = (page - 1) * itemsPerPage + 1;

  return (
    <Container maxW="container" borderRadius="5px" minH={'610px'} padding={'20px'} backgroundColor={'white'}>
      <HStack py={'10px'} justifyContent={'space-between'} alignContent={'center'}>
        <Text mb="2" p={'10px'} fontWeight={'600'} fontSize="1.5rem">
          Car Features
        </Text>

        <Button bg="#30829c" color="white" variant={'solid'} onClick={onOpen} leftIcon={<FiPlusCircle />}>
          Add Features
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
              <Th sx={headCellStyle}>Features Name</Th>
              <Th sx={headCellStyle}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <TableLoader />
            ) : (
              featuress?.length > 0 &&
              featuress?.map((item, index) => {
                return (
                  <Tr key={item?._id}>
                    <Td sx={cellStyleSet}>{index + startingSerialNumber}</Td>
                    <Td sx={cellStyleSet}>{item?.name}</Td>
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
      {<PaginationBox total={totalFeaturess || 0} page={page} setpage={setPage} />}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter Car Features</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box padding={'10px'}>
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <FormLabel>Enter Car Features :</FormLabel>
                  <Input
                    type={'text'}
                    onChange={e => setFeatures(e.target.value)}
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

export default FeaturesTable;
