import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import facebook from "../../assets/Icons/facebook.png";
import insta from "../../assets/Icons/insta.png";
import youtube from "../../assets/Icons/youtube.png";
import linkedin from "../../assets/Icons/linkedin.png";
import logo from "../../assets/Icons/logo.png";

import { MdLocalPhone, MdLocationOn, MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

export default function Footer() {
  return (
    <Box bg="#F7FAFC">
      <Grid
        templateColumns="repeat(11, 1fr)"
        mx="5"
        p="10"
        gap={{ base: "5", md: "20" }}
        spacing="2"
      >
        <GridItem colSpan={{ base: "11", sm: "6", md: "3" }}>
          <Box alignContent={"start"}>
            <Link to="/">
              <Image
                src={logo}
                width="100%"
                h="135px"
                position={"center"}
                objectFit={"cover"}
              />
            </Link>
          </Box>
        </GridItem>
        <GridItem colSpan={{ base: "11", sm: "5", md: "2" }}>
          <Stack>
            <Heading size="md">NAVIGATE</Heading>
            <Link to={"/about"}>About</Link>
            <Link to={"/collection"}>Collection</Link>
            <Link to={"/privacy-policy"}>Privacy Policy</Link>
            <Link to={"/refund-policy"}>Refund Policy</Link>
            <Link to={"/terms-conditions"}>Terms and Conditions</Link>
            <Link to={"/faq"}>FAQs</Link>
            <Link to={"/contactus"}>Contact Us</Link>
          </Stack>
        </GridItem>
        <GridItem colSpan={{ base: "11", sm: "5", md: "2" }}>
          <Stack>
            <Heading size="md">JOIN US</Heading>
            <Link to={"/customer-email-login"}>As a Buyer</Link>
            <Link to={"/vendor-register"}>As a Seller</Link>
          </Stack>
        </GridItem>
        <GridItem colSpan={{ base: "11", sm: "5", md: "2" }}>
          <Stack>
            <Heading size="md">CONTACT INFO</Heading>
            {/* <HStack>
              <MdLocationOn color={"black"} />
              <Text>Delhi, India</Text>
            </HStack> */}
            <HStack as="a" href={"mailto:support@easygocarz.com"}>
              <Flex align="center">
                <MdEmail color="black" /> support@easygocarz.com
              </Flex>
            </HStack>
            {/* <HStack as="a" href={"tel:+91-8369563412"}>
              <MdLocalPhone color="black" />
              <Text>+91-9999999999</Text>
            </HStack> */}
          </Stack>
        </GridItem>
        <GridItem colSpan={{ base: "11", sm: "5", md: "2" }}>
          <Stack>
            <Heading size="md">FOLLOW US</Heading>
            <HStack>
              <a
                href="https://www.facebook.com/easygocarz/"
                target="_blank"
                rel="noreferrer"
              >
                <Image width="30px" src={facebook} />
              </a>
              <a
                href="https://www.instagram.com/easygo_carz"
                target="_blank"
                rel="noreferrer"
              >
                <Image width="30px" src={insta} />
              </a>

              <a
                href="https://www.youtube.com/channel/UCi3zh00OuADS96BokjTrtFg"
                target="_blank"
                rel="noreferrer"
              >
                <Image width="30px" src={youtube} />
              </a>

              <a
                href="https://www.linkedin.com/company/easygo-carz-llp/"
                target="_blank"
                rel="noreferrer"
              >
                <Image width="30px" src={linkedin} />
              </a>
            </HStack>
          </Stack>
        </GridItem>
      </Grid>
    </Box>
  );
}
