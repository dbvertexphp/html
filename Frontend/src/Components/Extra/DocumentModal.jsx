import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Flex,
  Image,
} from "@chakra-ui/react";
import { Document, Page } from "react-pdf";

const DocumentModal = ({ isOpen, onClose, name, doc }) => {
  let doctype = doc?.split(".");
  if (doctype) {
    doctype = doctype[doctype?.length - 1];
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
      <ModalOverlay background={"rgba(0,0,0,0.1)"} />
      <ModalContent>
        <ModalHeader>{name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            weight={"4xl"}
            overflowY="auto"
            justifyContent={"center"}
            height="80vh"
          >
            {doctype == "pdf" ? (
              <Document file={doc}>
                <Page pageNumber={1} />
              </Document>
            ) : (
              <Image
                src={doc}
                w={"full"}
                objectPosition={"center"}
                objectFit={"cover"}
              />
            )}
          </Flex>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DocumentModal;
