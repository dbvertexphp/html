import React from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Center,
  Image,
  Badge,
  Flex,
  Text,
  Divider,
} from "@chakra-ui/react";

const UserDetailsModal = ({ isOpen, onClose, user }) => {
  // Determine the color for the status badge based on the user's status
  const getStatusBadgeColor = () => {
    switch (user?.status) {
      case "active":
        return "green";
      case "inactive":
        return "yellow";
      case "disabled":
        return "red";
      default:
        return "gray";
    }
  };
  // console.log(user);
  // Extract the last numbers from the customer code

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
      <ModalOverlay background={"rgba(0,0,0,0.1)"} />
      <ModalContent>
        <ModalHeader fontSize={"1.5rem"}>
          Customer : {user?.first_name} {user?.last_name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap={2} width={"100%"}>
            <Box mb={2} width={"50%"} border={"none"}>
              <Text>
                <b>Customer Code :</b>{" "}
                <span style={{ color: "teal", fontWeight: "bold" }}>
                  {user?.customer_code}
                </span>
              </Text>

              <Text>
                <b>Email :</b> {user?.email || "Not Provided"}
              </Text>
              <Text>
                <b>Address :</b> {user?.address}, {user?.city}, {user?.state} -{" "}
                {user?.pin}
              </Text>
              <Text>
                <b>Status :</b>{" "}
                <Badge colorScheme={getStatusBadgeColor()}>
                  {user?.status}
                </Badge>
              </Text>
              <Text>
                <b>CreatedAt :</b> {new Date(user?.createdAt).toLocaleString()}
              </Text>
              <Text>
                <b>Last UpdatedAt :</b>{" "}
                {new Date(user?.updatedAt).toLocaleString()}
              </Text>
            </Box>
            <Box width={"50%"}>
              <Image
                alt="user-image"
                m={"auto"}
                borderRadius={"50%"}
                width={"160px"}
                height={"160px"}
                objectFit={"cover"}
                objectPosition={"center"}
                src={
                  user?.profile_pic ||
                  "https://img.freepik.com/premium-vector/head-bearded-man-profile-portrait-bearded-brunet-man-face-side-view_276162-124.jpg?w=740"
                }
              />
            </Box>
          </Flex>
          <Divider my={2}></Divider>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mx={2}
            onClick={() => {
              onClose();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserDetailsModal;
