import { useState } from "react";
import {
  Button,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateCustomerPassword,
  getCustomerByID,
} from "../../Redux/App/Actions/Customer.action";
let init = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};
export default function CustomerChangePassword() {
  const toast = useToast();
  const dispatch = useDispatch();
  let { Customer_detail, token, loading } = useSelector(
    (store) => store?.CustomerAuthManager
  );
  const customer =
    Customer_detail ||
    JSON.parse(localStorage.getItem("customer_detail_carvendor"));
  let customertoken =
    token || JSON.parse(localStorage.getItem("customer_token_carvendor"));
  const [formData, setFormData] = useState(init);

  const getData = () => {
    dispatch(getCustomerByID(Customer_detail?._id));
    setFormData(init);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (
      formData.newPassword === formData.confirmPassword &&
      formData.newPassword != "" &&
      formData.confirmPassword != ""
    ) {
      if (formData.oldPassword !== formData.newPassword) {
        const requestData = {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        };
        dispatch(
          UpdateCustomerPassword(
            Customer_detail?._id,
            requestData,
            toast,
            getData,
            "Customer Password has been Successfully Changed",
            customertoken
          )
        );
      } else {
        toast({
          title: "Old password cannot be the same as the new password",
          status: "error",
          position: "top",
          duration: 4000,
        });
      }
    } else {
      toast({
        title: "New and Confirm password should match !",
        status: "error",
        position: "top",
        duration: 4000,
      });
    }
  };

  return (
    <>
      <Heading my="5" fontWeight={"500"} color="#30829c">
        Change Password
      </Heading>
      <Card p="5" px={{ base: "10", md: "300px" }} border="1px solid #ddd">
        <FormControl>
          <FormLabel mt="5">Old Password:</FormLabel>
          <Input
            placeholder="Enter Old Password"
            name="oldPassword"
            type="password"
            value={formData.oldPassword}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel mt="5">New Password:</FormLabel>
          <Input
            placeholder="Enter New Password"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel mt="5">Confirm New Password:</FormLabel>
          <Input
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </FormControl>
        <Flex my="5" justifyContent={"center"}>
          <Button
            colorScheme="green"
            onClick={handleSubmit}
            isLoading={loading}
          >
            UPDATE PASSWORD
          </Button>
        </Flex>
      </Card>
    </>
  );
}
