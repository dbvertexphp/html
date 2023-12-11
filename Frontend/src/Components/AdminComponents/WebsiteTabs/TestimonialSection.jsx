import { AddIcon, CheckIcon } from "@chakra-ui/icons";
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

import { useDispatch, useSelector } from "react-redux";
import {
  UpdateWebsiteData,
  getTools,
} from "../../../Redux/App/Actions/Admin/Website/Website.action";

const initialTestimonial = {
  description: "",
  image: "https://EasyCarsGo.com/assets/female-e7ffc77c.png",
  author: "",
  designation: "",
  location: "",
};

const TestimonialSection = () => {
  let { User_detail, token } = useSelector((store) => store?.UserAuthManager);
  const user =
    User_detail || JSON.parse(localStorage.getItem("user_detail_carvendor"));
  let admintoken =
    token || JSON.parse(localStorage.getItem("admin_token_carvendor"));
  const [formData, setFormData] = useState(initialTestimonial);
  const [testimonialsData, setTestimonialsData] = useState([]);

  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSubmit = (data, title) => {
    dispatch(UpdateWebsiteData(data, toast, title, getData, admintoken));
  };

  const handleTestimonials = () => {
    let temp = [];
    let title = "Updated Successfully";
    if (isEdit) {
      testimonialsData.forEach((element) => {
        if (element._id === formData._id) {
          element = formData;
        }
        temp.push(element);
      });
      // setTestimonialsData(temp)
      setIsEdit(false);
      title = "Updated Testimonial Successfully";
    } else {
      formData.image = formData.image;
      temp = [...testimonialsData, formData];
      title = "New Testimonial Added Successfully";
    }
    handleSubmit({ testimonials: temp }, title);
    setFormData(initialTestimonial);
  };

  const handleDelete = (id) => {
    let data = testimonialsData;
    let filteredArray = data.filter((el) => id !== el._id);
    data = filteredArray;
    setTestimonialsData(data);

    handleSubmit({ testimonials: filteredArray });
  };
  const getData = (e) => {
    dispatch(getTools("testimonials", setTestimonialsData));
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
          Testimonials
        </Text>
        <Flex gap={2} justifyContent={"space-between"} alignItems={"center"}>
          <Text
            mb="2"
            p={"10px"}
            fontWeight={"500"}
            fontSize={{ base: "1rem", md: "1.5rem" }}
          >
            Total: {testimonialsData?.length}{" "}
          </Text>
          <Button
            bg={"#30829c"}
            colorScheme={"blue"}
            variant={"solid"}
            onClick={() => {
              setFormData(initialTestimonial);
              onOpen();
            }}
            leftIcon={<AddIcon />}
          >
            Add Testimonials
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
        {testimonialsData?.length > 0 &&
          testimonialsData?.map((el) => {
            return (
              <Card maxW="xs" w={"300px"} key={el._id}>
                <CardBody>
                  <Image
                    src={el.image}
                    alt={el.title}
                    borderRadius="md"
                    height={"80px"}
                    width={"80px"}
                  />
                  <Stack mt="6" spacing="3">
                    <Text fontSize="1.4rem" fontWeight="600">
                      {el.author}
                    </Text>
                    <Text noOfLines={3}>{el.description}</Text>

                    <Text fontSize="sm" py={0}>
                      Designation :{" "}
                      <span style={{ color: "blue", padding: "0px" }}>
                        {el.designation}
                      </span>
                    </Text>
                    <Text fontSize="sm" py={0}>
                      Location :{" "}
                      <span style={{ color: "blue", padding: "0px" }}>
                        {el.location}
                      </span>
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
          <ModalHeader>
            {isEdit ? "Edit Testimonial" : "Add Testimonial"}
          </ModalHeader>
          <ModalCloseButton
            onClick={() => {
              setIsEdit(false);
              setFormData(initialTestimonial);
            }}
          />
          <ModalBody>
            <Grid templateColumns="repeat(12, 1fr)" gap={"5"}>
              <GridItem py={"2"} as="div" colSpan={{ base: 12, md: 4 }}>
                <FormControl>
                  <FormLabel>Author :</FormLabel>
                  <Input
                    value={formData?.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    bg="white"
                    placeholder="Enter Author's name"
                  />
                </FormControl>
              </GridItem>
              <GridItem py={"2"} as="div" colSpan={{ base: 12, md: 4 }}>
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
              </GridItem>

              <GridItem py={"2"} as="div" colSpan={{ base: 12, md: 4 }}>
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
              </GridItem>
            </Grid>
            <Button
              mb="5"
              onClick={() => {
                handleTestimonials();

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

export default TestimonialSection;
