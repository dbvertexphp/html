import React, { useState } from "react";
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
  Image,
  Select,
  useDisclosure,
  Th,
  Tr,
  Thead,
  Table,
  TableContainer,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FiDownloadCloud, FiPlusCircle, FiXCircle } from "react-icons/fi";
import InputUploadMultiple from "../../Extra/InputMultipleUpload";
import { Document, Page, pdfjs } from "react-pdf";
import InputUpload from "../../Extra/InputUpload";
import { postEmployee } from "../../../Redux/App/Actions/Employee.actions";
import DocumentModal from "../../Extra/DocumentModal";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const initial = {
  employee_name: "",
  email: "",
  aadhar_number: "",
  aadhar_doc: "",
  pan_number: "",
  pan_doc: "",
  gender: "",
  profile_pic: "",
  phone_number: "",
  references: [],
  address: {
    address1: "",
    address2: "",
    state: "",
    landmark: "",
    district: "",
    city: "",
    pincode: "",
  },
};

const AddEmployees = () => {
  let { User_detail, token } = useSelector((store) => store?.UserAuthManager);
  const user =
    User_detail || JSON.parse(localStorage.getItem("user_detail_carvendor"));
  let admintoken =
    token || JSON.parse(localStorage.getItem("admin_token_carvendor"));
  const [formData, setFormData] = useState(initial);
  const [refrence, setrefrence] = useState({
    name: "",
    email: "",
    phone_number: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, error } = useSelector((store) => store?.EmployeeManager);

  const HandleDetailsChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const HandleReferChange = (event) => {
    const { name, value } = event.target;
    setrefrence((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const HandleDetailsAddressChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      address: {
        ...prevFormData.address,
        [name]: value,
      },
    }));
  };

  const ClearReferenceInputs = () => {
    document.getElementById("reference1").value = "";
    document.getElementById("reference2").value = "";
    document.getElementById("reference3").value = "";
  };
  const HandleUploadProfilePic = (image) => {
    setFormData({ ...formData, profile_pic: image });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.address.pincode = +formData.address.pincode;

    dispatch(postEmployee(formData, navigate, toast, admintoken));
  };

  return (
    <Box padding={"20px"}>
      <Container
        as="form"
        maxW="container"
        // border="0.4px solid"
        borderRadius="5px"
        mb="10"
        padding={"20px"}
        backgroundColor={"white"}
        onSubmit={handleSubmit}
      >
        <Grid templateColumns="repeat(12, 1fr)">
          <GridItem as="div" colSpan={{ base: 12, md: 12 }} p="10px">
            <Text mb="2" fontWeight={"500"} fontSize="1.5rem">
              Add details of Employee:
            </Text>
          </GridItem>

          <GridItem
            as="div"
            colSpan={{ base: 12, md: 12 }}
            p="25px 10px 10px 10px"
          >
            <Box position="relative">
              <Text fontSize={"1.3rem"} fontWeight={"600"} bg="white">
                Personal Details
              </Text>
              <Divider mt={"2"} border={"1px solid red"} opacity={"0.2"} />
            </Box>
          </GridItem>

          <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
            <FormLabel>Employee Name</FormLabel>
            <Input
              placeholder="Enter Employee Name"
              type="text"
              name="employee_name"
              value={formData.employee_name}
              onChange={HandleDetailsChange}
            />
          </GridItem>

          <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Enter Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={HandleDetailsChange}
            />
          </GridItem>
          <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <Select
                name="gender"
                value={formData?.gender}
                onChange={HandleDetailsChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </Select>
            </FormControl>
          </GridItem>
          <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
            <FormControl
              isInvalid={
                formData?.phone_number.length !== 10 &&
                formData?.phone_number.length > 0
              }
            >
              <FormLabel>Phone number</FormLabel>
              <Input
                placeholder="Enter Phone No."
                type="number"
                name="phone_number"
                value={formData?.phone_number}
                onChange={HandleDetailsChange}
              />
              {formData?.phone_number.length !== 10 &&
                formData?.phone_number.length > 0 && (
                  <FormErrorMessage>
                    Enter 10 digit phone number
                  </FormErrorMessage>
                )}
            </FormControl>
          </GridItem>
          <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
            <FormLabel>Profile Picture</FormLabel>
            <InputUpload
              HandleUploadSomeImages={HandleUploadProfilePic}
              accept={"image/*"}
            />
          </GridItem>
          <GridItem
            as="div"
            colSpan={{ base: 12, md: 12 }}
            p="25px 10px 10px 10px"
          >
            <Box position="relative">
              <Text fontSize={"1.3rem"} fontWeight={"600"} bg="white">
                Address Details
              </Text>
              <Divider mt={"2"} border={"1px solid red"} opacity={"0.2"} />
            </Box>
          </GridItem>

          <GridItem as="div" colSpan={{ base: 12, md: 5 }} p="10px">
            <FormLabel>Address Line 1</FormLabel>
            <Input
              placeholder="Change Address Line 1"
              type="text"
              name="address1"
              value={formData?.address?.address1}
              onChange={HandleDetailsAddressChange}
            />
          </GridItem>

          <GridItem as="div" colSpan={{ base: 12, md: 5 }} p="10px">
            <FormLabel>Address Line 2</FormLabel>
            <Input
              placeholder="Change Address Line 2"
              type="text"
              name="address2"
              value={formData?.address?.address2}
              onChange={HandleDetailsAddressChange}
            />
          </GridItem>
          <GridItem as="div" colSpan={{ base: 6, md: 2 }} p="10px">
            <FormLabel>Pincode</FormLabel>
            <Input
              placeholder="Change Pincode"
              type="number"
              name="pincode"
              value={formData?.address?.pincode}
              onChange={HandleDetailsAddressChange}
            />
          </GridItem>
          <GridItem as="div" colSpan={{ base: 6, md: 3 }} p="10px">
            <FormLabel>City</FormLabel>
            <Input
              placeholder="Change City"
              type="text"
              name="city"
              value={formData?.address?.city}
              onChange={HandleDetailsAddressChange}
            />
          </GridItem>

          <GridItem as="div" colSpan={{ base: 6, md: 3 }} p="10px">
            <FormLabel>State</FormLabel>
            <Input
              placeholder="Change State"
              type="text"
              name="state"
              value={formData?.address?.state}
              onChange={HandleDetailsAddressChange}
            />
          </GridItem>

          <GridItem as="div" colSpan={{ base: 6, md: 3 }} p="10px">
            <FormLabel>Landmark</FormLabel>
            <Input
              placeholder="Change Landmark"
              type="text"
              name="landmark"
              value={formData?.address?.landmark}
              onChange={HandleDetailsAddressChange}
            />
          </GridItem>
          <GridItem as="div" colSpan={{ base: 6, md: 3 }} p="10px">
            <FormLabel>District</FormLabel>
            <Input
              placeholder="Change District"
              type="text"
              name="district"
              value={formData?.address?.district}
              onChange={HandleDetailsAddressChange}
            />
          </GridItem>
          <GridItem
            as="div"
            colSpan={{ base: 12, md: 12 }}
            p="25px 10px 10px 10px"
          >
            <Box position="relative">
              <Text fontSize={"1.3rem"} fontWeight={"600"} bg="white">
                Other Details
              </Text>
              <Divider mt={"2"} border={"1px solid red"} opacity={"0.2"} />
            </Box>
          </GridItem>

          <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="10px">
            <FormLabel>Aadhar Number</FormLabel>
            <Input
              placeholder="Enter Aadhar Number"
              type="text"
              name="aadhar_number"
              value={formData.aadhar_number}
              onChange={HandleDetailsChange}
            />
          </GridItem>

          <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="10px">
            <FormControl
              isInvalid={
                formData?.pan_number.length !== 10 &&
                formData?.pan_number.length > 0
              }
            >
              <FormLabel>PAN number</FormLabel>
              <Input
                placeholder="Enter PAN Number"
                type="text"
                name="pan_number"
                value={formData?.pan_number}
                onChange={HandleDetailsChange}
              />
              {formData?.pan_number.length !== 10 &&
                formData?.pan_number.length > 0 && (
                  <FormErrorMessage>Enter 10 digit PAN number</FormErrorMessage>
                )}
            </FormControl>
          </GridItem>

          <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="10px">
            <FormLabel>Aadhar Document</FormLabel>
            <InputUploadMultiple
              acceptData="application/pdf"
              HandleUploadSomeImages={(doc) => {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  aadhar_doc: doc,
                }));
              }}
              UploadText={"Upload Aadhar doc"}
            />
          </GridItem>

          <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="10px">
            <FormLabel>PAN Document</FormLabel>
            <InputUploadMultiple
              acceptData="application/pdf"
              HandleUploadSomeImages={(doc) => {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  pan_doc: doc,
                }));
              }}
              UploadText={"Upload PAN doc"}
            />
          </GridItem>

          <GridItem as="div" colSpan={{ base: 12, md: 12 }} p="10px" m={"2"}>
            <Grid templateColumns="repeat(12, 1fr)">
              {formData?.aadhar_doc && (
                <GridItem as="div" m={"auto"} colSpan={{ base: 6, md: 4 }}>
                  <Flex
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    p={"2"}
                  >
                    <Button
                      onClick={onOpen}
                      borderTopRightRadius={"0px"}
                      borderBottomRightRadius={"0px"}
                      fontWeight={"600"}
                    >
                      AADHAR DOC
                    </Button>
                    <Button
                      colorScheme="red"
                      borderTopLeftRadius={"0px"}
                      borderBottomLeftRadius={"0px"}
                      onClick={() =>
                        setFormData({ ...formData, aadhar_doc: "" })
                      }
                    >
                      <FiXCircle />
                    </Button>
                    <DocumentModal
                      isOpen={isOpen}
                      onClose={onClose}
                      name={"AADHAR DOCUMENT"}
                      doc={formData?.aadhar_doc}
                    />
                  </Flex>
                </GridItem>
              )}

              {formData?.pan_doc && (
                <GridItem as="div" m={"auto"} colSpan={{ base: 6, md: 4 }}>
                  <Flex
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    p={"2"}
                  >
                    <Button
                      onClick={onOpen}
                      borderTopRightRadius={"0px"}
                      borderBottomRightRadius={"0px"}
                      fontWeight={"600"}
                    >
                      PAN DOC
                    </Button>
                    <Button
                      colorScheme="red"
                      borderTopLeftRadius={"0px"}
                      borderBottomLeftRadius={"0px"}
                      onClick={() => setFormData({ ...formData, pan_doc: "" })}
                    >
                      <FiXCircle />
                    </Button>
                    <DocumentModal
                      isOpen={isOpen}
                      onClose={onClose}
                      name={"PAN DOCUMENT"}
                      doc={formData?.pan_doc}
                    />
                  </Flex>
                </GridItem>
              )}
            </Grid>
          </GridItem>
          <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
            <FormLabel>Reference Person Name</FormLabel>
            <Input
              id="reference1"
              placeholder="Enter Name"
              type="text"
              name="name"
              value={refrence.name}
              onChange={HandleReferChange}
            />
          </GridItem>
          <GridItem as="div" colSpan={{ base: 12, md: 3 }} p="10px">
            <FormLabel>Reference Person Email</FormLabel>
            <Input
              id="reference2"
              placeholder="Enter Email"
              type="email"
              name="email"
              value={refrence.email}
              onChange={HandleReferChange}
            />
          </GridItem>
          <GridItem as="div" colSpan={{ base: 12, md: 3 }} p="10px">
            <FormLabel>Reference Person Phone No.</FormLabel>
            <Input
              id="reference3"
              placeholder="Enter Contact"
              type="text"
              name="phone_number"
              value={refrence.phone_number}
              onChange={HandleReferChange}
            />
          </GridItem>
          <GridItem
            as="div"
            colSpan={{ base: 12, md: 2 }}
            p="10px"
            pt={"42px"}
            sx={{ alignItems: "end" }}
          >
            <Button
              colorScheme="green"
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  references: [...prev.references, refrence],
                }));
                setrefrence({});
                ClearReferenceInputs();
              }}
            >
              Add Reference
            </Button>
          </GridItem>
          <GridItem as="div" colSpan={{ base: 12, md: 8 }} p="10px">
            <FormLabel>Reference Persons List</FormLabel>
            <TableContainer
              position={"relative"}
              my={"10px"}
              maxHeight={"700px"}
              overflowY={"auto"}
              backgroundColor={"white"}
              border={"1px solid #ddd"}
              // borderRadius={"5px"}
            >
              <Table variant="striped" size={"sm"}>
                <Thead
                  backgroundColor={"white"}
                  position={"sticky"}
                  top="0"
                  zIndex={"3"}
                >
                  <Tr>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Contact no.</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {formData.references?.length > 0 &&
                    formData.references?.map((el) => {
                      return (
                        <Tr>
                          <Td>{el?.name}</Td>
                          <Td>{el?.email}</Td>
                          <Td>{el?.phone_number}</Td>
                        </Tr>
                      );
                    })}
                </Tbody>
              </Table>
            </TableContainer>
          </GridItem>
        </Grid>
        <Flex gap={1} justifyContent={"end"} my={"15px"}>
          <Link to="/admin/employees">
            <Button colorScheme="gray" my="10px">
              Cancel
            </Button>
          </Link>
          <Button
            colorScheme="blue"
            m="10px"
            type="submit"
            isLoading={loading}
            rightIcon={<FiPlusCircle />}
          >
            Add Employee
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default AddEmployees;
