import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useRef, useState } from "react";
import { FiCheckCircle, FiPlusCircle } from "react-icons/fi";
import { BASE_URL } from "../../utils/config";

const InputUploadMultiple = ({
  acceptData,
  HandleUploadSomeImages,
  UploadText,
  limit,
}) => {
  const toast = useToast();
  let token =
    JSON.parse(localStorage.getItem("admin_token_carvendor")) ||
    JSON.parse(localStorage.getItem("vendor_token_carvendor")) ||
    JSON.parse(localStorage.getItem("customer_token_carvendor"));

  const [isUploaded, setIsUploaded] = useState(false);
  const [loading, setloading] = useState(false);
  const [filename, setfilename] = useState(UploadText);
  const [isSaved, setisSaved] = useState(false);

  const fileInputRef = useRef();
  const handleFileInputChange = async (event) => {
    setloading(true);
    let files = event.target.files;

    const uploadPromises = Array.from(files).map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      return axios.post(`${BASE_URL}/api/test/upload-to-s3`, formData);
    });

    Promise.all(uploadPromises)
      .then((responses) => {
        let locations = [];
        responses.forEach((response) => {
          const filelocation = response?.data?.fileUrl;
          locations.push(filelocation);
        });
        HandleUploadSomeImages(locations);
        setIsUploaded(true);
        setfilename(UploadText);
        setisSaved(true);
        setloading(false);

        toast({
          position: "top",
          title: "Uploaded Successfully",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        console.log(locations);
      })
      .catch((error) => {
        console.log(error);
        setIsUploaded(false);
        setloading(false);
        setfilename(UploadText);
        toast({
          title: "Something Went wrong",
          status: "error",
          duration: 4000,
          position: "top",
        });
      });

    return;
    // const formData = new FormData();
    // formData.append("file", file);

    // axios
    //   .post(`${BASE_URL}/api/test/upload-to-s3`, formData)
    //   .then((res) => {
    //     const filelocation = res?.data?.fileUrl;
    //     console.log(res.data.message, "URL :", filelocation);

    //     HandleUploadSomeImages(filelocation);

    //     setIsUploaded(true);
    //     setfilename(UploadText);
    //     setisSaved(true);
    //     setloading(false);
    //     toast({
    //       position: "top",
    //       title: "Uploaded Successfully",
    //       status: "success",
    //       duration: 4000,
    //       isClosable: true,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setIsUploaded(false);
    //     setloading(false);
    //     setfilename(UploadText);
    //     toast({
    //       title: "Something Went wrong",
    //       status: "error",
    //       duration: 4000,
    //       position: "top",
    //     });
    //   });
  };
  return (
    <>
      <input
        type="file"
        multiple
        accept={acceptData || "*"}
        name="download_link"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileInputChange}
      />
      <Button
        w="full"
        py={3}
        my={2}
        colorScheme={"gray"}
        isLoading={loading}
        color={"black"}
        loadingText="Uploading"
        spinnerPlacement="start"
        bg={"gray.50"}
        border={"3px dotted gray"}
        fontSize={"14"}
        leftIcon={<FiPlusCircle />}
        onClick={() => {
          fileInputRef.current.click();
        }}
        sx={{
          overflow: "hidden",
          whiteSpace: "pre",
          textAlign: "center",
          wordWrap: "break-word",
        }}
      >
        {filename}
      </Button>
    </>
  );
};

export default InputUploadMultiple;
