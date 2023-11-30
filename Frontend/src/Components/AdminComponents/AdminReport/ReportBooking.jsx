import {
  Box,
  Button,
  Container,
  FormLabel,
  HStack,
  Input,
  Spinner,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookingReport } from "../../../Redux/App/Actions/Admin/Report.action";
import Papa from "papaparse";
import { getBookings } from "../../../Redux/App/Actions/Booking.action";
import { extractDateAndTime } from "../../../utils/DatesFunctions";

const ReportBooking = () => {
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

  const dispatch = useDispatch();
  const { totalBookings, bookings, loading } = useSelector(
    (store) => store?.BookingManager
  );
  const { loading: reportDataLoading, error: reportDataError } = useSelector(
    (store) => store?.ReportManager
  );

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    dispatch(getBookings({}, admintoken));
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
        dispatch(getBookingReport(params, setData, admintoken));
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
      const rawData = data;
      const fieldsToExport = rawData.map((item) => ({
        Booking_ID: item?.booking_code || "NA",
        Booking_Date: extractDateAndTime(item?.created_at)?.date,
        Booking_Time: extractDateAndTime(item?.updated_at)?.time,

        Car_Brand: item?.car_id?.cmake || "NA",
        Car_Model: item?.car_id?.cmodel || "NA",
        Car_Name: item?.car_id?.cname || "NA",
        Car_Color: item?.car_id?.ccolor || "NA",
        Car_BodyType: item?.car_id?.cbody_type || "NA",
        Car_vendor_id: item?.car_id?.vendorID?.vendor_code || "NA",
        Customer_name:
          item?.customer_id?.first_name + " " + item?.customer_id?.last_name ||
          "NA",
        Customer_email: item?.customer_id?.email || "NA",
        Customer_phone_number: item?.customer_id?.phone_number || "NA",
        Customer_city: item?.customer_id?.city || "NA",

        Test_Drive_name: item?.test_drive_id?.name || "NA",
        Test_Drive_phone_number: item?.test_drive_id?.phone_number || "NA",
        Test_Drive_address: item?.test_drive_id?.address || "NA",
        Test_Drive_prefered_date: item?.test_drive_id?.test_drive_date || "NA",
        Test_Drive_prefered_slot: item?.test_drive_id?.test_drive_slot || "NA",
        Test_Drive_status: item?.test_drive_id?.status || "NA",

        Transaction_type: item?.transaction_type || "NA",
        Amount_to_pay: item?.amount_to_pay || "NA",
        advanced_amount: item?.advanced_amount || "NA",

        Total_amount: item?.total_amount || "NA",
        Test_drive_booking_amount: item?.test_drive_booking_amount || "NA",
        Remaining_amount: item?.remaining_amount || "NA",

        Vendor_code: item?.vendor_id?.vendor_code,
        Vendor_name: item?.vendor_id?.vendor_name,

        company_name: item?.vendor_id?.company_name,
        Vendor_gst_number: item?.vendor_id?.gst_number,
        Vendor_pan_number: item?.vendor_id?.pan_number,
        Vendor_mobile_number: item?.vendor_id?.mobile_number,
        Vendor_phone_number: item?.vendor_id?.phone_number,
        Vendor_status: item?.vendor_id?.status,
      }));
      exportToCsv(
        fieldsToExport,
        `BookingReport-${new Date(
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
        Bookings report
      </Text>
      <VStack
        maxW="container"
        borderRadius="5px"
        padding={"20px"}
        backgroundColor={"white"}
      >
        <Text w="full">
          Total Records Count : {totalBookings || bookings?.length || 0}
        </Text>
      </VStack>
      <br />
      <VStack
        borderRadius="5px"
        padding={"20px"}
        justifyContent={"flex-start"}
        backgroundColor={"white"}
      >
        <FormLabel w="full">Select Date Range : </FormLabel>
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
          <Text colorScheme={"blue"}>
            {reportDataLoading ? (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="blue.200"
                color="blue.800"
                size="md"
              />
            ) : (
              data?.length || 0
            )}{" "}
            Records found.
          </Text>
        )}
      </HStack>
    </Box>
  );
};

export default ReportBooking;
