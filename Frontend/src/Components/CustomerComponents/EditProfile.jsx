import {
  Avatar,
  Button,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputUpload from "../Extra/InputUpload";
import {
  UpdateCustomerByID,
  getCustomerByID,
} from "../../Redux/App/Actions/Customer.action";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  let { Customer_detail, token } = useSelector(
    (store) => store?.CustomerAuthManager
  );
  const customer =
    Customer_detail ||
    JSON.parse(localStorage.getItem("customer_detail_carvendor"));
  let customertoken =
    token || JSON.parse(localStorage.getItem("customer_token_carvendor"));

  const [customerDetails, setCustomerDetails] = useState({});
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: customerDetails?.first_name || "",
    last_name: customerDetails?.last_name || "",
    profile_pic: customerDetails?.profile_pic || "",
    address: customerDetails?.address || "",
    phone_number: customerDetails?.phone_number || "",
    city: customerDetails?.city || "",
    state: customerDetails?.state || "",
    pin: customerDetails?.pin || "",
  });

  const HandleUploadSomeImages = (value) => {
    setFormData({
      ...formData,
      profile_pic: value,
    });
  };

  const getData = () => {
    dispatch(
      getCustomerByID(
        customer?._id,
        (data) => {
          setCustomerDetails(data);
          setFormData({
            ...formData,
            first_name: data?.first_name || "",
            last_name: data?.last_name || "",
            profile_pic: data?.profile_pic || "",
            address: data?.address || "",
            city: data?.city || "",
            state: data?.state || "",
            pin: data?.pin || "",
          });
        },
        toast,
        navigate,
        customertoken
      )
    );
  };

  const editHandler = () => {
    setIsEditing(true);
  };

  const submitHandler = () => {
    setIsEditing(false);
    dispatch(
      UpdateCustomerByID(
        customerDetails?._id,
        formData,
        toast,
        getData,
        "User Details Updated Successfully!",
        customertoken
      )
    );
  };

  const cancelHandler = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Heading my="5" fontWeight={"500"} color="#30829c">
        My Profile
      </Heading>
      <Card p="5" border="1px solid #ddd">
        <Flex gap="3" flexDirection={{ base: "column", md: "row" }} mb="3">
          <FormControl>
            <FormLabel>First name :</FormLabel>
            <Input
              placeholder={isEditing ? "Enter First Name" : " name"}
              name="first_name"
              isDisabled={!isEditing}
              value={formData.first_name || ""}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Last name :</FormLabel>
            <Input
              placeholder={isEditing ? "Enter Last Name" : " last name"}
              name="last_name"
              isDisabled={!isEditing}
              value={formData.last_name || ""}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Update Profile Image :</FormLabel>
            <InputUpload
              isDisabled={!isEditing}
              HandleUploadSomeImages={HandleUploadSomeImages}
              accept={"image/*"}
            />
          </FormControl>
        </Flex>
        <Flex gap="3" flexDirection={{ base: "column", md: "row" }} mb="3">
          <FormControl>
            <FormLabel>Email :</FormLabel>
            <Input
              type="email"
              placeholder={isEditing ? "Enter Email" : " Email"}
              name="email"
              isDisabled
              value={customerDetails?.email || ""}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Phone Number :</FormLabel>
            <Input
              type="number"
              isDisabled={!isEditing}
              placeholder={isEditing ? "Enter Phone Number" : "Phone Number"}
              name="phone_number"
              onChange={handleChange}
              defaultValue={customerDetails?.phone_number || ""}
            />
          </FormControl>
        </Flex>
        <FormControl my={1}>
          <FormLabel>Address :</FormLabel>
          <Input
            placeholder={isEditing ? "Enter Address" : " address"}
            name="address"
            isDisabled={!isEditing}
            value={formData.address || ""}
            onChange={handleChange}
          />
        </FormControl>
        <Flex gap="3" flexDirection={{ base: "column", md: "row" }} mb="3">
          <FormControl>
            <FormLabel>City :</FormLabel>
            <Input
              placeholder={isEditing ? "Enter City" : " city"}
              name="city"
              isDisabled={!isEditing}
              value={formData.city || ""}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>State :</FormLabel>
            <Input
              placeholder={isEditing ? "Enter State" : " state"}
              name="state"
              isDisabled={!isEditing}
              value={formData.state?.state_name || ""}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>PIN :</FormLabel>
            <Input
              type="number"
              placeholder={isEditing ? "Enter PIN" : " pin"}
              name="pin"
              isDisabled={!isEditing}
              value={formData.pin || ""}
              onChange={handleChange}
            />
          </FormControl>
        </Flex>
        <Flex gap="3" mb="3" justifyContent={"end"} mt="5">
          {!isEditing && (
            <Button  color="white" onClick={editHandler}>
              EDIT DETAILS
            </Button>
          )}
          {isEditing && (
            <Button  bg="#30829c" colorScheme="green" onClick={submitHandler}>
              SUBMIT
            </Button>
          )}
          {isEditing && (
            <Button colorScheme="blue" onClick={cancelHandler}>
              CANCEL
            </Button>
          )}
        </Flex>
      </Card>
    </>
  );
}
