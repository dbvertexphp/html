import React from 'react';
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
  TableContainer,
  Table,
  Thead
} from '@chakra-ui/react';

const VendorDetailsModal = ({ isOpen, onClose, vendor }) => {
  const getStatusBadgeColor = () => {
    switch (vendor?.status) {
      case 'active':
        return 'green';
      case 'disabled':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'5xl'} isCentered>
      <ModalOverlay background={'rgba(0,0,0,0.1)'} />
      <ModalContent>
        <ModalHeader fontSize={'1.5rem'}>Vendor : {vendor?.vendor_name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap={6} width={'100%'}>
            <Box mb={6} width={'40%'} border={'none'}>
              <Text>
                <b>Vendor Code :</b> <span style={{ color: 'teal', fontWeight: 'bold' }}>{vendor?.vendor_code}</span>
              </Text>
              <Text>
                <b>Email :</b> {vendor?.email || 'Not Provided'}
              </Text>
              <Text>
                <b>Contact :</b> {vendor?.phone_number || 'Not Provided'}
              </Text>
              <Text>
                <b>Company :</b> {vendor?.company_name || 'Not Provided'}
              </Text>

              <Text>
                <b>Employee Name :</b> {vendor?.reference?.employee_name || 'Not Assigned'}
              </Text>
              <Text>
                <b>Employee ID :</b> {vendor?.reference?.employee_code || 'Not Assigned'}
              </Text>
              <Text>
                <b>Commission Type :</b> {vendor?.commission_type || 'Not Assigned'}
              </Text>
              <Text>
                <b>Commission :</b> {vendor?.commission_amount || 'Not Assigned'}
              </Text>
              <Text>
                <b>CreatedAt :</b> {new Date(vendor?.created_at).toLocaleString()}
              </Text>
            </Box>
            <Box mb={6} width={'40%'} border={'none'}>
              <Text>
                <b>Status :</b> <Badge colorScheme={getStatusBadgeColor()}>{vendor?.status}</Badge>
              </Text>
              <Text>
                <b>GST Number :</b> {vendor?.gst_number}
              </Text>
              <Text>
                <b>PAN Number :</b> {vendor?.pan_number}
              </Text>
              <Text>
                <b>MSME Number :</b> {vendor?.msme_number}
              </Text>
              <Text>
                <b>Address :</b>{' '}
                {`${vendor?.address?.address1}, ${vendor?.address?.address2}, ${vendor?.address?.city}, ${vendor?.address?.state} - ${vendor?.address?.pincode}`}
              </Text>
              <Text>
                <b>Last UpdatedAt :</b> {new Date(vendor?.updated_at).toLocaleString()}
              </Text>
            </Box>
            <Box width={'20%'}>
              <Image
                alt="tutor-image"
                m={'auto'}
                borderRadius={'50%'}
                width={'160px'}
                height={'160px'}
                objectFit={'cover'}
                objectPosition={'center'}
                src={
                  vendor?.profile_photo ||
                  'https://img.freepik.com/premium-vector/head-bearded-man-profile-portrait-bearded-brunet-man-face-side-view_276162-124.jpg?w=740'
                }
              />
            </Box>
          </Flex>
          <Divider my={2}></Divider>
        </ModalBody>

        <ModalFooter>
          <Box display={'flex'} justifyContent={'space-around'} gap={'10px'}>
            <Button colorScheme="red" isDisabled={!vendor?.gst_doc}>
              <a href={vendor?.gst_doc} target="_blank" rel="noreferrer">
                GST Doc
              </a>
            </Button>
            <Button colorScheme="green" isDisabled={!vendor?.pan_doc}>
              <a href={vendor?.pan_doc} target="_blank" rel="noreferrer">
                PAN Doc
              </a>
            </Button>
            <Button colorScheme="yellow" isDisabled={!vendor?.msme_doc}>
              <a href={vendor?.msme_doc} target="_blank" rel="noreferrer">
                MSME Doc
              </a>
            </Button>
          </Box>
          <Button
            colorScheme="#30829c"
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

export default VendorDetailsModal;
