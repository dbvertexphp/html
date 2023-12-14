import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Skeleton,
  SkeletonText,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import React, { useState } from "react";
import {
  FiEdit3,
  FiPlus,
  FiPlusCircle,
  FiPlusSquare,
  FiX,
  FiXCircle,
} from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBodyTypes } from "../../../Redux/App/Actions/Admin/CarComponents/BodyType.action";
import { getCarModels } from "../../../Redux/App/Actions/Admin/CarComponents/CarModel.action";
import { getMakes } from "../../../Redux/App/Actions/Admin/CarComponents/Make.action";
import {
  UpdateCarByID,
  getCarByID,
  postCar,
} from "../../../Redux/App/Actions/Vendors/Car.action";
import { useEffect } from "react";
import InputUploadMultiple from "../../Extra/InputMultipleUpload";
import InputUpload from "../../Extra/InputUpload";

import DocumentModal from "../../Extra/DocumentModal";
import { IndianStates } from "../../../utils/IndianData";
import { ColorSelect } from "../../Extra/CustomSelect";
import { getLocations } from "../../../Redux/App/Actions/Admin/CarComponents/Location.action";
import { getColors } from "../../../Redux/App/Actions/Admin/CarComponents/Color.action";
import { getCarName } from "../../../Redux/App/Actions/Admin/CarComponents/CarName.action";
import {
  featureArray,
  documentsArray,
  safetyFeatureArray,
} from "../../../utils/CarFeatures";

const initial = {
  vendorID: "",
  name: "",
  cname: "",
  cmake: "",
  cmodel: "",
  ccolor: "",
  make: "",
  model: "",
  body_type: "",
  short_description: "",
  description: "",
  color: "",
  ownership: "",
  price: "",
  km_driven: "",
  primary_image: "",
  gallery_images: "",
  engine_displacment: "",
  engine_type: "",
  mileage: "",
  wheel_size: "",
  condition: "",
  transmission: "",
  seats: "",
  fuel_type: "",

  features: [],
  safety_features: [],

  location: [],
  VIN: "",
  warranty: "4",
  license_number: "",
  ownership_history: "",
  documents: [],
  regState: "",
  regYear: "",
};

{
  /*******todo <!----------------------------------------------- < Edit car > -----------------------------------------------> *************/
}

