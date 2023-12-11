import {
  Box,
  Button,
  GridItem,
  Grid,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  Image,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import avatar from "../../assets/car1.jpg";
import React from "react";
import { FiEye } from "react-icons/fi";

import DocumentModal from "../Extra/DocumentModal";
import { extractDateAndTime } from "../../utils/DatesFunctions";

const ViewSingleCarModal = ({
  ViewSingleCar,
  isViewOpen,
  onViewClose,
  isViewLoading,
  setViewSingleCar,
  onDocOpen,
  isDocOpen,
  onDocClose,
}) => {
  return (
    <>
      {/**<!--*------- <View Single Car Modal> ----------->*/}

      <Modal size={"6xl"} isOpen={isViewOpen} onClose={onViewClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"1.5rem"}>Car Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isViewLoading ? (
              <>
                <Skeleton h={"300px"} p={5} />
                <SkeletonText mt="10" noOfLines={"20"} />
              </>
            ) : (
              <>
                <Flex gap={2} width={"100%"}>
                  <Box mb={2} width={"40%"} border={"none"}>
                    <Text>
                      <b>Name :</b> {ViewSingleCar?.name?.name}
                    </Text>

                    <Text>
                      <b>Make :</b>{" "}
                      {ViewSingleCar?.make?.name || "Not Provided"}
                    </Text>
                    <Text>
                      <b>Model :</b>{" "}
                      {ViewSingleCar?.model?.name || "Not Provided"}
                    </Text>
                    <Text>
                      <b>Year :</b> {ViewSingleCar?.year || "Not Provided"}
                    </Text>
                    <Text>
                      <b>Body Type :</b> <b>{ViewSingleCar?.body_type?.name}</b>
                    </Text>
                    <Text>
                      <b>Engine : </b>{" "}
                      {ViewSingleCar?.engine_type || "Not Provided"}
                    </Text>
                    <Text>
                      <b>Mileage : </b> {ViewSingleCar?.mileage}
                    </Text>
                    <Text>
                      <b>Condition : </b> {ViewSingleCar?.condition} ,{" "}
                    </Text>
                    <Text>
                      <b>Transmission : </b> {ViewSingleCar?.transmission}
                    </Text>
                    <Text>
                      <b>Created Date : </b>{" "}
                      {extractDateAndTime(ViewSingleCar?.createdAt)?.date}{" "}
                      {extractDateAndTime(ViewSingleCar?.createdAt)?.time}
                    </Text>
                  </Box>
                  <Box mb={2} width={"40%"} border={"none"}>
                    <Text>
                      <b>Fuel Type :</b>{" "}
                      {ViewSingleCar?.fuel_type || "Not Provided"}
                    </Text>

                    <Text>
                      <b>Color:</b> {ViewSingleCar?.color?.name || "Inactive"}
                    </Text>
                    <Text>
                      <b>VIN :</b> {ViewSingleCar?.VIN || "Not Provided"}
                    </Text>
                    <Text>
                      <b>location : </b>{" "}
                      {(ViewSingleCar?.location?.length > 0 &&
                        ViewSingleCar?.location[0]?.name) ||
                        "Not Provided"}
                    </Text>
                    <Text>
                      <b>features :</b>{" "}
                      {ViewSingleCar?.features?.join(" , ") || "Not Provided"}
                    </Text>
                    <Text>
                      <b>Wheel size : </b>{" "}
                      {ViewSingleCar?.wheel_size || "Not Provided"}
                    </Text>
                    <Text>
                      <b>Last Updated Date : </b>{" "}
                      {extractDateAndTime(ViewSingleCar?.updatedAt)?.date}{" "}
                      {extractDateAndTime(ViewSingleCar?.updatedAt)?.time}
                    </Text>
                  </Box>
                  <Box width={"20%"}>
                    <Image
                      alt="student-image"
                      m={"auto"}
                      width={"250px"}
                      height={"160px"}
                      objectFit={"cover"}
                      objectPosition={"center"}
                      src={
                        ViewSingleCar?.primary_image
                          ? ViewSingleCar?.primary_image
                          : avatar
                      }
                    />
                  </Box>
                </Flex>
                <Grid templateColumns="repeat(12, 1fr)">
                  <GridItem
                    as="div"
                    colSpan={{ base: 12, md: 12 }}
                    bg={"gray.50"}
                    p={2}
                  >
                    <Text pt={2}>
                      {" "}
                      <b>Gallery</b>
                    </Text>
                    <Flex overflow={"auto"} gap={3} py={3}>
                      {ViewSingleCar?.gallery_images?.length > 0 &&
                        ViewSingleCar?.gallery_images?.map((el) => {
                          return (
                            <Image
                              key={el}
                              src={el}
                              borderRadius={"5px"}
                              h="150px"
                              objectFit={"cover"}
                              objectPosition={"center"}
                              w="150px"
                            />
                          );
                        })}
                    </Flex>
                  </GridItem>
                  <GridItem as="div" colSpan={{ base: 12, md: 12 }}>
                    <b> Short Description</b>
                    <Text>{ViewSingleCar?.short_description || "null"}</Text>
                  </GridItem>
                  <GridItem as="div" colSpan={{ base: 12, md: 12 }}>
                    <b> Long Description</b>
                    <Text>{ViewSingleCar?.description || "null"}</Text>
                  </GridItem>
                </Grid>
                <b style={{ margin: "4px 2px" }}>Documents</b>
                <Grid templateColumns="repeat(12, 1fr)" my={3}>
                  {ViewSingleCar?.documents?.length > 0 &&
                    ViewSingleCar?.documents?.map((el) => {
                      return (
                        <GridItem
                          key={el.id}
                          as="div"
                          m={"auto"}
                          colSpan={{ base: 6, md: 4 }}
                        >
                          <Flex
                            key={el.id}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            p={"2"}
                          >
                            <Button
                              key={el.id}
                              onClick={onDocOpen}
                              borderTopRightRadius={"0px"}
                              borderBottomRightRadius={"0px"}
                              fontWeight={"600"}
                            >
                              {el.label}
                            </Button>
                            <Button
                              key={el.id}
                              colorScheme="red"
                              borderTopLeftRadius={"0px"}
                              borderBottomLeftRadius={"0px"}
                            >
                              <FiEye />
                            </Button>
                            <DocumentModal
                              key={el.id}
                              isOpen={isDocOpen}
                              onClose={onDocClose}
                              name={"DOCUMNENT"}
                              doc={el?.doc}
                            />
                          </Flex>
                        </GridItem>
                      );
                    })}
                </Grid>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            {/* {ViewSingleCar?.status == "disabled" && (
              <Flex gap={2} mx={2}>
                <Button
                  colorScheme="green"
                  size={"md"}
                  variant={"solid"}
                  leftIcon={<BsFillCheckCircleFill />}
                  isLoading={loading && editingID == ViewSingleCar._id}
                  onClick={() => {
                    seteditingID(ViewSingleCar._id);
                    setOstatus("active");
                    onUpdateOpen();
                  }}
                >
                  Set As Active
                </Button>

                <Button
                  onClick={() => {
                    seteditingID(ViewSingleCar._id);
                    setdeleteID(ViewSingleCar._id);
                    onOpen();
                  }}
                  colorScheme="blue"
                  background="red.400"
                  variant={"solid"}
                  size={"md"}
                  mx={1}
                  rightIcon={<BsFillTrash2Fill />}
                >
                  Delete
                </Button>
              </Flex>
            )}
            {ViewSingleCar?.status == "active" && (
              <Flex gap={2} mx={2}>
                <Button
                  colorScheme="orange"
                  size={"md"}
                  variant={"solid"}
                  leftIcon={<BsXCircleFill />}
                  isLoading={loading && editingID == ViewSingleCar._id}
                  onClick={() => {
                    seteditingID(ViewSingleCar._id);
                    setOstatus("disabled");
                    onUpdateOpen();
                  }}
                >
                  Disable
                </Button>
                <Button
                  colorScheme="blue"
                  size={"md"}
                  variant={"solid"}
                  leftIcon={<BsInfoCircleFill />}
                  isLoading={loading && editingID == ViewSingleCar._id}
                  onClick={() => {
                    seteditingID(ViewSingleCar._id);
                    setOstatus("inactive");
                    onUpdateOpen();
                  }}
                >
                  Set As Inactive
                </Button>
              </Flex>
            )}
            {ViewSingleCar?.status == "inactive" && (
              <Flex gap={2} mx={2}>
                <Button
                  colorScheme="green"
                  size={"md"}
                  variant={"solid"}
                  leftIcon={<BsFillCheckCircleFill />}
                  isLoading={loading && editingID == ViewSingleCar._id}
                  onClick={() => {
                    seteditingID(ViewSingleCar._id);
                    setOstatus("active");
                    onUpdateOpen();
                  }}
                >
                  Set as Active
                </Button>
                <Button
                  colorScheme="orange"
                  size={"md"}
                  variant={"solid"}
                  leftIcon={<BsXCircleFill />}
                  isLoading={loading && editingID == ViewSingleCar._id}
                  onClick={() => {
                    seteditingID(ViewSingleCar._id);
                    setOstatus("disabled");
                    onUpdateOpen();
                  }}
                >
                  Disable
                </Button>
              </Flex>
            )} */}

            <Button
              colorScheme="#30829c"
              mr={3}
              onClick={() => {
                onViewClose();
                setViewSingleCar({});
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewSingleCarModal;
