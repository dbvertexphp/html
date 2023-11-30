import {
  Box,
  Stack,
  Heading,
  Card,
  Flex,
  Grid,
  GridItem,
  Text,
  Input,
  CardHeader,
  Select,
  FormControl,
  FormHelperText,
  CardFooter,
  Checkbox,
  Button,
  VStack,
  UnorderedList,
  ListItem,
  FormLabel,
  Divider,
  useToast,
  Image,
  FormErrorMessage,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postVendor } from "../Redux/App/Actions/Vendor.action";
import { FiDownloadCloud, FiPlusCircle, FiXCircle } from "react-icons/fi";
import InputUploadMultiple from "../Components/Extra/InputMultipleUpload";
import { Document, Page, pdfjs } from "react-pdf";
import { useEffect, useState } from "react";
import {
  getEmployees,
  getEmployeesList,
} from "../Redux/App/Actions/Employee.actions";
import DocumentModal from "../Components/Extra/DocumentModal";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const initial = {
  vendor_name: "",
  company_name: "",
  email: "",
  password: "",
  role: "Vendor",
  gst_number: "",
  pan_number: "",
  msme_number: "",
  mobile_number: "",
  phone_number: "",
  certificates: [],
  reference: "",
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

export default function VendorRegister() {
  const [formData, setFormData] = useState(initial);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const [employees, setEmployees] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getData = () => {
    dispatch(getEmployeesList(setEmployees));
  };

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

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.address.pincode = +formData.address.pincode;
    setloading(true);
    dispatch(postVendor(formData, navigate, toast));
    setloading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Stack minH={"100vh"} direction={{ base: "column-reverse", md: "row" }}>
      <Flex p={{ base: 3, md: 8 }} flex={1} align={"center"} justify={"center"}>
        <Card
          border={"1px solid #ddd"}
          boxShadow={" rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
          borderRadius={"20px"}
          mx={{ base: "0px", md: "20px" }}
          p="5"
          w="90%"
          as={"form"}
          onSubmit={handleSubmit}
        >
          <CardHeader>
            <Text
              color={"#30829c"}
              fontSize={{ base: "20", sm: "24" }}
              textAlign={"center"}
              fontWeight="500"
            >
              Leave your details & we will contact you!
            </Text>
          </CardHeader>
          <Grid templateColumns="repeat(12, 1fr)">
            <GridItem as="div" colSpan="12">
              <Box position="relative">
                <Text fontSize={"1.3rem"} fontWeight={"600"} bg="white">
                  Personal Details
                </Text>
                <Divider mt={"2"} border={"1px solid red"} opacity={"0.2"} />
              </Box>
            </GridItem>

            <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="10px">
              <FormLabel>Vendor Name</FormLabel>
              <Input
                placeholder="Enter Vendor Name"
                type="text"
                name="vendor_name"
                value={formData.vendor_name}
                onChange={HandleDetailsChange}
                isRequired
              />
            </GridItem>

            <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="10px">
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Enter Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={HandleDetailsChange}
                isRequired
              />
            </GridItem>
            <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="10px">
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="Enter Password"
                type="text"
                name="password"
                value={formData.password}
                onChange={HandleDetailsChange}
                isRequired
              />
            </GridItem>
            <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="10px">
              <FormLabel>Company Name</FormLabel>
              <Input
                placeholder="Enter Company Name"
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={HandleDetailsChange}
              />
            </GridItem>
            <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="10px">
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

            <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="10px">
              <FormControl
                isInvalid={
                  formData?.mobile_number.length !== 10 &&
                  formData?.mobile_number.length > 0
                }
              >
                <FormLabel>Mobile number</FormLabel>
                <Input
                  placeholder="Enter Mobile Number"
                  type="number"
                  name="mobile_number"
                  value={formData?.mobile_number}
                  onChange={HandleDetailsChange}
                  isRequired
                />
                {formData?.mobile_number.length !== 10 &&
                  formData?.mobile_number.length > 0 && (
                    <FormErrorMessage>
                      Enter 10 digit phone number
                    </FormErrorMessage>
                  )}
              </FormControl>
            </GridItem>

            <GridItem as="div" colSpan="12" py="10px">
              <Box position="relative">
                <Text fontSize={"1.3rem"} fontWeight={"600"} bg="white">
                  Address Details
                </Text>
                <Divider mt={"2"} border={"1px solid red"} opacity={"0.2"} />
              </Box>
            </GridItem>

            <GridItem as="div" colSpan={{ base: 12, md: 12 }} p="10px">
              <FormLabel>Address Line 1</FormLabel>
              <Input
                placeholder="Enter Address Line 1"
                type="text"
                name="address1"
                value={formData?.address?.address1}
                onChange={HandleDetailsAddressChange}
                isRequired
              />
            </GridItem>

            <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="10px">
              <FormLabel>Address Line 2</FormLabel>
              <Input
                placeholder="Enter Address Line 2"
                type="text"
                name="address2"
                value={formData?.address?.address2}
                onChange={HandleDetailsAddressChange}
              />
            </GridItem>
            <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="10px">
              <FormLabel>Landmark</FormLabel>
              <Input
                placeholder="Enter Landmark"
                type="text"
                name="landmark"
                value={formData?.address?.landmark}
                onChange={HandleDetailsAddressChange}
              />
            </GridItem>
            <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="10px">
              <FormLabel>Pincode</FormLabel>
              <Input
                placeholder="Enter Pincode"
                type="number"
                name="pincode"
                value={formData?.address?.pincode}
                onChange={HandleDetailsAddressChange}
                isRequired
              />
            </GridItem>
            <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="10px">
              <FormLabel>City</FormLabel>
              <Input
                placeholder="Enter City"
                type="text"
                name="city"
                value={formData?.address?.city}
                onChange={HandleDetailsAddressChange}
                isRequired
              />
            </GridItem>

            <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="10px">
              <FormLabel>District</FormLabel>
              <Input
                placeholder="Change District"
                type="text"
                name="district"
                value={formData?.address?.district}
                onChange={HandleDetailsAddressChange}
              />
            </GridItem>
            <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="10px">
              <FormLabel>State</FormLabel>
              <Input
                placeholder="Enter State"
                type="text"
                name="state"
                value={formData?.address?.state}
                onChange={HandleDetailsAddressChange}
                isRequired
              />
            </GridItem>

            <GridItem as="div" colSpan="12" py="10px">
              <Box position="relative">
                <Text fontSize={"1.3rem"} fontWeight={"600"} bg="white">
                  Other Details
                </Text>
                <Divider mt={"2"} border={"1px solid red"} opacity={"0.2"} />
              </Box>
            </GridItem>

            <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="10px">
              <FormControl>
                <FormLabel>MSME number</FormLabel>
                <Input
                  placeholder="Enter MSME Number"
                  type="text"
                  name="msme_number"
                  value={formData?.msme_number}
                  onChange={HandleDetailsChange}
                  isRequired
                />
              </FormControl>
            </GridItem>
            <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="10px">
              <FormControl
                isInvalid={
                  formData?.gst_number.length !== 15 &&
                  formData?.gst_number.length > 0
                }
              >
                <FormLabel>GST number</FormLabel>
                <Input
                  placeholder="Enter GST Number"
                  type="text"
                  name="gst_number"
                  value={formData?.gst_number}
                  onChange={HandleDetailsChange}
                  isRequired
                />
                {formData?.gst_number.length !== 15 &&
                  formData?.gst_number.length > 0 && (
                    <FormErrorMessage>
                      Enter 15 digit GST number
                    </FormErrorMessage>
                  )}
              </FormControl>
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
                  isRequired
                />
                {formData?.pan_number.length !== 10 &&
                  formData?.pan_number.length > 0 && (
                    <FormErrorMessage>
                      Enter 10 digit GST number
                    </FormErrorMessage>
                  )}
              </FormControl>
            </GridItem>

            <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="10px">
              <FormLabel>Reference Employee (optional)</FormLabel>
              <Select name="reference" onChange={HandleDetailsChange}>
                <option value="">Select Name</option>
                <option value="">No One</option>
                {employees &&
                  employees.map(
                    (el) =>
                      (el.status === "active" || el.status === "inactive") && (
                        <option value={el?._id}>{el?.employee_name}</option>
                      )
                  )}
              </Select>
            </GridItem>
            <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
              <FormControl>
                <FormLabel>MSME Document</FormLabel>
                <InputUploadMultiple
                  acceptData="application/pdf"
                  HandleUploadSomeImages={(doc) => {
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      msme_doc: doc,
                    }));
                  }}
                  UploadText={"Upload MSME doc"}
                />
              </FormControl>
            </GridItem>

            <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
              <FormLabel>GST Document</FormLabel>
              <InputUploadMultiple
                acceptData="application/pdf"
                HandleUploadSomeImages={(doc) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    gst_doc: doc,
                  }));
                }}
                UploadText={"Upload GST doc"}
              />
            </GridItem>

            <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
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
                {formData?.msme_doc && (
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
                        MSME DOC
                      </Button>
                      <Button
                        colorScheme="red"
                        borderTopLeftRadius={"0px"}
                        borderBottomLeftRadius={"0px"}
                        onClick={() =>
                          setFormData({ ...formData, msme_doc: "" })
                        }
                      >
                        <FiXCircle />
                      </Button>
                      <DocumentModal
                        isOpen={isOpen}
                        onClose={onClose}
                        name={"MSME DOCUMENT"}
                        doc={formData?.msme_doc}
                      />
                    </Flex>
                  </GridItem>
                )}

                {formData?.gst_doc && (
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
                        GST DOC
                      </Button>
                      <Button
                        colorScheme="red"
                        borderTopLeftRadius={"0px"}
                        borderBottomLeftRadius={"0px"}
                        onClick={() =>
                          setFormData({ ...formData, gst_doc: "" })
                        }
                      >
                        <FiXCircle />
                      </Button>
                      <DocumentModal
                        isOpen={isOpen}
                        onClose={onClose}
                        name={"GST DOCUMENT"}
                        doc={formData?.gst_doc}
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
                        onClick={() =>
                          setFormData({ ...formData, pan_doc: "" })
                        }
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

          <CardFooter justifyContent="center">
            <Button
              bg="#30829c"
              width={"80%"}
              my="3"
              colorScheme="teal"
              color={"white"}
              mx={2}
              type="submit"
              isLoading={loading}
            >
              Submit
            </Button>
            <Button
              colorScheme="gray"
              my="3"
              mx={1}
              onClick={() => setFormData(initial)}
            >
              Reset
            </Button>
          </CardFooter>
        </Card>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          objectPosition="center"
          src="/vendor.jpg"
          style={{
            boxShadow: "inset 67px - 76px 66px 10px rgba(255, 255, 255, 1)",
          }}
        />
      </Flex>
    </Stack>
  );
}
