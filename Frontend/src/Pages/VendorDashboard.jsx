import React, { useEffect, useState } from "react";
import { NavLink, Link as RouteLink, useNavigate } from "react-router-dom";
import logo_light from "../assets/Icons/logo.png";
import avatar from "../assets/Icons/avatar.png";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
  useToast,
} from "@chakra-ui/react";
import { FiHome, FiMenu, FiFileText, FiInfo } from "react-icons/fi";
import { AiOutlineCar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import VendorRoutes from "../Routes/VendorRoutes";
import { BsFillMenuAppFill } from "react-icons/bs";

export default function SideNav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <VendorRoutes />
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const navigate = useNavigate();
  const [Active, setActive] = useState("");
  let location = window.location.href;
  let tabopen = location.split("/")[4];
  useEffect(() => {
    if (!tabopen) {
      navigate("dashboard");
    }
    setActive("vendor/" + tabopen);
  }, [location]);
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: "230px" }}
      justifyContent={"center"}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex alignItems="center" p="2" justifyContent="space-between">
        <Image
          src={logo_light}
          width="100%"
          h="110px"
          position={"center"}
          objectFit={"cover"}
          ml={"20px"}
        />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      <NavItem
        key={"Dashboard"}
        icon={FiHome}
        path={"vendor/dashboard"}
        setActive={setActive}
        Active={Active}
      >
        <Text size={"sm"}> Dashboard</Text>
      </NavItem>

      <NavItem
        key={"Car"}
        icon={AiOutlineCar}
        path={"vendor/cars"}
        setActive={setActive}
        Active={Active}
      >
        <Text size={"sm"}> Cars</Text>
      </NavItem>

      <NavItem
        key={"Orders"}
        icon={BsFillMenuAppFill}
        path={"vendor/bookings"}
        setActive={setActive}
        Active={Active}
      >
        <Text size={"sm"}> Bookings</Text>
      </NavItem>

      <NavItem
        key={"TestDrivces"}
        icon={FiInfo}
        path={"vendor/testdrives"}
        setActive={setActive}
        Active={Active}
      >
        <Text size={"sm"}> Test Drives</Text>
      </NavItem>
      <NavItem
        key={"transactions"}
        icon={FiFileText}
        path={"vendor/transactions"}
        setActive={setActive}
        Active={Active}
      >
        <Text size={"sm"}> Transactions</Text>
      </NavItem>
    </Box>
  );
};

const NavItem = ({ icon, children, path, Active, setActive, ...rest }) => {
  return (
    <Link
      as={RouteLink}
      to={"/" + path}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        my="1"
        borderRadius="5px"
        role="group"
        cursor="pointer"
        bg={path == Active ? "#30829c" : "white"}
        color={path == Active ? "white" : "black"}
        fontWeight={path == Active ? "600" : "400"}
        onClick={() => setActive(path)}
        _hover={{
          bg: "#30829c",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "CARVENDOR_LOGOUT" });
    toast({
      title: "Logout Successfull.",
      description: "You have been successfully logged out.",
      status: "info",
      duration: 4000,
      isClosable: true,
    });
  };

  let { Vendor_detail, token } = useSelector(
    (store) => store?.VendorAuthManager
  );
  const vendor =
    Vendor_detail ||
    JSON.parse(localStorage.getItem("vendor_detail_carvendor"));
  let vendortoken =
    token || JSON.parse(localStorage.getItem("vendor_token_carvendor"));

  return (
    <Flex
      ml={{ base: 0, md: "230px" }}
      px={{ base: 4, md: 4 }}
      height="16"
      zIndex={"10"}
      position={"sticky"}
      top={"0"}
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Image
        src={logo_light}
        display={{ base: "flex", md: "none" }}
        width={"70px"}
        alignSelf={"center"}
      />
      <HStack spacing={{ base: "0", md: "4" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{vendor?.vendor_name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {vendor?.email}
                  </Text>
                </VStack>
                <Avatar size={"sm"} src={vendor?.profile_photo || avatar} />
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem
                onClick={() => navigate("/vendor/dashboard/edit-profile")}
              >
                Profile
              </MenuItem>
              <NavLink to="/vendor/dashboard/change-password">
                <MenuItem>Change Password</MenuItem>
              </NavLink>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
