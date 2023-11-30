import { Card, Heading, ListItem, Text, UnorderedList } from "@chakra-ui/react";

export default function ReturnPolicy() {
  return (
    <>
      <Heading
        mx={{ base: "5", md: "20" }}
        mt="10"
        fontWeight={"500"}
        color="#30829c"
      >
        Refund Policy
      </Heading>
      <Card mx={{ base: "5", md: "20" }} mt="3" mb="20" px="5">
        <Text mt="5">
          To be eligible for a refund on any digital/subscription based
          services, the following steps must be taken:
        </Text>
        <UnorderedList ml="7">
          <ListItem>
            Refund must be requested in writing by contacting
            support@easygocarz.com
          </ListItem>
          <ListItem>
            Request of refund must be made within 14 days of the original
            purchase date
          </ListItem>
        </UnorderedList>

        <Text mt="5">
          EasyGoCarz LLP is committed to its consumers, and while we stand by
          our policy as written above, we also want to understand how we can
          resolve the dissatisfaction and better understand how we can serve
          you. Please contact EasyGoCarz LLP at support@easygocarz.com for any
          questions related to our policy, or simply to let us know how we can
          help.
        </Text>

        <Text mt="5">
          EasyGoCarz LLP is committed to its consumers, and while we stand by
          our policy as written above, we also want to understand how we can
          resolve the dissatisfaction and better understand how we can serve
          you. Please contact EasyGoCarz LLP at support@easygocarz.com for any
          questions related to our policy, or simply to let us know how we can
          help.
        </Text>
        <Text mt="5" color="#30829c" fontSize={"18"}>
          Contact Us
        </Text>
        <Text mt="5"> By email : support@easygocarz.com</Text>
      </Card>
    </>
  );
}
