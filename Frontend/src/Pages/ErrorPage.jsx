import { Box, Heading, Text, Image } from "@chakra-ui/react";

const ErrorPage = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      flexDirection="column"
      pt={{ md: "10" }}
    >
      <Image src="/error.jpg" alt="404 Image" w="300px" />
      <Box>
        <Heading as="h1" size="2xl" mb={4} fontWeight="bold">
          Oops! Page Not Found
        </Heading>
        <Text fontSize="lg" fontWeight="medium" mb={6}>
          We're sorry, but the page you're looking for doesn't exist.
        </Text>
        <Text fontSize="sm">
          Please check the URL or go back to the {"  "}
          <Box as="a" href="/" color="orange" textDecoration="underline">
            homepage
          </Box>
          .
        </Text>
      </Box>
    </Box>
  );
};

export default ErrorPage;
