import {
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  Text,
  Toast,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import loader from "../../../assets/loader.gif";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateWebsiteData,
  getTools,
  getallBanners,
} from "../../../Redux/App/Actions/Admin/Website/Website.action";

const HompageBanner = () => {
  let { User_detail, token } = useSelector((store) => store?.UserAuthManager);
  const user =
    User_detail || JSON.parse(localStorage.getItem("user_detail_carvendor"));
  let admintoken =
    token || JSON.parse(localStorage.getItem("admin_token_carvendor"));
  const dispatch = useDispatch();
  const toast = useToast();
  const [bannerData, setBannerData] = useState({});

  const getData = (e) => {
    dispatch(getallBanners(setBannerData));
  };
  const handleUpdateBanner = (e) => {
    let { name, value } = e.target;
    setBannerData({ ...bannerData, [name]: value });
    dispatch(
      UpdateWebsiteData(
        { banner_images: { ...bannerData, [name]: value } },
        toast,
        "Banner Images Updated Successfully",
        getData,
        admintoken
      )
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Text
          mb="2"
          p={"10px"}
          fontWeight={"500"}
          fontSize={{ base: "1rem", md: "1.5rem" }}
        >
          Homepage Banners
        </Text>
      </Flex>
      <Grid templateColumns="repeat(12, 1fr)" gap={"5"}>
        <GridItem py={"2"} as="div" colSpan={{ base: 12, md: 6 }}>
          <Image
            w={"100%"}
            h={"220px"}
            objectFit={"cover"}
            src={bannerData?.image1 || loader}
          />
          <Input
            my={2}
            bg={"white"}
            name="image1"
            type="text"
            value={bannerData?.image1 || ""}
            onChange={handleUpdateBanner}
          />
        </GridItem>
        <GridItem py={"2"} as="div" colSpan={{ base: 12, md: 6 }}>
          <Image
            w={"100%"}
            h={"220px"}
            objectFit={"cover"}
            src={bannerData?.image2 || loader}
          />
          <Input
            my={2}
            bg={"white"}
            name="image2"
            type="text"
            value={bannerData?.image2 || ""}
            onChange={handleUpdateBanner}
          />
        </GridItem>
        <GridItem py={"2"} as="div" colSpan={{ base: 12, md: 6 }}>
          <Image
            w={"100%"}
            h={"220px"}
            objectFit={"cover"}
            src={bannerData?.image3 || loader}
          />
          <Input
            my={2}
            bg={"white"}
            name="image3"
            type="text"
            value={bannerData?.image3 || ""}
            onChange={handleUpdateBanner}
          />
        </GridItem>
        <GridItem py={"2"} as="div" colSpan={{ base: 12, md: 6 }}>
          <Image
            w={"100%"}
            h={"220px"}
            objectFit={"cover"}
            src={bannerData?.image4 || loader}
          />
          <Input
            my={2}
            bg={"white"}
            name="image4"
            type="text"
            value={bannerData?.image4 || ""}
            onChange={handleUpdateBanner}
          />
        </GridItem>
        <GridItem py={"2"} as="div" colSpan={{ base: 12, md: 6 }}>
          <Image
            w={"100%"}
            h={"220px"}
            objectFit={"cover"}
            src={bannerData?.image5 || loader}
          />
          <Input
            my={2}
            bg={"white"}
            name="image5"
            type="text"
            value={bannerData?.image5 || ""}
            onChange={handleUpdateBanner}
          />
        </GridItem>
        <GridItem py={"2"} as="div" colSpan={{ base: 12, md: 6 }}>
          <Image
            w={"100%"}
            h={"220px"}
            objectFit={"cover"}
            src={bannerData?.image6 || loader}
          />
          <Input
            my={2}
            bg={"white"}
            name="image6"
            type="text"
            value={bannerData?.image6 || ""}
            onChange={handleUpdateBanner}
          />
        </GridItem>
      </Grid>
    </>
  );
};

export default HompageBanner;
