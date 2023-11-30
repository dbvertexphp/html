import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

const AlertMessageModal = ({ text, openModal, setAlertMsg1 }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  useEffect(() => {
    if (openModal) {
      onOpen();
    }
    setAlertMsg1((prev) => ({ ...prev, open: false }));
  }, [openModal]);
  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader bg="red.100">Alert</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{text}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>{" "}
    </>
  );
};

export default AlertMessageModal;
