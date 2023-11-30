import React, { useEffect, useState } from "react";
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
  Heading,
  Image,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FiCheckCircle,
  FiDownloadCloud,
  FiPlusCircle,
  FiXCircle,
} from "react-icons/fi";
import InputUploadMultiple from "../../Extra/InputMultipleUpload";
import { Document, Page } from "react-pdf";
import {
  UpdateEmployeeByID,
  getEmployeeByID,
} from "../../../Redux/App/Actions/Employee.actions";
import InputUpload from "../../Extra/InputUpload";
import DocumentModal from "../../Extra/DocumentModal";

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

const EditEmployees = () => {
  let { User_detail, token } = useSelector((store) => store?.UserAuthManager);
  const user =
    User_detail || JSON.parse(localStorage.getItem("user_detail_carvendor"));
  let admintoken =
    token || JSON.parse(localStorage.getItem("admin_token_carvendor"));
  const [formData, setFormData] = useState(initial);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const params = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, error } = useSelector((store) => store?.EmployeeManager);

  const HandleDetailsChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
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

  const SaveEmployeeDetails = async () => {
    let title = "Updated Employee Successfully";
    dispatch(
      UpdateEmployeeByID(
        params.id,
        formData,
        toast,
        navigate,
        title,
        admintoken
      )
    );
  };

  const getData = (id) => {
    dispatch(getEmployeeByID(id, setFormData, toast, navigate, admintoken));
  };

  useEffect(() => {
    let id = params.id;
    if (!id) return navigate("/admin/employees");

    getData(id);
  }, []);
  return (
    <Box padding={"20px"}>
      <Container
        as="form"
        maxW="container"
        borderRadius="5px"
        mb="10"
        padding={"20px"}
        backgroundColor={"white"}
      >
        <Grid templateColumns="repeat(12, 1fr)">
          <GridItem as="div" colSpan={{ base: 12, md: 12 }} p="10px">
            <Text mb="2" fontWeight={"500"} fontSize="1.5rem">
              Edit Details of Epmloyee:
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
              placeholder="Change Employee Name"
              type="text"
              name="employee_name"
              value={formData?.employee_name}
              onChange={HandleDetailsChange}
            />
          </GridItem>

          <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Change Email"
              type="email"
              name="email"
              value={formData?.email}
              onChange={HandleDetailsChange}
            />
          </GridItem>
          <GridItem
            as="div"
            colSpan={{ base: 12, md: 4 }}
            rowSpan={"2"}
            p="10px"
          >
            <FormLabel>Profile Photo</FormLabel>
            <center>
              {formData.profile_photo && (
                <Image
                  h={"110px"}
                  objectPosition={"center"}
                  objectFit={"contain"}
                  w={"110px"}
                  src={formData.profile_photo || ""}
                />
              )}
              <InputUpload
                accept={"image/*"}
                HandleUploadSomeImages={(file) =>
                  setFormData({
                    ...formData,
                    profile_photo: file,
                  })
                }
              />
            </center>
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
                formData?.phone_number?.length !== 10 &&
                formData?.phone_number?.length > 0
              }
            >
              <FormLabel>Phone number</FormLabel>
              <Input
                placeholder="Change Phone No."
                type="number"
                name="phone_number"
                value={formData?.phone_number}
                onChange={HandleDetailsChange}
              />
              {formData?.phone_number?.length !== 10 &&
                formData?.phone_number?.length > 0 && (
                  <FormErrorMessage>
                    Enter 10 digit phone number
                  </FormErrorMessage>
                )}
            </FormControl>
          </GridItem>
          {/* <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
          <FormLabel>Profile Picture</FormLabel>
            <InputUpload HandleUploadSomeImages={HandleUploadProfilePic}  />
          </GridItem> */}
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
            <FormControl
              isInvalid={
                formData?.aadhar_number?.length !== 12 &&
                formData?.aadhar_number?.length > 0
              }
            >
              <FormLabel>Aadhar number</FormLabel>
              <Input
                placeholder="Change Aadhar Number"
                type="text"
                name="aadhar_number"
                value={formData?.aadhar_number}
                onChange={HandleDetailsChange}
              />
              {formData?.aadhar_number?.length !== 12 &&
                formData?.aadhar_number?.length > 0 && (
                  <FormErrorMessage>
                    Enter 12 digit AADHAR number
                  </FormErrorMessage>
                )}
            </FormControl>
          </GridItem>

          <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="10px">
            <FormControl
              isInvalid={
                formData?.pan_number?.length !== 10 &&
                formData?.pan_number?.length > 0
              }
            >
              <FormLabel>PAN number</FormLabel>
              <Input
                placeholder="Change PAN Number"
                type="text"
                name="pan_number"
                value={formData?.pan_number}
                onChange={HandleDetailsChange}
              />
              {formData?.pan_number?.length !== 10 &&
                formData?.pan_number?.length > 0 && (
                  <FormErrorMessage>Enter 10 digit PAN number</FormErrorMessage>
                )}
            </FormControl>
          </GridItem>

          <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="10px">
            <FormLabel>AADHAR Document</FormLabel>
            <InputUploadMultiple
              acceptData="application/pdf"
              HandleUploadSomeImages={(doc) => {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  aadhar_doc: doc,
                }));
              }}
              UploadText={"Upload AADHAR doc"}
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

          <GridItem
            as="div"
            colSpan={{ base: 12, md: 12 }}
            p="10px"
            m={"2"}
            borderRadius="10px"
          >
            <Grid templateColumns="repeat(8, 1fr)">
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
            rightIcon={<FiCheckCircle />}
            onClick={SaveEmployeeDetails}
          >
            Save Employee Details
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default EditEmployees;
