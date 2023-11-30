import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FiCheckCircle, FiPlusCircle } from "react-icons/fi";
import { BASE_URL } from "../../utils/config";

const InputUpload = ({
  HandleUploadSomeImages,
  refresh,
  accept,
  UploadText,
  UploadSuccessTitle,
  size,
  color,
  leftIcon,
  isDisabled,
  border,
}) => {
  UploadText = UploadText || "Upload";
  color = color || "blue";
  leftIcon = leftIcon || <FiPlusCircle />;
  if (isDisabled == undefined) isDisabled = false;
  let token =
    JSON.parse(localStorage.getItem("admin_token_carvendor")) ||
    JSON.parse(localStorage.getItem("vendor_token_carvendor")) ||
    JSON.parse(localStorage.getItem("customer_token_carvendor"));

  const toast = useToast();
  const [isUploaded, setIsUploaded] = useState(false);
  const [loading, setloading] = useState(false);
  const [filename, setfilename] = useState(UploadText);
  const [isSaved, setisSaved] = useState(false);

  const fileInputRef = useRef();
  const handleFileInputChange = async (event) => {
    setloading(true);
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(`${BASE_URL}/api/test/upload-to-s3`, formData)
      .then((res) => {
        const filelocation = res?.data?.fileUrl;
        console.log(res.data.message, "URL :", filelocation);

        HandleUploadSomeImages(filelocation);
        setIsUploaded(true);
        setfilename(file.name);
        setisSaved(true);

        toast({
          position: "top",
          title: UploadSuccessTitle || "Uploaded Successfully",
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
      })
      .finally(() => setloading(false));
  };

  useEffect(() => {
    setisSaved(false);
    setfilename(UploadText);
    setIsUploaded(false);
    setloading(false);
  }, [refresh]);
  return (
    <>
      <input
        type="file"
        accept={accept || "*"}
        name="download_link"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileInputChange}
      />
      <Button
        isDisabled={isDisabled}
        colorScheme={isUploaded ? "green" : color}
        isLoading={loading}
        loadingText="Uploading"
        spinnerPlacement="start"
        size={size || "md"}
        border={border || "none"}
        leftIcon={isUploaded ? <FiCheckCircle /> : <FiPlusCircle />}
        onClick={() => {
          fileInputRef.current.click();
        }}
      >
        {filename}
      </Button>
    </>
  );
};

export default InputUpload;
