import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import React, { useEffect, useRef, useState } from "react";

import { FiEdit3, FiTrash2 } from "react-icons/fi";
import {
  UpdateWebsiteData,
  getTools,
} from "../../../Redux/App/Actions/Admin/Website/Website.action";
import { useDispatch, useSelector } from "react-redux";

const initBrand = {
  image: "https://EasyCarsGo.com/assets/female-e7ffc77c.png",
  brand_name: "",
};

const BrandSection = () => {
  let { User_detail, token } = useSelector((store) => store?.UserAuthManager);
  const user =
    User_detail || JSON.parse(localStorage.getItem("user_detail_carvendor"));
  let admintoken =
    token || JSON.parse(localStorage.getItem("admin_token_carvendor"));

  const [formData, setFormData] = useState(initBrand);
  const [BrandData, setBrandData] = useState([]);

  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSubmit = (data, title) => {
    dispatch(UpdateWebsiteData(data, toast, title, getData, admintoken));
  };

  const handlebrands = () => {
    let temp = [];
    let title = "Updated Brand Successfully";
    if (isEdit) {
      BrandData.forEach((element) => {
        if (element._id === formData._id) {
          element = formData;
        }
        temp.push(element);
      });
      // setBrandData(temp)
      setIsEdit(false);
      title = "Updated Brand Successfully";
    } else {
      formData.image = formData.image || "";
      temp = [...BrandData, formData];
      title = "New Brand Added Successfully";
    }
    handleSubmit({ brands: temp }, title);
    setFormData(initBrand);
  };

  const handleDelete = (id) => {
    let data = BrandData;
    let filteredArray = data.filter((el) => id !== el._id);
    data = filteredArray;
    setBrandData(data);

    handleSubmit({ brands: filteredArray });
  };
  const getData = (e) => {
    dispatch(getTools("brands", setBrandData, admintoken));
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Box>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Text
          mb="2"
          p={"10px"}
          fontWeight={"500"}
          fontSize={{ base: "1rem", md: "1.5rem" }}
        >
          Brands
        </Text>
        <Flex gap={2} justifyContent={"space-between"} alignItems={"center"}>
          <Text
            mb="2"
            p={"10px"}
            fontWeight={"500"}
            fontSize={{ base: "1rem", md: "1.5rem" }}
          >
            Total: {BrandData?.length}{" "}
          </Text>
          <Button
            bg={"blue.400"}
            colorScheme={"blue"}
            variant={"solid"}
            onClick={() => {
              setFormData(initBrand);
              onOpen();
            }}
            leftIcon={<AddIcon />}
          >
            Add Brands
          </Button>
        </Flex>
      </Flex>
      <Flex
        p="5px"
        gap="10px"
        direction={{ base: "column", md: "row" }}
        overflow={"auto"}
        wrap={"wrap"}
      >
        {BrandData?.length > 0 &&
          BrandData?.map((el) => {
            return (
              <Card w={{ md: "24%" }} key={el._id}>
                <CardBody>
                  <Image
                    src={el.image}
                    alt={el.brand_name}
                    borderRadius="md"
                    height={"200px"}
                    width={"100%"}
                    objectFit={"cover"}
                    objectPosition={"center"}
                  />
                  <Stack mt="6" spacing="3">
                    <Text fontSize="1.4rem" fontWeight="600">
                      {el.brand_name}
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter justifyContent={"end"}>
                  <Button
                    onClick={() => {
                      setIsEdit(true);
                      onOpen();
                      setFormData(el);
                    }}
                    colorScheme={"blue"}
                    leftIcon={<FiEdit3 />}
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme={"red"}
                    onClick={() => {
                      handleDelete(el._id);
                    }}
                    mx={2}
                  >
                    <FiTrash2 />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
      </Flex>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEdit ? "Edit Brand" : "Add Brand"}</ModalHeader>
          <ModalCloseButton
            onClick={() => {
              setIsEdit(false);
              setFormData(initBrand);
            }}
          />
          <ModalBody>
            <Grid templateColumns="repeat(12, 1fr)" gap={"5"}>
              <GridItem py={"2"} as="div" colSpan={{ base: 12, md: 12 }}>
                <FormControl>
                  <FormLabel>Brand Name :</FormLabel>
                  <Input
                    value={formData?.brand_name}
                    onChange={(e) =>
                      setFormData({ ...formData, brand_name: e.target.value })
                    }
                    bg="white"
                    placeholder="Enter Author's name"
                  />
                </FormControl>
              </GridItem>
              {/* <GridItem py={"2"} as="div" colSpan={{ base: 12, md: 4 }}>
                <FormControl>
                  <FormLabel>Designation :</FormLabel>
                  <Input
                    value={formData?.designation}
                    onChange={(e) =>
                      setFormData({ ...formData, designation: e.target.value })
                    }
                    bg="white"
                    placeholder="Enter Destination"
                  />
                </FormControl>
              </GridItem>
              <GridItem py={"2"} as="div" colSpan={{ base: 12, md: 4 }}>
                <FormControl>
                  <FormLabel>Location :</FormLabel>
                  <Input
                    value={formData?.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    bg="white"
                    placeholder="Enter Location"
                  />
                </FormControl> 
              </GridItem>*/}

              <GridItem py={"2"} as="div" colSpan={{ base: 12, md: 12 }}>
                <FormControl borderRadius={"10px"}>
                  <FormLabel> Image Link :</FormLabel>
                  <Input
                    value={formData?.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    bg="white"
                    placeholder="Enter Image Link"
                  />
                  {/* <input
                    type="file"
                    accept="image/*"
                    name="download_link"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileUpload}
                  />
                  <Button
                    w="full"
                    colorScheme={isUploaded ? "green" : "blue"}
                    isLoading={loading}
                    loadingText="Uploading"
                    spinnerPlacement="start"
                    leftIcon={isUploaded ? <CheckIcon /> : <AddIcon />}
                    onClick={() => {
                      setloading(true);
                      fileInputRef.current.click();
                    }}
                  >
                    {filename}
                  </Button> */}
                </FormControl>
              </GridItem>
              {/* 
              <GridItem py={"2"} as="div" colSpan={{ base: 12, md: 8 }}>
                <FormControl>
                  <FormLabel>Description :</FormLabel>
                  <Textarea
                    value={formData?.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    bg="white"
                    placeholder="Enter Description"
                  />
                </FormControl>
              </GridItem> */}
            </Grid>
            <Button
              mb="5"
              onClick={() => {
                handlebrands();
                onClose();
              }}
              colorScheme="green"
            >
              Submit
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default BrandSection;
