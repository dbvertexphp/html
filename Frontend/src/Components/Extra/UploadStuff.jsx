import axios from "axios";
import React, { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormLabel,
  HStack,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, CheckIcon } from "@chakra-ui/icons";
import { FiCopy } from "react-icons/fi";
import { BASE_URL } from "../../utils/config";

const UploadStuff = () => {
  const toast = useToast();

  const fileInputRef = useRef();

  const [isUploaded, setIsUploaded] = useState(false);
  const [filename, setfilename] = useState("Upload Any File/IMG/PDF");
  const [FileURL, setFileURL] = useState("");

  const HandleUploadSomething = async (event) => {
    let token =
      JSON.parse(localStorage.getItem("admin_token_carvendor")) ||
      JSON.parse(localStorage.getItem("vendor_token_carvendor")) ||
      JSON.parse(localStorage.getItem("customer_token_carvendor"));

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(`${BASE_URL}/api/test/upload-to-s3`, formData)
      .then((res) => {
        const filelocation = res?.data?.fileUrl;
        console.log(res.data.message, "URL :", filelocation);

        setIsUploaded(true);
        setfilename(file.name);
        setFileURL(filelocation);

        toast({
          position: "top",
          title: "Uploaded File Successfully",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        setIsUploaded(false);
        toast({
          title: "Something Went wrong",
          status: "error",
          duration: 4000,
          position: "top",
        });
      });
  };

  return (
    <div>
      <Box width="100%" bg={"white"} p="40px">
        <Heading size={"md"}>Upload A File PDF/Img/*</Heading>
        <HStack>
          <VStack border={"3px dotted #ddd"} width={"100%"} m="5" p="5">
            <FormLabel>PDF File Input</FormLabel>
            <input
              type="file"
              accept="image/*, application/pdf"
              name="download_link"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={HandleUploadSomething}
            />
            <Button
              colorScheme={isUploaded ? "green" : "blue"}
              // isLoading={loading}
              loadingText="Uploading"
              spinnerPlacement="start"
              leftIcon={isUploaded ? <CheckIcon /> : <AddIcon />}
              onClick={() => {
                fileInputRef.current.click();
              }}
            >
              {filename}
            </Button>
            <Divider my={5}></Divider>
            <Text fontSize={"1.2rem"}>File URL </Text>
            <Flex width={"100%"} gap={3}>
              <Input
                value={FileURL}
                placeholder="File URL of Uploaded file"
                onChange={() => ""}
              />
              <Button
                leftIcon={<FiCopy />}
                onClick={() => {
                  navigator.clipboard.writeText(FileURL);
                  return toast({
                    position: "top",
                    title: "Copied to clipboard",
                    status: "success",
                  });
                }}
              >
                Copy
              </Button>
            </Flex>
          </VStack>
        </HStack>
      </Box>
    </div>
  );
};

export default UploadStuff;