const EditCar = () => {
  let { Vendor_detail, token } = useSelector(
    (store) => store?.VendorAuthManager
  );
  const vendor =
    Vendor_detail ||
    JSON.parse(localStorage.getItem("vendor_detail_carvendor"));
  let vendortoken =
    token || JSON.parse(localStorage.getItem("vendor_token_carvendor"));

  const [OneCar, setOneCar] = useState(initial);
  let params = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [features, setfeatures] = useState([]);
  const [safetyFeatures, setSafetyFeatures] = useState([]);

  const [singleDocument, setSingleDocument] = useState({});
  const [refreshDocUpload, setRefreshDocUpload] = useState(false);

  const [selectedLocations, setSelectedLocations] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const {
    loading,
    error,
    allLocations,
    allColors,
    allMakes,
    allCarNames,
    allBodyTypes,
    allCarModels,
  } = useSelector((state) => state?.CarComponentManager);
  const { loading: CarUpdateLoading } = useSelector(
    (state) => state?.CarManager
  );
  const handleSubmit = (e) => {
    e.preventDefault();

    let data = OneCar;
    data.price = +data.price;
    data.km_driven = +data.km_driven;
    data.engine_displacment = +data.engine_displacment;
    data.wheel_size = +data.wheel_size;
    data.seats = +data.seats;
    data.mileage = +data.mileage;

    for (const key in data) {
      if (
        key === "VIN" ||
        key === "license_number" ||
        key === "ownership_history" ||
        key === "documents"
      ) {
        continue;
      }
      if (data[key] === "" || data[key] === null || data[key] === undefined) {
        return toast({
          title: `Please Enter ${key?.toLocaleUpperCase()}`,
          status: "error",
          position: "top",
          duration: 4000,
        });
      }
    }
    let title = "Updated car successfully";
    dispatch(UpdateCarByID(data._id, data, toast, getData, title, vendortoken));
  };

  const handleLocation = () => {
    let locat = document.getElementById("selectLocation")?.value;
    if (selectedLocations.includes(locat) || !locat) {
      return toast({
        position: "top",
        title: !locat ? "Please select a Location" : "Location Already Added",
        status: "info",
        duration: 4000,
        isClosable: true,
      });
    }
    if (locat == "all") {
      let aLocations = allLocations.map((el) => el._id);
      setSelectedLocations(aLocations);
      setOneCar({
        ...OneCar,
        location: aLocations,
      });
    } else {
      let newSelectedLocations = [...selectedLocations, locat];
      setSelectedLocations(newSelectedLocations);
      setOneCar({
        ...OneCar,
        location: newSelectedLocations,
      });
    }

    toast({
      position: "top",
      title: "Added to List",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  const handleAddDocument = () => {
    let isPresent = OneCar?.documents.find(
      (el) => el.label === singleDocument.label
    );

    if (isPresent)
      return toast({
        position: "top",
        title: "Alredy Added",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    setOneCar({ ...OneCar, documents: [...OneCar?.documents, singleDocument] });

    setSingleDocument({});
    setRefreshDocUpload((previous) => !previous);
  };

  const handeDeleteDocument = (label) => {
    let filtered = OneCar?.documents?.filter((el) => el.label !== label);
    setOneCar({ ...OneCar, documents: filtered });
    return toast({
      position: "top",
      title: "Document removed",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setOneCar((prevOneCar) => ({
      ...prevOneCar,
      [name]: value,
    }));
  };

  const handleSafetyFeatures = () => {
    let safe = document.getElementById("selectSafetyFeatures")?.value;
    if (safetyFeatures.includes(safe) || !safe) {
      return toast({
        position: "top",
        title: !safe
          ? "Please select a Safety feature"
          : "Safety feature Already Added",
        status: "info",
        duration: 4000,
        isClosable: true,
      });
    }
    let newsafearr = [...safetyFeatures, safe];
    setSafetyFeatures(newsafearr);
    setOneCar({
      ...OneCar,
      safety_features: newsafearr,
    });
    toast({
      position: "top",
      title: "Added to List",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  const handlefeatures = () => {
    let fea = document.getElementById("selectFeature")?.value;
    if (features.includes(fea) || !fea) {
      return toast({
        position: "top",
        title: !fea ? "Please select a Feature" : "Feature Already Added",
        status: "info",
        duration: 4000,
        isClosable: true,
      });
    }

    let newfeaarr = [...features, fea];
    setfeatures(newfeaarr);
    setOneCar({
      ...OneCar,
      features: newfeaarr,
    });
    toast({
      position: "top",
      title: "Added to List",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };
  const HandleUploadSomeImages = (images) => {
    setOneCar((prevOneCar) => ({
      ...prevOneCar,
      gallery_images: [...prevOneCar.gallery_images, ...images],
    }));
  };
  const DeleteImageFromForm = (image) => {
    let temp = OneCar?.gallery_images.filter((el) => el != image);
    setOneCar((prevOneCar) => ({
      ...prevOneCar,
      gallery_images: temp,
    }));
  };
  const SetOneCarDetails = (car) => {
    setOneCar(car);
    let locats = car?.location?.map((el) => el._id);
    setSelectedLocations(locats);
    setfeatures(car.features);
    setSafetyFeatures(car.safety_features);
  };
  const getData = () => {
    let id = params.id;
    dispatch(getCarByID(id, toast, SetOneCarDetails));
    dispatch(getBodyTypes());
    dispatch(getCarModels());
    dispatch(getMakes());
    dispatch(getLocations());
    dispatch(getColors());
    dispatch(getCarName());
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <Container
        as="form"
        maxW="container"
        // border="0.4px solid"
        borderRadius="5px"
        mb="10"
        padding={"15px"}
        onSubmit={handleSubmit}
      >
        <Text mb="2" fontWeight={"600"} fontSize="1.5rem">
          Edit Car Details
        </Text>

        {loading || CarUpdateLoading ? (
          <>
            <Skeleton h={"300px"} />
            <SkeletonText mt="10" noOfLines={"20"} />
          </>
        ) : (
          <Grid templateColumns="repeat(12, 1fr)">
            <GridItem
              as="div"
              colSpan={{ base: 12, md: 12 }}
              p="20px "
              borderRadius={"10px"}
              backgroundColor={"white"}
            >
              <Grid templateColumns="repeat(12, 1fr)">
                <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                  <FormLabel>
                    Select Brand <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Select
                    type="text"
                    name="make"
                    value={OneCar?.make?._id}
                    onChange={(e) => {
                      let x = e.target.value;
                      let el = allMakes.find((el) => el._id == x);
                      setOneCar((prev) => {
                        return { ...prev, cmake: el?.name, make: el?._id };
                      });
                    }}
                  >
                    <option value="">Select brand</option>
                    {allMakes?.length > 0 &&
                      allMakes?.map((item) => {
                        return (
                          <option key={item?._id} value={item?._id}>
                            {item?.name}
                          </option>
                        );
                      })}
                  </Select>
                </GridItem>

                <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                  <FormLabel>
                    Select Model <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Select
                    type="text"
                    name="model"
                    value={OneCar?.model?._id}
                    onChange={(e) => {
                      let x = e.target.value;
                      let el = allCarModels.find((el) => el._id == x);

                      setOneCar((prev) => {
                        return { ...prev, cmodel: el?.name, model: el?._id };
                      });
                    }}
                  >
                    <option value="">Select model</option>
                    {allCarModels?.length > 0 &&
                      allCarModels
                        ?.filter(
                          (el) =>
                            el.make_id === OneCar?.make ||
                            el.make_id === OneCar?.make?._id
                        )
                        .map((item) => {
                          return (
                            <option key={item._id + "sadfsad"} value={item._id}>
                              {item?.name}
                            </option>
                          );
                        })}
                  </Select>
                </GridItem>

                <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                  <FormLabel>
                    Select Car Name <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Select
                    type="text"
                    name="name"
                    value={OneCar?.name?._id}
                    onChange={(e) => {
                      let x = e.target.value;
                      let el = allCarNames?.find((el) => el._id == x);
                      setOneCar((prev) => {
                        return { ...prev, cname: el?.name, name: el?._id };
                      });
                    }}
                  >
                    <option value="">Select Car Name</option>
                    {allCarNames?.length > 0 &&
                      allCarNames
                        ?.filter(
                          (el) =>
                            el.make_id == OneCar?.make ||
                            el.make_id === OneCar?.make?._id
                        )
                        ?.map((item) => {
                          return (
                            <option
                              key={item._id + "sadfsad"}
                              value={item?._id}
                            >
                              {item?.name}
                            </option>
                          );
                        })}
                  </Select>
                </GridItem>

                <GridItem as="div" colSpan={{ base: 12, md: 3 }} p="10px">
                  <FormLabel>Primary Image</FormLabel>
                  <InputUpload
                    isRequired={true}
                    color={"gray"}
                    acceptData="image/*"
                    HandleUploadSomeImages={(image) => {
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        primary_image: image,
                      }));
                    }}
                    border={"3px dotted gray"}
                    UploadText={"Upload Primary image"}
                  />
                </GridItem>

                <GridItem as="div" colSpan={{ base: 12, md: 9 }} p="10px">
                  <FormLabel>Gallery Image</FormLabel>
                  <InputUploadMultiple
                    isRequired={true}
                    acceptData="image/*"
                    HandleUploadSomeImages={HandleUploadSomeImages}
                    UploadText={"Upload Gallery Images"}
                  />
                </GridItem>

                {OneCar?.primary_image && (
                  <GridItem as="div" colSpan={{ base: 12, md: 3 }} px="10px">
                    <Flex
                      flexDirection={"column"}
                      alignItems={"center"}
                      justifyContent={"start"}
                      bg={"gray.50"}
                      borderRadius={"5px"}
                      p="5px"
                      border={"1px solid #ddd"}
                    >
                      <Image
                        mt={5}
                        mx={1}
                        src={OneCar?.primary_image}
                        alt="carimage"
                        w={"200px"}
                        h={"150px"}
                        objectPosition={"center"}
                        objectFit={"cover"}
                        border={"1px solid #ddd"}
                      />
                      <Flex
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        p={"2"}
                      >
                        <Text px={2}>Primary</Text>
                        <Button
                          size={"xs"}
                          bg={"white"}
                          onClick={() =>
                            setOneCar({ ...OneCar, primary_image: "" })
                          }
                        >
                          <FiXCircle />
                        </Button>
                      </Flex>
                    </Flex>
                  </GridItem>
                )}

                {OneCar?.gallery_images?.length > 0 && (
                  <GridItem as="div" colSpan={{ base: 12, md: 9 }} px="10px">
                    <Flex
                      bg={"gray.50"}
                      borderRadius={"5px"}
                      p="5px"
                      overflowX={"auto"}
                      width={"full"}
                      border={"1px solid #ddd"}
                    >
                      {OneCar?.gallery_images?.length > 0 &&
                        OneCar?.gallery_images?.map((el, index) => {
                          return (
                            <Flex
                              key={index + "sdjfhasdkjfyr"}
                              flexDirection={"column"}
                              alignItems={"center"}
                              justifyContent={"start"}
                            >
                              <Image
                                mt={5}
                                mx={1}
                                src={el}
                                alt="carimage"
                                minW={"200px"}
                                h={"150px"}
                                objectPosition={"center"}
                                objectFit={"cover"}
                                border={"1px solid #ddd"}
                              />
                              <Flex
                                alignItems={"center"}
                                justifyContent={"space-between"}
                                p={"2"}
                              >
                                <Button
                                  size={"xs"}
                                  bg={"white"}
                                  onClick={() => DeleteImageFromForm(el)}
                                >
                                  <FiXCircle />
                                </Button>
                              </Flex>
                            </Flex>
                          );
                        })}
                    </Flex>
                  </GridItem>
                )}

                <GridItem as="div" colSpan={{ base: 12, md: 12 }} p="10px">
                  <FormLabel>
                    Add Short Description{" "}
                    <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Input
                    isRequired={true}
                    placeholder="Enter Short Description"
                    type="text"
                    name="short_description"
                    value={OneCar?.short_description}
                    onChange={handleDetailsChange}
                  />
                </GridItem>
                <GridItem as="div" colSpan={{ base: 12, md: 12 }} p="10px">
                  <FormLabel>
                    {" "}
                    Add Long Description <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Textarea
                    placeholder="Enter Description"
                    type="text"
                    name="description"
                    value={OneCar?.description || ""}
                    onChange={handleDetailsChange}
                  />
                </GridItem>

                <GridItem as="div" colSpan={{ base: 12, md: 3 }} p="10px">
                  <FormLabel>
                    Select Body Type <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Select
                    type="text"
                    name="body_type"
                    value={OneCar?.body_type?.name || ""}
                    onChange={handleDetailsChange}
                  >
                    <option value="">
                      {OneCar?.body_type?.name || "Select Body type"}
                    </option>
                    {allBodyTypes?.length > 0 &&
                      allBodyTypes?.map((item) => {
                        return (
                          <option key={item?._id} value={item._id}>
                            {item?.name}
                          </option>
                        );
                      })}
                  </Select>
                </GridItem>

                <GridItem as="div" colSpan={{ base: 12, md: 3 }} p="10px">
                  <FormLabel>
                    Enter Year <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Input
                    isRequired={true}
                    placeholder="Enter Year"
                    type="month"
                    name="regYear"
                    value={OneCar?.regYear || ""}
                    onChange={handleDetailsChange}
                  />
                </GridItem>

                <GridItem as="div" colSpan={{ base: 12, md: 3 }} p="10px">
                  <FormLabel>
                    Choose Primary Color <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <ColorSelect
                    HandleChange={handleDetailsChange}
                    name="color"
                    defaultValue={OneCar?.ccolor}
                    colors={allColors}
                  />
                </GridItem>

                <GridItem as="div" colSpan={{ base: 12, md: 3 }} p="10px">
                  <FormLabel>
                    Choose Ownership <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Select
                    type="text"
                    name="ownership"
                    value={OneCar?.ownership || ""}
                    onChange={handleDetailsChange}
                  >
                    <option value="">Select ownership-</option>
                    <option value="First">First</option>
                    <option value="Second">Second</option>
                    <option value="third">third</option>
                  </Select>
                </GridItem>

                <GridItem as="div" colSpan={{ base: 12, md: 3 }} p="10px">
                  <FormLabel>
                    Enter Total Driven(km) :{" "}
                    <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Input
                    isRequired={true}
                    placeholder="Enter Distance travelled"
                    type="number"
                    name="km_driven"
                    value={OneCar?.km_driven || ""}
                    onChange={handleDetailsChange}
                  />
                </GridItem>

                <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                  <FormLabel>
                    Enter Register State <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Select
                    type="text"
                    name="regState"
                    value={OneCar?.regState?.state_name}
                    placeholder={
                      OneCar?.regState?.state_name ||
                      "Enter the State of register"
                    }
                    onChange={handleDetailsChange}
                  >
                    {IndianStates.map((el) => {
                      return <option key={el}>{el}</option>;
                    })}{" "}
                  </Select>
                </GridItem>

                <GridItem as="div" colSpan={{ base: 12, md: 3 }} p="10px">
                  <FormLabel>
                    Enter Price : <span style={{ color: "red" }}>*</span>
                  </FormLabel>

                  <InputGroup>
                    <InputLeftAddon children="₹" />
                    <Input
                      isRequired={true}
                      placeholder="Enter Price"
                      type="text"
                      name="price"
                      value={OneCar?.price || ""}
                      onChange={handleDetailsChange}
                    />
                  </InputGroup>
                </GridItem>
              </Grid>
            </GridItem>

            <GridItem as="div" colSpan={{ base: 6, md: 12 }} p="10px">
              <Text mb="2" fontWeight={"500"} fontSize="1.5rem">
                Additional Details :
              </Text>
            </GridItem>

            <GridItem
              as="div"
              colSpan={{ base: 12, md: 12 }}
              p="20px "
              borderRadius={"10px"}
              backgroundColor={"white"}
            >
              <Grid templateColumns="repeat(12, 1fr)">
                <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                  <FormLabel>
                    Engine Displacement <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <InputGroup>
                    <Input
                      isRequired={true}
                      placeholder=""
                      type="text"
                      name="engine_displacment"
                      value={OneCar?.engine_displacment}
                      onChange={handleDetailsChange}
                    />
                    <InputRightAddon children="cc" />
                  </InputGroup>
                </GridItem>

                <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                  <FormLabel>
                    Select Engine Type <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Select
                    type="text"
                    name="engine_type"
                    value={OneCar?.engine_type}
                    onChange={handleDetailsChange}
                  >
                    <option value="">Select type</option>
                    <option value="Inline-4">Inline-4</option>
                    <option value="V8">V8</option>
                    <option value="V6">V6</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric</option>
                    <option value="SuperCharged">SuperCharged</option>
                    <option value="TurboCharged">TurboCharged</option>
                    <option value="Diseal">Diseal</option>
                    <option value="Mid-Hybrid">Mid-Hybrid</option>
                    <option value="Rotary">Rotary</option>
                  </Select>
                </GridItem>

                <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                  <FormLabel>
                    Enter Mileage <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <InputGroup>
                    <Input
                      isRequired={true}
                      placeholder="in km"
                      type="text"
                      name="mileage"
                      value={OneCar?.mileage}
                      onChange={handleDetailsChange}
                    />
                    <InputRightAddon children="Km/L" />
                  </InputGroup>
                </GridItem>

                <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                  <FormLabel>
                    Enter Wheel Size <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <InputGroup>
                    <Input
                      isRequired={true}
                      placeholder="in inches"
                      type="text"
                      name="wheel_size"
                      value={OneCar?.wheel_size || ""}
                      onChange={handleDetailsChange}
                    />
                    <InputRightAddon children="in" />
                  </InputGroup>
                </GridItem>

                <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                  <FormLabel>
                    Select Condition <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Select
                    type="text"
                    name="condition"
                    value={OneCar?.condition}
                    onChange={handleDetailsChange}
                  >
                    <option value="">Select condition</option>
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                    <option value="Like New">Like New</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Refurbished">Refurbished</option>
                    <option value="Damaged">Damaged</option>
                    <option value="Open Box">Open Box</option>
                    <option value="Salvage">Salvage</option>
                    <option value="Antique Vintage">Antique/Vintage</option>
                    <option value="Collectible">Collectible</option>
                  </Select>
                </GridItem>
                <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                  <FormLabel>
                    Select Transmission <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Select
                    type="text"
                    name="transmission"
                    value={OneCar?.transmission}
                    onChange={handleDetailsChange}
                  >
                    <option value="">Select transmission</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                    <option value="Continuously Variable Valve Transmission (CVVT)">
                      Continuously Variable Valve Transmission (CVVT)
                    </option>
                    <option value="DirectShift Gearbox">
                      DirectShift Gearbox (DSG)
                    </option>
                    <option value="Tiptronic">Tiptronic</option>
                    <option value="Automated Manual Transmission">
                      Automated Manual Transmission (AMT)
                    </option>
                    <option value="Auto Transmission">
                      Auto Transmission (AT)
                    </option>
                  </Select>
                </GridItem>

                <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                  <FormLabel>
                    Enter No. of Seats <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Input
                    isRequired={true}
                    placeholder="Enter numbers"
                    type="number"
                    name="seats"
                    value={OneCar?.seats || ""}
                    onChange={handleDetailsChange}
                  />
                </GridItem>

                <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                  <FormLabel>
                    Choose Fuel Type <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Select
                    type="text"
                    name="fuel_type"
                    value={OneCar?.fuel_type || ""}
                    onChange={handleDetailsChange}
                  >
                    <option value="">Select fuel type-</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="CNG">Compressed Natural Gas (CNG)</option>
                    <option value="LPG">Liquefied Petroleum Gas (LPG)</option>
                  </Select>
                </GridItem>
              </Grid>
            </GridItem>

            <GridItem as="div" colSpan={{ base: 6, md: 12 }} p="10px">
              <Text mb="2" fontWeight={"500"} fontSize="1.5rem">
                Feature Details :
              </Text>
            </GridItem>

            <GridItem
              as="div"
              colSpan={{ base: 12, md: 12 }}
              p="20px "
              borderRadius={"10px"}
              backgroundColor={"white"}
            >
              <Grid templateColumns="repeat(12, 1fr)">
                <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="10px">
                  <FormLabel>
                    Select Features <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Flex w={"100%"} gap={3} my={1} borderRadius={"5px"}>
                    <Select id="selectFeature">
                      {featureArray.map((el) => {
                        return (
                          <option key={el.value} value={el.value}>
                            {el.label}
                          </option>
                        );
                      })}
                    </Select>
                    <Button
                    bg="#30829c"
                      leftIcon={<FiPlusSquare />}
                      colorScheme="blue"
                      onClick={handlefeatures}
                    >
                      Add
                    </Button>
                  </Flex>
                  {features.length > 0 && (
                    <Flex
                      w={"100%"}
                      wrap={"wrap"}
                      gap={3}
                      bg={"#f2ffe6"}
                      p="2"
                      my={3}
                      borderRadius={"5px"}
                      border={"1px solid #ddd"}
                    >
                      {features.map((item, index) => {
                        return (
                          <Button
                            key={item + "dsfdsfsdf"}
                            variant={"ghost"}
                            border={"1px solid #ddd"}
                            borderRadius={"30px"}
                            size={"sm"}
                            color={"black"}
                            bg={"white"}
                            rightIcon={<FiX />}
                            onClick={() => {
                              let subs = features.filter((el) => item !== el);
                              setfeatures(subs);
                            }}
                          >
                            {item}
                          </Button>
                        );
                      })}
                    </Flex>
                  )}
                </GridItem>

                <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="10px">
                  <FormLabel>
                    Select Safety Features{" "}
                    <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Flex w={"100%"} gap={3} my={1} borderRadius={"5px"}>
                    <Select id="selectSafetyFeatures">
                      {safetyFeatureArray.map((el) => {
                        return (
                          <option key={el.value} value={el.value}>
                            {el.label}
                          </option>
                        );
                      })}
                    </Select>
                    <Button
                     bg="#30829c"
                      leftIcon={<FiPlusSquare />}
                      colorScheme="blue"
                      onClick={handleSafetyFeatures}
                    >
                      Add
                    </Button>
                  </Flex>
                  {safetyFeatures.length > 0 && (
                    <Flex
                      w={"100%"}
                      wrap={"wrap"}
                      gap={3}
                      bg={"#f2ffe6"}
                      p="2"
                      my={3}
                      borderRadius={"5px"}
                      border={"1px solid #ddd"}
                    >
                      {safetyFeatures.map((item, index) => {
                        return (
                          <Button
                            key={item + "2343fdsd"}
                            variant={"ghost"}
                            border={"1px solid #ddd"}
                            borderRadius={"30px"}
                            size={"sm"}
                            color={"black"}
                            bg={"white"}
                            rightIcon={<FiX />}
                            onClick={() => {
                              let subs = safetyFeatures.filter(
                                (el) => item !== el
                              );
                              setSafetyFeatures(subs);
                            }}
                          >
                            {item}
                          </Button>
                        );
                      })}
                    </Flex>
                  )}
                </GridItem>
              </Grid>
            </GridItem>

            <GridItem as="div" colSpan={{ base: 6, md: 12 }} p="10px">
              <Text mb="2" fontWeight={"500"} fontSize="1.5rem">
                Other Details :
              </Text>
            </GridItem>

            <GridItem
              as="div"
              colSpan={{ base: 12, md: 12 }}
              p="20px "
              borderRadius={"10px"}
              backgroundColor={"white"}
            >
              <Grid templateColumns="repeat(12, 1fr)">
                <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                  <FormControl
                  // isInvalid={OneCar?.VIN?.length !== 17 && Onecar?.VIN?.length > 0}
                  >
                    <FormLabel>VIN (optional) </FormLabel>
                    <Input
                      isRequired={true}
                      placeholder="Enter VIN"
                      type="number"
                      name="VIN"
                      value={OneCar?.VIN}
                      onChange={handleDetailsChange}
                    />
                    {OneCar?.VIN?.length !== 17 && (
                      <FormErrorMessage>Enter 17 digit VIN</FormErrorMessage>
                    )}
                  </FormControl>
                </GridItem>

                <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                  <FormLabel>License Number (optional) </FormLabel>
                  <Input
                    isRequired={true}
                    placeholder="Enter License"
                    type="text"
                    name="license_number"
                    value={OneCar?.license_number}
                    onChange={handleDetailsChange}
                  />
                </GridItem>

                {/* <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
                <FormLabel>Enter Quantity</FormLabel>
                <Input
                  isRequired={true}
                  placeholder="Enter Quantity"
                  type="number"
                  name="quantity"
                  value={OneCar?.quantity}
                  onChange={handleDetailsChange}
                />
              </GridItem> */}

                <GridItem as="div" colSpan={{ base: 12, md: 12 }} p="10px">
                  <FormControl>
                    <FormLabel>Car Documents (optional) </FormLabel>
                    <Flex gap="3">
                      <Select
                        width={"70%"}
                        onChange={(e) => {
                          setSingleDocument({
                            ...singleDocument,
                            label: e.target.value,
                          });
                          OneCar?.documents.find(
                            (el) => e.target.value === el.label
                          )
                            ? toast({
                                position: "top",
                                title: "Alredy Added",
                                status: "warning",
                                duration: 4000,
                                isClosable: true,
                              })
                            : "";
                        }}
                      >
                        <option value="">Select Document Type</option>
                        {documentsArray?.length &&
                          documentsArray?.map((el) => {
                            return (
                              <option key={el} value={el}>
                                {el}
                              </option>
                            );
                          })}
                      </Select>
                      {!OneCar?.documents.find(
                        (el) => singleDocument.label === el.label
                      ) && (
                        <InputUpload
                          refresh={refreshDocUpload}
                          accept={"application/pdf"}
                          HandleUploadSomeImages={(doc) =>
                            setSingleDocument({ ...singleDocument, doc: doc })
                          }
                        />
                      )}
                      <Button
                       bg="#30829c"
                        leftIcon={<FiPlusSquare />}
                        colorScheme={"blue"}
                        onClick={handleAddDocument}
                        isDisabled={OneCar?.documents.find(
                          (el) => singleDocument.label === el.label
                        )}
                      >
                        Add
                      </Button>
                    </Flex>
                  </FormControl>
                </GridItem>

                <GridItem as="div" colSpan={{ base: 12, md: 12 }} py="10px">
                  <Flex gap={"3"} overflowX={"auto"} width={"full"}>
                    {OneCar?.documents?.length > 0 &&
                      OneCar?.documents?.map((el, index) => {
                        return (
                          <Flex
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            p={"2"}
                            key={el?.label + index}
                          >
                            <Button
                              onClick={onOpen}
                              borderTopRightRadius={"0px"}
                              borderBottomRightRadius={"0px"}
                              fontWeight={"600"}
                            >
                              {el.label}
                            </Button>
                            <Button
                              colorScheme="red"
                              borderTopLeftRadius={"0px"}
                              borderBottomLeftRadius={"0px"}
                              onClick={() => handeDeleteDocument(el.label)}
                            >
                              <FiXCircle />
                            </Button>
                            <DocumentModal
                              isOpen={isOpen}
                              onClose={onClose}
                              name={el.label}
                              doc={el.doc}
                            />
                          </Flex>
                        );
                      })}
                  </Flex>
                </GridItem>

                <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="10px">
                  <FormLabel>
                    Select Location <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Flex w={"100%"} gap={3} my={1} borderRadius={"5px"}>
                    <Select id="selectLocation">
                      <option value="">Select Location</option>
                      <option value="all">Select all</option>
                      {allLocations?.length &&
                        allLocations?.map((el) => {
                          return (
                            <option key={el._id} value={el._id}>
                              {el?.name}
                            </option>
                          );
                        })}
                    </Select>
                    <Button
                     bg="#30829c"
                      leftIcon={<FiPlusSquare />}
                      colorScheme={"blue"}
                      onClick={handleLocation}
                    >
                      Add
                    </Button>
                  </Flex>
                  {selectedLocations.length > 0 && (
                    <Flex
                      w={"100%"}
                      wrap={"wrap"}
                      gap={3}
                      bg={"#f2ffe6"}
                      p="2"
                      my={3}
                      borderRadius={"5px"}
                      border={"1px solid #ddd"}
                    >
                      {selectedLocations.map((item, index) => {
                        return (
                          <Button
                            key={item + "sdfdsplpk"}
                            variant={"ghost"}
                            border={"1px solid #ddd"}
                            borderRadius={"30px"}
                            size={"sm"}
                            color={"black"}
                            bg={"white"}
                            rightIcon={<FiX />}
                            onClick={() => {
                              let subs = selectedLocations.filter(
                                (el) => item !== el
                              );
                              setSelectedLocations(subs);
                            }}
                          >
                            {item?.name}
                            {allLocations.find((el) => item == el?._id)?.name}
                          </Button>
                        );
                      })}
                    </Flex>
                  )}
                </GridItem>

                <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="10px">
                  <FormLabel>Enter Ownership history (optional)</FormLabel>
                  <Textarea
                    isRequired={true}
                    placeholder="Enter Ownership History"
                    type="text"
                    name="ownership_history"
                    value={OneCar?.ownership_history}
                    onChange={handleDetailsChange}
                  />
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
        )}
        <Flex gap={1} justifyContent={"end"} my={"15px"}>
          <Link to="/vendor/cars">
            <Button colorScheme="gray" my="10px">
              Cancel
            </Button>
          </Link>
          <Button
           bg="#30829c"
            colorScheme="blue"
            m="10px"
            type="submit"
            rightIcon={<FiEdit3 />}
            onClick={handleSubmit}
            isLoading={CarUpdateLoading}
          >
            Update Car
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default EditCar;
