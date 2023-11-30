import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Image,
  ModalCloseButton,
} from "@chakra-ui/react";

const ImageModal = ({ isOpen, onClose, imageUrl }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton bg="white" color="black" borderRadius={"50%"} />
        <ModalBody m="0" p="0" maxH={"60vh"}>
          <Image
            src={imageUrl}
            alt="Image"
            w="full"
            h="full"
            objectFit="cover"
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ImageModal;
