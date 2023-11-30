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
  Image,
  Badge,
  Text,
  Divider,
  Flex,
  Table,
  TableContainer,
  Tr,
  Td,
  Th,
  Tbody,
  Thead,
  FormLabel,
} from "@chakra-ui/react";

const EmployeeDetailsModal = ({ isOpen, onClose, employee }) => {
  const getStatusBadgeColor = () => {
    switch (employee?.status) {
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

  const employeeCodeLastNumbers = employee?.employee_code.split("/").pop();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
      <ModalOverlay background={"rgba(0,0,0,0.1)"} />
      <ModalContent>
        <ModalHeader fontSize={"1.5rem"}>
          Employee : {employee?.employee_name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap={2} width={"100%"}>
            <Box mb={2} width={"40%"} border={"none"}>
              <Text>
                <b>Employee Code :</b>{" "}
                <span style={{ color: "teal", fontWeight: "bold" }}>
                  {employee?.employee_code}
                </span>
              </Text>
              <Text>
                <b>Email :</b> {employee?.email || "Not Provided"}
              </Text>
              <Text>
                <b>Contact :</b> {employee?.phone_number || "Not Provided"}
              </Text>
              <Text>
                <b>Gender :</b> {employee?.gender || "Not Provided"}
              </Text>
              <Text>
                <b>CreatedAt :</b>{" "}
                {new Date(employee?.createdAt).toLocaleString()}
              </Text>
              <Text>
                <b>Last UpdatedAt :</b>{" "}
                {new Date(employee?.updatedAt).toLocaleString()}
              </Text>
            </Box>
            <Box mb={2} width={"40%"} border={"none"}>
              <Text>
                <b>Status :</b>{" "}
                <Badge colorScheme={getStatusBadgeColor()}>
                  {employee?.status}
                </Badge>
              </Text>
              <Text>
                <b>Aadhar Number :</b> {employee?.aadhar_number}
              </Text>
              <Text>
                <b>PAN Number :</b> {employee?.pan_number}
              </Text>
              <Text>
                <b>Address :</b>{" "}
                {`${employee?.address?.address1}, ${employee?.address?.address2}, ${employee?.address?.city}, ${employee?.address?.state} - ${employee?.address?.pincode}`}
              </Text>
            </Box>
            <Box width={"20%"}>
              <Image
                alt="tutor-image"
                m={"auto"}
                borderRadius={"50%"}
                width={"160px"}
                height={"160px"}
                objectFit={"cover"}
                objectPosition={"center"}
                src={
                  employee?.profile_pic ||
                  "https://img.freepik.com/premium-vector/head-bearded-man-profile-portrait-bearded-brunet-man-face-side-view_276162-124.jpg?w=740"
                }
              />
            </Box>
          </Flex>
          <Divider my={2}></Divider>
          <FormLabel>Reference Persons List</FormLabel>
          <TableContainer
            position={"relative"}
            my={"10px"}
            maxHeight={"700px"}
            overflowY={"auto"}
            backgroundColor={"white"}
            border={"1px solid #ddd"}
            // borderRadius={"5px"}
          >
            <Table variant="striped" size={"sm"}>
              <Thead
                backgroundColor={"white"}
                position={"sticky"}
                top="0"
                zIndex={"3"}
              >
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Contact no.</Th>
                </Tr>
              </Thead>
              <Tbody>
                {employee?.references?.length > 0 &&
                  employee?.references?.map((el) => {
                    return (
                      <Tr key={el._id + "astgh"}>
                        <Td>{el?.name}</Td>
                        <Td>{el?.email}</Td>
                        <Td>{el?.phone_number}</Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>

        <ModalFooter>
          <Box display={"flex"} justifyContent={"space-around"} gap={"10px"}>
            <Button colorScheme="red" isDisabled={!employee?.aadhar_doc}>
              <a href={employee?.aadhar_doc} target="_blank" rel="noreferrer">
                GST Doc
              </a>
            </Button>
            <Button colorScheme="green" isDisabled={!employee?.pan_doc}>
              <a href={employee?.pan_doc} target="_blank" rel="noreferrer">
                PAN Doc
              </a>
            </Button>
          </Box>
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

export default EmployeeDetailsModal;
