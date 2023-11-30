import {
  Box,
  Button,
  Container,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVendorReport } from "../../../Redux/App/Actions/Admin/Report.action";
import { getVendors } from "../../../Redux/App/Actions/Vendor.action";
import Papa from "papaparse";

const ReportVendor = () => {
  let { User_detail, token } = useSelector((store) => store?.UserAuthManager);
  const user =
    User_detail || JSON.parse(localStorage.getItem("user_detail_carvendor"));
  let admintoken =
    token || JSON.parse(localStorage.getItem("admin_token_carvendor"));
  const [dateSelectValue, setDateSelectValue] = useState({
    startDate: "",
    endDate: "",
  });
  const toast = useToast();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  // const [transactionType, setTransactionType] = useState("bookingCar");
  // const [status, setStatus] = useState("PAYMENT_SUCCESS");
  const dispatch = useDispatch();
  const { totalVendors, loading, error } = useSelector(
    (store) => store?.VendorManager
  );
  const { loading: reportDataLoading, error: reportDataError } = useSelector(
    (store) => store?.ReportManager
  );

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    dispatch(getVendors({}, () => "", admintoken));
  };
  const handleDateSelector = () => {
    if (dateSelectValue.startDate !== "" && dateSelectValue.endDate !== "") {
      const startDateObj = new Date(dateSelectValue?.startDate)?.toISOString();
      const endDateObj = new Date(dateSelectValue?.endDate)?.toISOString();
      if (endDateObj < startDateObj) {
        return toast({
          title: "End Date cannot occur before Start Date",
          status: "error",
          position: "top",
          duration: 4000,
        });
      } else {
        let params = {
          fromDate: dateSelectValue?.startDate,
          toDate: dateSelectValue?.endDate,
        };
        dispatch(getVendorReport(params, setData, admintoken));
        setShow(true);
      }
    } else {
      return toast({
        title: "Please select the range first.",
        status: "warning",
        position: "top",
        duration: 4000,
      });
    }
  };
  const exportToCsv = (data, filename) => {
    const csv = Papa.unparse(data);
    const csvData = new Blob([csv], { type: "text/csv" });
    const csvUrl = URL.createObjectURL(csvData);
    const hiddenElement = document.createElement("a");
    hiddenElement.href = csvUrl;
    hiddenElement.target = "_blank";
    hiddenElement.download = filename;
    hiddenElement.click();
  };

  const handleExport = () => {
    if (data?.length > 0) {
      const rowData = data;
      const fieldsToExport = rowData.map((item) => ({
        vendor_code: item?.vendor_code,
        vendor_name: item?.vendor_name,

        company_name: item?.company_name,
        vendor_gst_number: item?.gst_number,
        vendor_pan_number: item?.pan_number,
        vendor_mobile_number: item?.mobile_number,
        vendor_phone_number: item?.phone_number,
        vendor_status: item?.status,

        employee_code: item?.reference?.employee_code,
        employee_name: item?.reference?.employee_name,
        employee_email: item?.reference?.email,

        vendor_created_at: item?.created_at,
        vendor_created_by_admin: item?.createdBy_admin,
      }));
      exportToCsv(
        fieldsToExport,
        `VendorReport-${new Date(
          dateSelectValue?.startDate
        ).toLocaleDateString()}-${new Date(
          dateSelectValue?.endDate
        ).toLocaleDateString()}`
      );
    } else {
      return toast({
        title: "No data to Export",
        status: "error",
        position: "top",
        duration: 4000,
      });
    }
  };
  return (
    <Box padding={"20px"}>
      <Text
        mb="2"
        p={"10px"}
        fontWeight={"500"}
        fontSize={{ base: "1rem", md: "1.5rem" }}
      >
        Vendor report
      </Text>
      <VStack
        maxW="container"
        // border="0.4px solid"

        borderRadius="5px"
        padding={"20px"}
        backgroundColor={"white"}
      >
        <Text w="full">Total Records Count : {totalVendors || 0}</Text>
        {/* <Text w="full">Total Test Drive Transactions : {transactions?.filter(el => el.transaction_type == "Test Drive Booking")?.length || 0}</Text>
                <Text w="full">Total Booking Transactions : {transactions?.filter(el => el.transaction_type == "Booking Car 10% Pay")?.length || 0}</Text> */}
      </VStack>
      <br />
      <VStack
        borderRadius="5px"
        padding={"20px"}
        justifyContent={"flex-start"}
        backgroundColor={"white"}
      >
        <VStack w="full" mb={5}>
          <FormLabel w="full">
            Select Date Range <span style={{ color: "red" }}>*</span> :{" "}
          </FormLabel>
          <HStack w="full">
            <HStack>
              <p>From</p>
              <Input
                type={"date"}
                size="sm"
                onChange={(e) =>
                  setDateSelectValue({
                    ...dateSelectValue,
                    startDate: e.target.value,
                  })
                }
              />
            </HStack>
            <HStack>
              <p>To</p>
              <Input
                type={"date"}
                size="sm"
                onChange={(e) =>
                  setDateSelectValue({
                    ...dateSelectValue,
                    endDate: e.target.value,
                  })
                }
              />
            </HStack>
          </HStack>
        </VStack>
        {/* <VStack w="full" mb={5}>
                    <FormLabel w="full">Select Transaction type <span style={{ color: "red" }}>*</span> : </FormLabel>
                    <HStack w="full">
                        <Select w="50%" size={"sm"} value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
                            <option value="bookingCar">Booking Car</option>
                            <option value="testDrive">Test Drive</option>
                        </Select>
                    </HStack>
                </VStack>
                <VStack w="full" mb={5}>
                    <FormLabel w="full">Select Status : </FormLabel>
                    <HStack w="full">
                        <Select w="50%" size={"sm"} value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="PAYMENT_SUCCESS">Success</option>
                            <option value="PAYMENT_PENDING">Pending</option>
                            <option value="PAYMENT_DECLINE">Failed</option>
                        </Select>
                    </HStack>
                </VStack> */}
      </VStack>
      <HStack>
        <Button
          onClick={handleDateSelector}
          colorScheme="blue"
          variant="solid"
          isLoading={loading || reportDataLoading}
        >
          Fetch
        </Button>
        <Button
          onClick={() => {
            handleExport();
          }}
          colorScheme="blue"
          isDisabled={data?.length > 0 ? false : true}
          m={"20px"}
          ml={"0"}
          variant="solid"
        >
          Download
        </Button>
        {show && (
          <Text colorScheme={"blue"}> {data?.length || 0} Records found.</Text>
        )}
      </HStack>
    </Box>
  );
};

export default ReportVendor;
