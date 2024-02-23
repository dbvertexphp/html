import React, { useEffect, useState } from 'react';
import {
  Container,
  FormLabel,
  Input,
  Button,
  Grid,
  GridItem,
  Text,
  FormControl,
  FormErrorMessage,
  Divider,
  useToast,
  Box,
  Flex,
  MenuDivider,
  AbsoluteCenter,
  Select,
  useDisclosure,
  Image,
  Skeleton,
  SkeletonText
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { UpdateVendorByID, getVendorByID } from '../../../Redux/App/Actions/Vendor.action';
import InputUploadMultiple from '../../Extra/InputMultipleUpload';
import { Document, Page } from 'react-pdf';
import { getEmployees } from '../../../Redux/App/Actions/Employee.actions';
import InputUpload from '../../Extra/InputUpload';
import DocumentModal from '../../Extra/DocumentModal';

const initial = {
  vendor_name: '',
  company_name: '',
  password: '',
  gst_number: '',
  pan_number: '',
  msme_number: '',
  mobile_number: '',
  profile_photo: '',
  phone_number: '',
  commission_type: '',
  commission_amount: '',
  reference: '',
  address: {
    address1: '',
    address2: '',
    state: '',
    landmark: '',
    district: '',
    city: '',
    pincode: ''
  }
};

const EditVendor = () => {
  let { Employee_detail, token } = useSelector(store => store?.EmployeeAuthManager);
  const employee = Employee_detail || JSON.parse(localStorage.getItem('employee_detail_carvendor'));
  let employeetoken = token || JSON.parse(localStorage.getItem('employee_token_carvendor'));

  const [formData, setFormData] = useState(initial);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const params = useParams();
  const { employees } = useSelector(state => state.EmployeeManager);

  const { loading, error } = useSelector(store => store?.VendorManager);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const HandleDetailsChange = event => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };
  const HandleDetailsAddressChange = event => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      address: {
        ...prevFormData.address,
        [name]: value
      }
    }));
  };

  const SaveVendorDetails = async () => {
    let title = 'Updated Vendor Successfully';
    formData.status = 'active';
    formData.reference = formData?.reference?._id || '64c75ccdbf4f6e0c71d625e8';
    dispatch(UpdateVendorByID(params.id, formData, toast, navigate, '/employee/vendor', getData, title, employeetoken));
  };

  const getData = id => {
    dispatch(getVendorByID(id, setFormData, toast, navigate, employeetoken));
  };

  const getDataofEmployees = () => {
    dispatch(getEmployees({}, employeetoken));
  };

  useEffect(() => {
    let id = params.id;
    if (!id) return navigate('/employee/vendor');

    getData(id);
    getDataofEmployees();
  }, []);
  return (
    <Box padding={'20px'}>
      <Container as="form" maxW="container" borderRadius="5px" mb="10" padding={'20px'} backgroundColor={'white'}>
        {loading ? (
          <>
            <Skeleton h={'300px'} />
            <SkeletonText mt="10" noOfLines={'20'} />
          </>
        ) : (
          <Grid templateColumns="repeat(12, 1fr)">
            <GridItem as="div" colSpan={{ base: 6, md: 12 }} p="10px">
              <Text mb="2" fontWeight={'500'} fontSize="1.5rem">
                Edit Details of Vendor:
              </Text>
            </GridItem>

            <GridItem as="div" colSpan={{ base: 12, md: 12 }} p="25px 10px 10px 10px">
              <Box position="relative">
                <Text fontSize={'1.3rem'} fontWeight={'600'} bg="white">
                  Personal Details
                </Text>
                <Divider mt={'2'} border={'1px solid red'} opacity={'0.2'} />
              </Box>
            </GridItem>

            <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
              <FormLabel>Vendor Name</FormLabel>
              <Input
                placeholder="Change Vendor Name"
                type="text"
                name="vendor_name"
                value={formData?.vendor_name || ''}
                onChange={HandleDetailsChange}
              />
            </GridItem>

            <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
              <FormLabel>Email</FormLabel>
              <Input placeholder="Change Email" type="email" name="email" value={formData?.email || ''} onChange={HandleDetailsChange} />
            </GridItem>
            <GridItem as="div" colSpan={{ base: 12, md: 4 }} rowSpan={'2'} p="10px">
              <FormLabel>Profile Photo</FormLabel>
              <center>
                {formData.profile_photo && (
                  <Image
                    borderRadius={'50%'}
                    my={2}
                    h={'120px'}
                    objectPosition={'center'}
                    objectFit={'contain'}
                    w={'120px'}
                    src={formData.profile_photo || ''}
                  />
                )}
                <InputUpload
                  accept={'image/*'}
                  HandleUploadSomeImages={file =>
                    setFormData({
                      ...formData,
                      profile_photo: file
                    })
                  }
                />
              </center>
            </GridItem>
            {/* <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
              <FormLabel>Password</FormLabel>
              <Input
                placeholder=" Password"
                type="text"
                isDisabled={true}
                name="password"
                value={formData?.password || ""}
                onChange={HandleDetailsChange}
              />
            </GridItem> */}
            <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
              <FormLabel>Company Name</FormLabel>
              <Input
                placeholder="Change Company Name"
                type="text"
                name="company_name"
                value={formData?.company_name || ''}
                onChange={HandleDetailsChange}
              />
            </GridItem>
            <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
              <FormControl isInvalid={formData?.phone_number?.length !== 10 && formData?.phone_number?.length > 0}>
                <FormLabel>Phone number</FormLabel>
                <Input
                  placeholder="Change Phone No."
                  type="number"
                  name="phone_number"
                  value={formData?.phone_number || ''}
                  onChange={HandleDetailsChange}
                />
                {formData?.phone_number?.length !== 10 && formData?.phone_number?.length > 0 && (
                  <FormErrorMessage>Enter 10 digit phone number</FormErrorMessage>
                )}
              </FormControl>
            </GridItem>

            <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
              <FormControl isInvalid={formData?.mobile_number?.length !== 10 && formData?.mobile_number?.length > 0}>
                <FormLabel>Mobile number</FormLabel>
                <Input
                  placeholder="Change Mobile Number"
                  type="number"
                  name="mobile_number"
                  value={formData?.mobile_number || ''}
                  onChange={HandleDetailsChange}
                />
                {formData?.mobile_number?.length !== 10 && formData?.mobile_number?.length > 0 && (
                  <FormErrorMessage>Enter 10 digit phone number</FormErrorMessage>
                )}
              </FormControl>
            </GridItem>
            <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
              <FormLabel>Reference Employee (optional)</FormLabel>
              <Select
                name="reference"
                onChange={e => {
                  let value = e.target.value;
                  let emp = employees?.find(el => el._id === value);
                  setFormData(prev => ({ ...prev, reference: emp }));
                }}
                value={formData?.reference?._id || ''}
              >
                <option value="64c75ccdbf4f6e0c71d625e8">Select Name</option>
                <option value="64c75ccdbf4f6e0c71d625e8">No One</option>
                {employees &&
                  employees.map(
                    el =>
                      (el.status === 'active' || el.status === 'inactive') && (
                        <option key={el._id} value={el?._id}>
                          {el?.employee_name}
                        </option>
                      )
                  )}
              </Select>
            </GridItem>

            <GridItem as="div" colSpan={{ base: 12, md: 12 }} p="25px 10px 10px 10px">
              <Box position="relative">
                <Text fontSize={'1.3rem'} fontWeight={'600'} bg="white">
                  Address Details
                </Text>
                <Divider mt={'2'} border={'1px solid red'} opacity={'0.2'} />
              </Box>
            </GridItem>

            <GridItem as="div" colSpan={{ base: 12, md: 5 }} p="10px">
              <FormLabel>Address Line 1</FormLabel>
              <Input
                placeholder="Change Address Line 1"
                type="text"
                name="address1"
                value={formData?.address?.address1 || ''}
                onChange={HandleDetailsAddressChange}
              />
            </GridItem>

            <GridItem as="div" colSpan={{ base: 12, md: 5 }} p="10px">
              <FormLabel>Address Line 2</FormLabel>
              <Input
                placeholder="Change Address Line 2"
                type="text"
                name="address2"
                value={formData?.address?.address2 || ''}
                onChange={HandleDetailsAddressChange}
              />
            </GridItem>
            <GridItem as="div" colSpan={{ base: 6, md: 2 }} p="10px">
              <FormLabel>Pincode</FormLabel>
              <Input
                placeholder="Change Pincode"
                type="number"
                name="pincode"
                value={formData?.address?.pincode || ''}
                onChange={HandleDetailsAddressChange}
              />
            </GridItem>
            <GridItem as="div" colSpan={{ base: 6, md: 3 }} p="10px">
              <FormLabel>City</FormLabel>
              <Input placeholder="Change City" type="text" name="city" value={formData?.address?.city || ''} onChange={HandleDetailsAddressChange} />
            </GridItem>

            <GridItem as="div" colSpan={{ base: 6, md: 3 }} p="10px">
              <FormLabel>State</FormLabel>
              <Input
                placeholder="Change State"
                type="text"
                name="state"
                value={formData?.address?.state || ''}
                onChange={HandleDetailsAddressChange}
              />
            </GridItem>

            <GridItem as="div" colSpan={{ base: 6, md: 3 }} p="10px">
              <FormLabel>Landmark</FormLabel>
              <Input
                placeholder="Change Landmark"
                type="text"
                name="landmark"
                value={formData?.address?.landmark || ''}
                onChange={HandleDetailsAddressChange}
              />
            </GridItem>
            <GridItem as="div" colSpan={{ base: 6, md: 3 }} p="10px">
              <FormLabel>District</FormLabel>
              <Input
                placeholder="Change District"
                type="text"
                name="district"
                value={formData?.address?.district || ''}
                onChange={HandleDetailsAddressChange}
              />
            </GridItem>

            <GridItem as="div" colSpan={{ base: 12, md: 12 }} p="25px 10px 10px 10px">
              <Box position="relative">
                <Text fontSize={'1.3rem'} fontWeight={'600'} bg="white">
                  Other Details
                </Text>
                <Divider mt={'2'} border={'1px solid red'} opacity={'0.2'} />
              </Box>
            </GridItem>

            <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
              <FormControl>
                <FormLabel>MSME number</FormLabel>
                <Input
                  placeholder="Change MSME Number"
                  type="text"
                  name="msme_number"
                  value={formData?.msme_number || ''}
                  onChange={HandleDetailsChange}
                />
              </FormControl>
            </GridItem>
            <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
              <FormControl isInvalid={formData?.gst_number?.length !== 15 && formData?.gst_number?.length > 0}>
                <FormLabel>GST number</FormLabel>
                <Input
                  placeholder="Change GST Number"
                  type="text"
                  name="gst_number"
                  value={formData?.gst_number || ''}
                  onChange={HandleDetailsChange}
                />
                {formData?.gst_number?.length !== 15 && formData?.gst_number?.length > 0 && (
                  <FormErrorMessage>Enter 15 digit GST number</FormErrorMessage>
                )}
              </FormControl>
            </GridItem>

            <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
              <FormControl isInvalid={formData?.pan_number?.length !== 10 && formData?.pan_number?.length > 0}>
                <FormLabel>PAN number</FormLabel>
                <Input
                  placeholder="Change PAN Number"
                  type="text"
                  name="pan_number"
                  value={formData?.pan_number || ''}
                  onChange={HandleDetailsChange}
                />
                {formData?.pan_number?.length !== 10 && formData?.pan_number?.length > 0 && (
                  <FormErrorMessage>Enter 10 digit GST number</FormErrorMessage>
                )}
              </FormControl>
            </GridItem>

            <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
              <FormControl>
                <FormLabel>MSME Document</FormLabel>
                <InputUploadMultiple
                  acceptData="application/pdf"
                  HandleUploadSomeImages={doc => {
                    setFormData(prevFormData => ({
                      ...prevFormData,
                      msme_doc: doc
                    }));
                  }}
                  UploadText={'Upload MSME doc'}
                />
              </FormControl>
            </GridItem>

            <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
              <FormLabel>GST Document</FormLabel>
              <InputUploadMultiple
                acceptData="application/pdf"
                HandleUploadSomeImages={doc => {
                  setFormData(prevFormData => ({
                    ...prevFormData,
                    gst_doc: doc
                  }));
                }}
                UploadText={'Upload GST doc'}
              />
            </GridItem>

            <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
              <FormLabel>PAN Document</FormLabel>
              <InputUploadMultiple
                acceptData="application/pdf"
                HandleUploadSomeImages={doc => {
                  setFormData(prevFormData => ({
                    ...prevFormData,
                    pan_doc: doc
                  }));
                }}
                UploadText={'Upload PAN doc'}
              />
            </GridItem>

            <GridItem as="div" colSpan={{ base: 12, md: 12 }} p="25px 10px 10px 10px">
              <Box position="relative">
                <Text fontSize={'1.3rem'} fontWeight={'600'} bg="white">
                  Commission Details
                </Text>
                <Divider mt={'2'} border={'1px solid red'} opacity={'0.2'} />
              </Box>
            </GridItem>

            <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
              <FormLabel>Commission Type</FormLabel>
              <Select name="commission_type" onChange={HandleDetailsChange} isRequired>
                <option value="">Select Commission Type</option>
                <option value="Percentage_Based" selected={formData?.commission_type === 'Percentage_Based'}>
                  Percentage Based
                </option>
                <option value="Static_Amount" selected={formData?.commission_type === 'Static_Amount'}>
                  Static Amount
                </option>
              </Select>
            </GridItem>

            <GridItem as="div" colSpan={{ base: 12, md: 5 }} p="10px">
              <FormLabel>Commission</FormLabel>
              <Input
                placeholder="Commission"
                type="number"
                name="commission_amount"
                value={formData?.commission_amount}
                isRequired
                onChange={HandleDetailsChange}
              />
            </GridItem>

            <GridItem as="div" colSpan={{ base: 12, md: 12 }} p="10px" m={'2'}>
              <Grid templateColumns="repeat(12, 1fr)">
                {formData?.msme_doc && (
                  <GridItem as="div" m={'auto'} colSpan={{ base: 6, md: 4 }}>
                    <Flex alignItems={'center'} justifyContent={'space-between'} p={'2'}>
                      <Button onClick={onOpen} borderTopRightRadius={'0px'} borderBottomRightRadius={'0px'} fontWeight={'600'}>
                        MSME DOC
                      </Button>
                      <Button
                        colorScheme="red"
                        borderTopLeftRadius={'0px'}
                        borderBottomLeftRadius={'0px'}
                        onClick={() => setFormData({ ...formData, msme_doc: '' })}
                      >
                        <FiXCircle />
                      </Button>
                      <DocumentModal isOpen={isOpen} onClose={onClose} name={'MSME DOCUMENT'} doc={formData?.msme_doc} />
                    </Flex>
                  </GridItem>
                )}

                {formData?.gst_doc && (
                  <GridItem as="div" m={'auto'} colSpan={{ base: 12, md: 4 }}>
                    <Flex alignItems={'center'} justifyContent={'space-between'} p={'2'} direction={{ base: 'column', md: 'row' }}>
                      <Button onClick={onOpen} borderTopRightRadius={'0px'} borderBottomRightRadius={'0px'} fontWeight={'600'}>
                        GST DOC
                      </Button>
                      <Button
                        colorScheme="red"
                        borderTopLeftRadius={'0px'}
                        borderBottomLeftRadius={'0px'}
                        onClick={() => setFormData({ ...formData, gst_doc: '' })}
                      >
                        <FiXCircle />
                      </Button>
                      <DocumentModal isOpen={isOpen} onClose={onClose} name={'GST DOCUMENT'} doc={formData?.gst_doc} />
                    </Flex>
                  </GridItem>
                )}

                {formData?.pan_doc && (
                  <GridItem as="div" m={'auto'} colSpan={{ base: 12, md: 4 }}>
                    <Flex alignItems={'center'} justifyContent={'space-between'} p={'2'} direction={{ base: 'column', md: 'row' }}>
                      <Button onClick={onOpen} borderTopRightRadius={'0px'} borderBottomRightRadius={'0px'} fontWeight={'600'}>
                        PAN DOC
                      </Button>
                      <Button
                        colorScheme="red"
                        borderTopLeftRadius={'0px'}
                        borderBottomLeftRadius={'0px'}
                        onClick={() => setFormData({ ...formData, pan_doc: '' })}
                      >
                        <FiXCircle />
                      </Button>
                      <DocumentModal isOpen={isOpen} onClose={onClose} name={'PAN DOCUMENT'} doc={formData?.pan_doc} />
                    </Flex>
                  </GridItem>
                )}
              </Grid>
            </GridItem>

            {/* <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
            <FormControl>
              <FormLabel>Sales person name</FormLabel>
              <Select>
                <option>No one</option>
                <option>person 1</option>
                <option>person 2</option>
              </Select>
            </FormControl>
          </GridItem> */}
          </Grid>
        )}
        <Flex gap={1} justifyContent={'end'} my={'15px'}>
          <Link to="/admin/vendor">
            <Button colorScheme="gray" my="10px">
              Cancel
            </Button>
          </Link>
          <Button bg="#30829c" colorScheme="blue" m="10px" rightIcon={<FiCheckCircle />} onClick={SaveVendorDetails}>
            Save Vendor Details
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default EditVendor;
