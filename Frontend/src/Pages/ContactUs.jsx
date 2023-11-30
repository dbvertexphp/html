import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { BsInfoLg } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/config";

const initialState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactUs() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/api/contact-us`, form)
      .then((res) => {
        toast({
          title:
            "We have received your response, Our Team will contact you shortly!",
          status: "success",
          position: "top",
          duration: 4000,
        });
      })
      .catch((err) => {
        toast({
          title: "Something Went Wrong! Try Again Later",
          status: "error",
          position: "top",
          duration: 4000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Flex direction={{ base: "column", md: "row" }} justify={"center"}>
        <Card
          p="5"
          px={{ md: "20" }}
          m="10"
          w={{ md: "50%" }}
          border="1px solid #ddd"
          boxShadow={" rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
        >
          <CardHeader as={Text} fontSize="24" textColor="#30829c">
            Feel Free to Contact Us
          </CardHeader>
          <CardBody>
            <Flex gap="3" flexDirection={{ base: "column", md: "row" }}>
              <Input
                placeholder="Your name"
                name="name"
                type="text"
                onChange={handleChange}
                value={form?.name}
              />
              <Input
                placeholder="Your email"
                name="email"
                type="email"
                onChange={handleChange}
                value={form?.email}
              />
            </Flex>
            <Flex gap="3" flexDirection={{ base: "column", md: "row" }} my="5">
              <Input
                placeholder="Your phone"
                name="phone"
                type="number"
                onChange={handleChange}
                value={form?.phone}
              />
              <Input
                placeholder="Subject"
                name="subject"
                type="text"
                onChange={handleChange}
                value={form?.subject}
              />
            </Flex>
            <Textarea
              placeholder="message"
              rows={"3"}
              name="message"
              onChange={handleChange}
              value={form?.message}
            />
            <Button bg="#30829c" color="white" m="5" onClick={handleSubmit}>
              Send Message
            </Button>
          </CardBody>
        </Card>

        {/* <Card
          p="5"
          px={{ md: "20" }}
          m="10"
          w={{ md: "50%" }}
          border="1px solid #ddd"
          boxShadow={" rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
        >
          <CardHeader as={Text} fontSize="24" textColor="#30829c">
            Address Info
          </CardHeader>
          <CardBody>
            <Flex
              justifyContent={"space-between"}
              flexDirection={{ base: "column", md: "row" }}
            >
              <Stack>
                <Flex align={"center"} fontWeight={"bold"} gap="2">
                  <MdLocationOn />
                  Registered Office:
                </Flex>
                <Text m="5">Delhi, India</Text>
              </Stack>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.56659374104!2d77.46612615528802!3d12.95428023609803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1691577457253!5m2!1sen!2sin"
                width="200"
                height="200"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Flex>

            <Text fontSize="24" textColor="#30829c">
              Get Social
            </Text>
            <HStack m="5" spacing="5">
              <a href="" target="_blank" rel="noreferrer">
                <Image width="30px" src={facebook} />
              </a>
              <a href="" target="_blank" rel="noreferrer">
                <Image width="30px" src={insta} />
              </a>

              <a href="" target="_blank" rel="noreferrer">
                <Image width="30px" src={youtube} />
              </a>

              <a href="" target="_blank" rel="noreferrer">
                <Image width="30px" src={linkedin} />
              </a>
            </HStack>
          </CardBody>
        </Card> */}
      </Flex>

      <Flex
        align={"center"}
        justifyContent={"center"}
        gap="10"
        direction={{ base: "column", md: "row" }}
        mb="20"
        fontWeight={"semibold"}
      >
        <Card
          w={"230px"}
          p="10"
          align={"center"}
          border="1px solid #ddd"
          boxShadow={" rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
        >
          <BsInfoLg size={40} />
          <Text fontSize={16} mt="5">
            https://easygocarz.com
          </Text>
        </Card>

        <Card
          w={"230px"}
          p="10"
          align={"center"}
          border="1px solid #ddd"
          boxShadow={" rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
        >
          <MdEmail size={35} />
          <Text fontSize={16} mt="5">
            support@easygocarz.com
          </Text>
        </Card>

        {/* <Card
          w={"230px"}
          p="10"
          align={"center"}
          border="1px solid #ddd"
          boxShadow={" rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
        >
          <MdWhatsapp size={35} />
          <Text fontSize={16} mt="5">
            +91-9999999999
          </Text>
        </Card> */}
      </Flex>
    </>
  );
}
