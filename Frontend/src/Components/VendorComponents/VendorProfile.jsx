import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../assets/Icons/avatar.png";
import {
  Container,
  FormLabel,
  Input,
  Select,
  Button,
  Grid,
  GridItem,
  Text,
  FormControl,
  Divider,
  Box,
  Flex,
  useToast,
  Image,
  useDisclosure,
} from "@chakra-ui/react";

import {
  FiCheckCircle,
  FiEdit3,
  FiEye,
  FiImage,
  FiX,
  FiXCircle,
} from "react-icons/fi";

import { UpdateVendorByID } from "../../Redux/App/Actions/Vendor.action";
import InputUpload from "../Extra/InputUpload";
import DocumentModal from "../Extra/DocumentModal";

const VendorProfile = () => {
  let { Vendor_detail, token } = useSelector(
    (store) => store?.VendorAuthManager
  );
  const vendor =
    Vendor_detail ||
    JSON.parse(localStorage.getItem("vendor_detail_carvendor"));
  let vendortoken =
    token || JSON.parse(localStorage.getItem("vendor_token_carvendor"));

  const [ProfileDetails, setProfileDetails] = useState({});

  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [refresh, setrefresh] = useState(false);
  const [EDITING, setEDITING] = useState(false);

  const [Subjects, setSubjects] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setProfileDetails((prevProfileDetails) => ({
      ...prevProfileDetails,
      [name]: value,
    }));
  };
  const handleAddressInputChange = (event) => {
    const { name, value } = event.target;
    setProfileDetails((prevProfileDetails) => ({
      ...prevProfileDetails,
      address: {
        ...prevProfileDetails.address,
        [name]: value,
      },
    }));
  };

  const HandleSaveProfileDetails = async (e) => {
    e.preventDefault();
    ProfileDetails.subjects = Subjects;

    let title = "Vendor Profile Updated Successfully";
    dispatch(
      UpdateVendorByID(
        vendor?._id,
        ProfileDetails,
        toast,
        navigate,
        "/vendor/dashboard",
        title,
        vendortoken
      )
    );
  };
  useEffect(() => {
    setrefresh(!refresh);
    setProfileDetails(vendor);
    setSubjects(vendor?.subjects);
  }, []);

  return (
    <>
      <Container
        maxW="container"
        borderRadius="5px"
        mb="10"
        minH={"610px"}
        padding={"20px"}
        backgroundColor={"white"}
        as="form"
        onSubmit={HandleSaveProfileDetails}
      >
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Text
            mb="2"
            px={{ md: "10px" }}
            fontWeight={"500"}
            fontSize={{ base: "1.3rem", md: "2rem" }}
          >
            Profile & Settings
          </Text>
          <Flex gap={2}>
            {!EDITING && (
              <Button
                bg="blue.500"
                colorScheme="blue"
                my={{ md: "10px" }}
                px={{ base: 3, md: 10 }}
                onClick={() => setEDITING(true)}
                leftIcon={<FiEdit3 />}
              >
                Edit Profile
              </Button>
            )}
          </Flex>
        </Flex>

        <Grid templateColumns="repeat(12, 1fr)">
          <GridItem
            as="div"
            colSpan={{ base: 12, md: 12 }}
            p="25px 10px 10px 10px"
          >
            <Box position="relative">
              <Text fontSize="1.3rem" fontWeight={"600"} bg="white">
                Edit Personal Details
              </Text>
              <Divider border={"1px solid red"} opacity={"0.2"} />
            </Box>
          </GridItem>
          <GridItem as="div" colSpan={{ base: 12, md: 5 }} p="8px">
            <FormLabel>Full Name</FormLabel>
            <Input
              isDisabled={EDITING ? false : true}
              placeholder="Enter First Name"
              type="text"
              name="vendor_name"
              defaultValue={ProfileDetails?.vendor_name || ""}
              onChange={handleInputChange}
              isRequired={true}
            />
          </GridItem>

          <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="8px">
            <FormLabel>Email</FormLabel>
            <Input
              isDisabled={true}
              placeholder="Enter Email"
              type="email"
              name="email"
              defaultValue={ProfileDetails?.email || ""}
              onChange={handleInputChange}
              isRequired={true}
            />
          </GridItem>
          <GridItem
            as="div"
            colSpan={{ base: 12, md: 3 }}
            p="8px"
            mx={5}
            borderRadius={"10px"}
            rowSpan={3}
            // border={"1px solid #ddd"}
          >
            <FormControl my="2" p={2} textAlign={"center"}>
              <Image
                m={" 15px auto"}
                borderRadius={"50%"}
                src={ProfileDetails?.profile_photo || avatar}
                w={"180px"}
                h={"180px"}
                objectPosition={"center"}
                objectFit={"cover"}
              />
              <InputUpload
                HandleUploadSomeImages={(img) =>
                  setProfileDetails({ ...ProfileDetails, profile_photo: img })
                }
                refresh={refresh}
                accept={"image/*"}
                isDisabled={EDITING ? false : true}
                UploadText={"Change Profile"}
                UploadSuccessTitle={"Uploaded Image Successfully"}
                size={"sm"}
                color={"purple"}
                leftIcon={<FiImage />}
              />
            </FormControl>
          </GridItem>
          <GridItem as="div" colSpan={{ base: 12, md: 5 }} p="8px">
            <FormControl
              isInvalid={ProfileDetails?.phone_number?.length !== 10}
            >
              <FormLabel>Phone number</FormLabel>
              <Input
                isDisabled={true}
                placeholder="Enter Phone Number"
                type="number"
                name="phone_number"
                defaultValue={ProfileDetails?.phone_number || ""}
                onChange={handleInputChange}
                isRequired={true}
              />
            </FormControl>
          </GridItem>
          <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="8px">
            <FormControl
              isInvalid={ProfileDetails?.mobile_number?.length !== 10}
            >
              <FormLabel>Mobile number</FormLabel>
              <Input
                isDisabled={EDITING ? false : true}
                placeholder="Enter Phone Number"
                type="number"
                name="mobile_number"
                defaultValue={ProfileDetails?.mobile_number || ""}
                onChange={handleInputChange}
                isRequired={true}
              />
            </FormControl>
          </GridItem>
          <GridItem as="div" colSpan={{ base: 12, md: 5 }} p="8px">
            <FormLabel>Company Name</FormLabel>
            <Input
              isDisabled={EDITING ? false : true}
              placeholder="Enter Company Name"
              type="text"
              name="company_name"
              defaultValue={ProfileDetails?.company_name || ""}
              onChange={handleInputChange}
              isRequired={true}
            />
          </GridItem>
          <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="8px">
            <FormLabel>Refererence Employee</FormLabel>
            <Input
              isDisabled={true}
              placeholder="Refererence Employee"
              type="text"
              name="reference"
              defaultValue={ProfileDetails?.reference?.name || ""}
              onChange={handleInputChange}
              isRequired={true}
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
          <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="8px">
            <FormLabel>Address 1</FormLabel>
            <Input
              isDisabled={EDITING ? false : true}
              placeholder="Enter Address Line 1"
              type="text"
              name="address1"
              isRequired={true}
              defaultValue={ProfileDetails?.address?.address1 || ""}
              onChange={handleAddressInputChange}
            />
          </GridItem>

          <GridItem as="div" colSpan={{ base: 12, md: 5 }} p="8px">
            <FormLabel>Address Line 2</FormLabel>
            <Input
              isDisabled={EDITING ? false : true}
              placeholder="Enter Address Line 2"
              type="text"
              name="address2"
              defaultValue={ProfileDetails?.address?.address2 || ""}
              onChange={handleAddressInputChange}
            />
          </GridItem>

          <GridItem as="div" colSpan={{ base: 6, md: 4 }} p="8px">
            <FormLabel>District</FormLabel>
            <Input
              isDisabled={EDITING ? false : true}
              placeholder="Enter District"
              type="text"
              name="district"
              defaultValue={ProfileDetails?.address?.district || ""}
              onChange={handleAddressInputChange}
              isRequired={true}
            />
          </GridItem>
          <GridItem as="div" colSpan={{ base: 6, md: 3 }} p="8px">
            <FormLabel>City</FormLabel>
            <Input
              isDisabled={EDITING ? false : true}
              placeholder="Enter City"
              type="text"
              name="city"
              isRequired={true}
              defaultValue={ProfileDetails?.address?.city || ""}
              onChange={handleAddressInputChange}
            />
          </GridItem>
          <GridItem as="div" colSpan={{ base: 6, md: 3 }} p="8px">
            <FormLabel>State</FormLabel>
            <Input
              isDisabled={EDITING ? false : true}
              placeholder="Enter State"
              type="text"
              name="state"
              defaultValue={ProfileDetails?.address?.state || ""}
              isRequired={true}
              onChange={handleAddressInputChange}
            />
          </GridItem>

          <GridItem as="div" colSpan={{ base: 6, md: 3 }} p="8px">
            <FormLabel>Pincode</FormLabel>
            <Input
              isDisabled={EDITING ? false : true}
              placeholder="Enter Pincode"
              type="number"
              name="pincode"
              defaultValue={ProfileDetails?.address?.pincode || ""}
              isRequired={true}
              onChange={handleAddressInputChange}
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
          <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
            <FormControl
              isInvalid={
                ProfileDetails?.gst_number?.length !== 15 &&
                ProfileDetails?.gst_number?.length > 0
              }
            >
              <FormLabel>GST number</FormLabel>
              <Input
                isDisabled={EDITING ? false : true}
                placeholder="Enter GST Number"
                type="text"
                name="gst_number"
                value={ProfileDetails?.gst_number}
                onChange={handleInputChange}
                isRequired
              />
              {ProfileDetails?.gst_number?.length !== 15 &&
                ProfileDetails?.gst_number?.length > 0 && (
                  <FormErrorMessage>Enter 15 digit GST number</FormErrorMessage>
                )}
            </FormControl>
          </GridItem>

          <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
            <FormControl
              isInvalid={
                ProfileDetails?.pan_number?.length !== 10 &&
                ProfileDetails?.pan_number?.length > 0
              }
            >
              <FormLabel>PAN number</FormLabel>
              <Input
                isDisabled={EDITING ? false : true}
                placeholder="Enter PAN Number"
                type="text"
                name="pan_number"
                value={ProfileDetails?.pan_number}
                onChange={handleInputChange}
                isRequired
              />
              {ProfileDetails?.pan_number?.length !== 10 &&
                ProfileDetails?.pan_number?.length > 0 && (
                  <FormErrorMessage>Enter 10 digit GST number</FormErrorMessage>
                )}
            </FormControl>
          </GridItem>
          <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
            <FormControl>
              <FormLabel>MSME number</FormLabel>
              <Input
                isDisabled={EDITING ? false : true}
                placeholder="Enter MSME Number"
                type="text"
                name="msme_number"
                value={ProfileDetails?.msme_number}
                onChange={handleInputChange}
                isRequired
              />
            </FormControl>
          </GridItem>
          <GridItem as="div" colSpan={{ base: 6, md: 4 }} p="8px">
            <FormLabel>GST Document</FormLabel>
            {ProfileDetails.gst_doc ? (
              <Flex alignItems={"center"} justifyContent={"center"} p={"2"}>
                <Button
                  isDisabled={EDITING ? false : true}
                  onClick={onOpen}
                  borderTopRightRadius={"0px"}
                  borderBottomRightRadius={"0px"}
                  fontWeight={"600"}
                >
                  GST Document
                </Button>
                <Button
                  isDisabled={EDITING ? false : true}
                  colorScheme="red"
                  borderTopLeftRadius={"0px"}
                  borderBottomLeftRadius={"0px"}
                  onClick={() => {
                    setProfileDetails((prev) => ({
                      ...prev,
                      gst_doc: "",
                    }));
                  }}
                >
                  <FiXCircle />
                </Button>
                <DocumentModal
                  isOpen={isOpen}
                  onClose={onClose}
                  name={"DOCUMNENT"}
                  doc={ProfileDetails?.gst_doc}
                />
              </Flex>
            ) : (
              <InputUpload
                color={"gray"}
                border={"3px dotted gray"}
                acceptData="application/pdf"
                HandleUploadSomeImages={(doc) => {
                  setProfileDetails((prev) => ({
                    ...prev,
                    gst_doc: doc,
                  }));
                }}
                UploadText={"Upload GST doc"}
              />
            )}
          </GridItem>
          <GridItem as="div" colSpan={{ base: 6, md: 4 }} p="8px">
            <FormLabel>PAN Document</FormLabel>
            {ProfileDetails.pan_doc ? (
              <Flex alignItems={"center"} justifyContent={"center"} p={"2"}>
                <Button
                  isDisabled={EDITING ? false : true}
                  onClick={onOpen}
                  borderTopRightRadius={"0px"}
                  borderBottomRightRadius={"0px"}
                  fontWeight={"600"}
                >
                  PAN Document
                </Button>
                <Button
                  isDisabled={EDITING ? false : true}
                  colorScheme="red"
                  borderTopLeftRadius={"0px"}
                  borderBottomLeftRadius={"0px"}
                  onClick={() => {
                    setProfileDetails((prev) => ({
                      ...prev,
                      pan_doc: "",
                    }));
                  }}
                >
                  <FiXCircle />
                </Button>
                <DocumentModal
                  isOpen={isOpen}
                  onClose={onClose}
                  name={"DOCUMNENT"}
                  doc={ProfileDetails?.pan_doc}
                />
              </Flex>
            ) : (
              <InputUpload
                color={"gray"}
                border={"3px dotted gray"}
                acceptData="application/pdf"
                HandleUploadSomeImages={(doc) => {
                  setProfileDetails((prev) => ({
                    ...prev,
                    pan_doc: doc,
                  }));
                }}
                UploadText={"Upload PAN doc"}
              />
            )}
          </GridItem>
          <GridItem as="div" colSpan={{ base: 6, md: 4 }} p="8px">
            <FormLabel>MSME Document</FormLabel>
            {ProfileDetails.msme_doc ? (
              <Flex alignItems={"center"} justifyContent={"center"} p={"2"}>
                <Button
                  isDisabled={EDITING ? false : true}
                  onClick={onOpen}
                  borderTopRightRadius={"0px"}
                  borderBottomRightRadius={"0px"}
                  fontWeight={"600"}
                >
                  MSME Document
                </Button>
                <Button
                  isDisabled={EDITING ? false : true}
                  colorScheme="red"
                  borderTopLeftRadius={"0px"}
                  borderBottomLeftRadius={"0px"}
                  onClick={() => {
                    setProfileDetails((prev) => ({
                      ...prev,
                      msme_doc: "",
                    }));
                  }}
                >
                  <FiXCircle />
                </Button>
                <DocumentModal
                  isOpen={isOpen}
                  onClose={onClose}
                  name={"DOCUMNENT"}
                  doc={ProfileDetails?.msme_doc}
                />
              </Flex>
            ) : (
              <InputUpload
                color={"gray"}
                border={"3px dotted gray"}
                acceptData="application/pdf"
                HandleUploadSomeImages={(doc) => {
                  setProfileDetails((prev) => ({
                    ...prev,
                    msme_doc: doc,
                  }));
                }}
                UploadText={"Upload MSME doc"}
              />
            )}
          </GridItem>

          <GridItem
            as="div"
            colSpan={{ base: 12, md: 12 }}
            p="8px"
            display={"flex"}
            justifyContent={"end"}
            alignItems={"end"}
          >
            {EDITING && (
              <Flex
                gap={3}
                justifyContent={"end"}
                alignItems={"center"}
                width={"100%"}
              >
                <Button
                  bg="green.500"
                  colorScheme="green"
                  my="10px"
                  px={10}
                  type="submit"
                  leftIcon={<FiCheckCircle />}
                >
                  Save Profile Details
                </Button>
                <Link to="/vendor/dashboard">
                  <Button colorScheme="gray" my="10px" px={10}>
                    Cancel
                  </Button>
                </Link>{" "}
              </Flex>
            )}
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};

export default VendorProfile;
