import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  Heading,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

export default function Faq() {
  return (
    <>
      {" "}
      <Heading
        mx={{ base: "5", md: "20" }}
        mt="10"
        fontWeight={"500"}
        color="#30829c"
      >
        Frequently Asked Questions
      </Heading>
      <Card mx={{ base: "5", md: "20" }} mt="3" mb="20" px="5">
        <Tabs variant="soft-rounded" colorScheme="blue" my="5">
          <TabList>
            <Tab>Seller's FAQ</Tab>
            <Tab>Buyer's FAQ</Tab>
          </TabList>
          <TabPanels>
            <TabPanel mt="10">
              <Accordion allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontWeight={"semibold"}
                      >
                        How can I join EasyGoCarz?
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    Fill the form and some one from the team will contact you
                    within 24 hours, post conversation and details collected we
                    will be sharing you detail of teacher for demo class and
                    finalized.
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontWeight={"semibold"}
                      >
                        Which type of tuition services do EasyGoCarz provide?
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    We provide online & in-home vendor.
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontWeight={"semibold"}
                      >
                        What if I am not satisfied with the services of the
                        vendor?
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    EasyGoCarz will provide you with 3 vendor replacement in a
                    year in case you are not satisfied with the services.
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontWeight={"semibold"}
                      >
                        How many vendors do your provide for the demo classes?
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    We will provide with 3 vendors in your location or online
                    for the demo class.
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontWeight={"semibold"}
                      >
                        Is there any registration charges for joining
                        EasyGoCarz?
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    There is no registration charges involved when you join
                    EasyGoCarz.
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </TabPanel>
            <TabPanel mt="10">
              <Accordion allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontWeight={"semibold"}
                      >
                        How will I be onboarded in EasyGoCarz?
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    You need to fill the form and submit your details. There
                    will be evaluation of your profile by one of our senior
                    executive. Post successful onboarding you will be informed
                    and your login details will be shared. We will start sharing
                    you details of students as per your location availability
                    and preferences.
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontWeight={"semibold"}
                      >
                        I have stopped classes before the completion of the
                        month will I be paid?
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    There need to be a mutual understanding with the parent.
                    EasyGoCarz will not be taking any kind of payment from
                    parents except the first payment (40% + taxes) advance after
                    the demo, rest 60% directly to be paid to the vendor at the
                    end of the first month & full payment to vendor from next
                    month onwards. So as many days you have completed you will
                    be liable to be paid by parents for that many days.
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontWeight={"semibold"}
                      >
                        Parents have selected me but told not to inform
                        EasyGoCarz, what should I do?
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    If the vendor will be directly onboarded by parents then
                    EasyGoCarz will not be responsible for any kind of issues or
                    concerns that arises between both the parties. Both the
                    parties will loose on the benefits assured by EasyGoCarz.
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontWeight={"semibold"}
                      >
                        If am not satisfied with the free criteria what should I
                        do? Will EasyGoCarz help with that?
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    We can connect and come to some consensus we will assure you
                    that all the students will be provided as your availability
                    preference and locations.
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </>
  );
}
