import {
  Box,
  Input,
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
    <>
    <Box bg="#1097B1" color="#fff">
      <Grid
        templateColumns="repeat(11, 1fr)"
        mx="5"
        p="10"
        gap={{ base: "5", md: "20" }}
        spacing="2"
      >
        
        <GridItem colSpan={{ base: "11", sm: "6", md: "4" }}>
        <Stack>
        <Heading size="md">Easygocarz</Heading>
           
          </Stack>
        </GridItem>
       
        <GridItem colSpan={{ base: "11", sm: "5", md: "3" }}>
          <Stack>
           
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
        <GridItem colSpan={{ base: "11", sm: "5", md: "2" }}>
          <Stack>
          <Input bg="#fff" type="text"  placeholder="Enter Your Email Id" />

          </Stack>
        </GridItem>
       
      </Grid>
    </Box>
     <Box bg="#1097B1" color="#fff">
     <Grid
       templateColumns="repeat(11, 1fr)"
       mx="5"
       p="10"
       gap={{ base: "5", md: "20" }}
       spacing="2"
     >
       
       <GridItem colSpan={{ base: "11", sm: "6", md: "4" }}>
       <Stack>
       <Link to={"/about"}>Home</Link>
           <Link to={"/about"}>About</Link>
           <Link to={"/collection"}>Collection</Link>
          
           <Link to={"/refund-policy"}>Refund Policy</Link>
          
           <Link to={"/faq"}>FAQs</Link>
           <Link to={"/contactus"}>Contact Us</Link>
         </Stack>
       </GridItem>
      
       <GridItem colSpan={{ base: "11", sm: "5", md: "3" }}>
         <Stack>
           <Heading size="md">Information</Heading>
           <Link to={"/privacy-policy"}>Privacy Policy</Link>
           <Link to={"/vendor-register"}>Refunds And Returns</Link>
           <Link to={"/terms-conditions"}>Terms and Conditions</Link>
         </Stack>
       </GridItem>
       <GridItem colSpan={{ base: "11", sm: "5", md: "3" }}>
         <Stack>
           <Heading size="md">CONTACT INFO</Heading>
           
            
             <Link to={"/terms-conditions"}>Email Address</Link>
            
             <Link to={"/vendor-register"}>We are thrilled to share with you very valuable vehicle related information for free. Sign up to our newsletter to get yourself in the exclusive list.</Link>  
             
          
         </Stack>
       </GridItem>
      
     </Grid>
   </Box>
   </>
  );
}
