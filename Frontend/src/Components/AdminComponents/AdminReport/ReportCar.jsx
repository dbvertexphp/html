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
import { getCarReport } from "../../../Redux/App/Actions/Admin/Report.action";
import Papa from "papaparse";
import {
  getAllCars,
  getCars,
} from "../../../Redux/App/Actions/Vendors/Car.action";
import { extractDateAndTime } from "../../../utils/DatesFunctions";
import {
  getVendorNames,
  getVendors,
} from "../../../Redux/App/Actions/Vendor.action";

const ReportCar = () => {
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
  const [vendorID, setvendorID] = useState("");
  const [cars, setcars] = useState([]);
  const [totalCars, settotalCars] = useState(0);

  const setCarsData = (data) => {
    setcars(data?.Cars);
    settotalCars(data?.totalCars);
  };

  const dispatch = useDispatch();
  const { loading, error } = useSelector((store) => store?.CarManager);
  const { vendors } = useSelector((store) => store?.VendorManager);
  const [exportLoading, setexportLoading] = useState(false);
  const { loading: reportDataLoading, error: reportDataError } = useSelector(
    (store) => store?.ReportManager
  );

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    dispatch(getAllCars(setCarsData));
    dispatch(getVendorNames(() => "", admintoken));
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
        if (vendorID) params.vendorID = vendorID;
        dispatch(getCarReport(params, setData, admintoken));
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
    setexportLoading(false);
  };

  const handleExport = () => {
    setexportLoading(true);
    if (data?.length > 0) {
      const rawData = data;
      const fieldsToExport = rawData.map((item) => ({
        Car_Brand: item?.cmake || "NA",
        Car_Model: item?.cmodel || "NA",
        Car_Name: item?.cname || "NA",
        Car_Color: item?.ccolor || "NA",
        Car_Body_type: item?.cbody_type || "NA",
        Car_Vendor_ID: item?.vendorID?.vendor_code || "NA",
        Car_Vendor_Name: item?.vendorID?.vendor_name || "NA",
        Price: item?.price || "NA",
        Created_At: extractDateAndTime(item.createdAt)?.date,
        Registration_Year: item?.regYear || "NA",
        Registration_State_Name: item?.regState.state_name || "NA",
        Registration_State_Code: item?.regState.state_code || "NA",
        location: item?.location?.map((el) => el.name)?.join(",") || "NA",
        most_viewed: item?.most_viewed || "NA",
        booking_status: item?.booking_status || "NA",
        payment_status: item?.payment_status || "NA",
        engine_type: item?.engine_type || "NA",
        mileage: item?.mileage || "NA",
        condition: item?.condition || "NA",
        transmission: item?.transmission || "NA",
        fuel_type: item?.fuel_type || "NA",
        engine_displacment: item?.engine_displacment || "NA",
        license_number: item?.license_number || "NA",
        features: item?.features?.join(",") || "NA",
        safety_features: item?.safety_features?.join(",") || "NA",
        options: item?.options || "NA",
        VIN: item?.VIN || "NA",
        ownership_history: item?.ownership_history || "NA",
        warranty: item?.warranty || "NA",
        license_plate: item?.license_plate || "NA",
        short_description: item?.short_description || "NA",
        description: item?.description || "NA",
        Documents: item.documents.map((el) => el.label).join(",") || "NA",
        ownership: item?.ownership || "NA",
        km_driven: item?.km_driven || "NA",
        seats: item?.seats || "NA",
        images: item?.images?.join(",") || "NA",
        wheel_size: item?.wheel_size || "NA",
        status: item?.status || "NA",
        featured_car: item?.featured_car == 1 ? "Yes" : "No" || "NA",
        trending_car: item?.trending_car == 1 ? "Yes" : "No" || "NA",
        upcoming_car: item?.upcoming_car == 1 ? "Yes" : "No" || "NA",
        hotdeal_car: item?.hotdeal_car == 1 ? "Yes" : "No" || "NA",
      }));
      exportToCsv(
        fieldsToExport,
        `CarReport-${new Date(
          dateSelectValue?.startDate
        ).toLocaleDateString()}-${new Date(
          dateSelectValue?.endDate
        ).toLocaleDateString()}`
      );
    } else {
      setexportLoading(false);
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
        Car report
      </Text>
      <VStack
        maxW="container"
        // border="0.4px solid"
        borderRadius="5px"
        padding={"20px"}
        backgroundColor={"white"}
      >
        <Text w="full">
          Total Records Count : {totalCars || cars?.length || 0}
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
        <br />
        <FormLabel w={"full"}>Select Vendor :</FormLabel>
        <HStack w={"full"}>
          <HStack>
            <Select
              size={"sm"}
              w={"410px"}
              backgroundColor={"white"}
              onChange={(e) => {
                setvendorID(e.target.value);
              }}
            >
              <option value="">Select All</option>
              {vendors.map((el) => {
                return (
                  <option key={el._id} value={el._id}>
                    {el.vendor_name}
                  </option>
                );
              })}
            </Select>
          </HStack>
        </HStack>
      </VStack>
      <HStack>
        <Button
          onClick={handleDateSelector}
          colorScheme="blue"
          variant="solid"
          isLoading={reportDataLoading || loading}
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
          isLoading={exportLoading}
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

export default ReportCar;
