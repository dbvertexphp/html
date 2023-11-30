import React, { useEffect, useState } from "react";
import {
  NavLink,
  Route,
  Link as RouteLink,
  Routes,
  useNavigate,
} from "react-router-dom";
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
  Tag,
  Heading,
  List,
  ListItem,
} from "@chakra-ui/react";
import {
  FiUser,
  FiHome,
  FiTruck,
  FiBriefcase,
  FiPackage,
  FiMenu,
  FiBell,
  FiUsers,
  FiChevronDown,
  FiGitBranch,
  FiFileText,
  FiSend,
  FiSettings,
  FiShoppingCart,
  FiPaperclip,
  FiDollarSign,
  FiHeadphones,
  FiInfo,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import AdminRoutes from "../Routes/AdminRoutes";
import { AiFillLayout, AiOutlineCar } from "react-icons/ai";
import { BiSolidReport } from "react-icons/bi";
import { BsFillMenuAppFill } from "react-icons/bs";
import { getSalesDetails } from "../Redux/App/Actions/Admin/Website/Website.action";
import IndianNumberSystem from "../utils/IndianNumSystem";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

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
        <AdminRoutes />
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const navigate = useNavigate();
  const [Active, setActive] = useState("");
  let location = window.location.href;
  let tabopen = location.split("/")[4]?.split("?")[0];
  const subItemsComponents = [
    { path: "/components/brand", label: "Car Brands" },
    { path: "/components/model", label: "Car Models" },
    { path: "/components/name", label: "Car Names" },
    { path: "/components/bodytype", label: "Car Body Types" },
    { path: "/components/location", label: "Locations" },
    { path: "/components/color", label: "Colours" },
  ];

  const subItemsWebsite = [
    { path: "/website/banners", label: "Homepage Banners" },
    { path: "/website/brands", label: "Brands" },
    { path: "/website/testimonials", label: "Testimonials" },
    { path: "/website/upload", label: "Upload Image/Files" },
  ];

  const subItemsReports = [
    { path: "/report/booking", label: "Booking" },
    { path: "/report/testdrive", label: "Test Drive" },
    { path: "/report/transaction", label: "Transaction" },
    { path: "/report/car", label: "Cars" },
    { path: "/report/employee", label: "Employees" },
    { path: "/report/customer", label: "Customers" },
    { path: "/report/vendor", label: "Vendors" },
  ];
  useEffect(() => {
    if (!tabopen) {
      navigate("dashboard");
    }
    setActive("admin/" + tabopen);
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
      overflow={"auto"}
      {...rest}
    >
      <Flex
        alignItems="center"
        p="2"
        justifyContent="space-between"
        position={"sticky"}
        top="0"
        zIndex={"10"}
        bg="white"
      >
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
        path={"admin/dashboard"}
        setActive={setActive}
        Active={Active}
      >
        <Text size={"sm"}> Dashboard</Text>
      </NavItem>
      <NavItem
        key={"Booking"}
        icon={BsFillMenuAppFill}
        path={"admin/booking"}
        Active={Active}
        setActive={setActive}
      >
        <Text size={"sm"}>Bookings</Text>
      </NavItem>
      <NavItem
        key={"Vendor"}
        icon={FiUsers}
        path={"admin/vendor"}
        Active={Active}
        setActive={setActive}
      >
        <Text size={"sm"}> Vendor</Text>
      </NavItem>

      <NavItem
        key={"Customer"}
        icon={FiUsers}
        path={"admin/customer"}
        setActive={setActive}
        Active={Active}
      >
        <Text size={"sm"}> Customers</Text>
      </NavItem>

      <NavItem
        key={"Employees"}
        icon={FiBriefcase}
        path={"admin/employees"}
        Active={Active}
        setActive={setActive}
      >
        <Text size={"sm"}>Employees</Text>
      </NavItem>

      <NavItem
        key={"Car"}
        icon={FiTruck}
        path={"admin/car"}
        Active={Active}
        setActive={setActive}
      >
        <Text size={"sm"}>Car</Text>
      </NavItem>

      {/* <NavItem
        key={"Car-Components"}
        icon={AiOutlineCar}
        // path={"admin/car-components"}
        setActive={setActive}
        Active={Active}
      >
        <Text size={"sm"}>Components</Text>
      </NavItem> */}

      <NavItemDropdown
        icon={AiOutlineCar} // Replace with your icon component or class
        subItems={subItemsComponents}
        activeItem={Active}
        setActiveItem={setActive}
      >
        <Text size={"sm"}>Components</Text>
      </NavItemDropdown>

      <NavItem
        key={"Test Drives"}
        icon={FiInfo}
        path={"admin/test-drives"}
        Active={Active}
        setActive={setActive}
      >
        <Text size={"sm"}>Test Drives</Text>
      </NavItem>

      <NavItemDropdown
        icon={AiFillLayout} // Replace with your icon component or class
        subItems={subItemsWebsite}
        activeItem={Active}
        setActiveItem={setActive}
      >
        <Text size={"sm"}>Website</Text>
      </NavItemDropdown>

      <NavItem
        key={"Report"}
        icon={FiFileText}
        path={"admin/transaction"}
        Active={Active}
        setActive={setActive}
      >
        <Text size={"sm"}>Transactions</Text>
      </NavItem>

      <NavItemDropdown
        icon={BiSolidReport} // Replace with your icon component or class
        subItems={subItemsReports}
        activeItem={Active}
        setActiveItem={setActive}
      >
        <Text size={"sm"}>Reports</Text>
      </NavItemDropdown>

      {/*} <NavItem
        key={"Support"}
        icon={FiHeadphones}
        path={"admin/support"}
        Active={Active}
        setActive={setActive}
      >
        <Text size={"sm"}>Support</Text>
  </NavItem> */}
      {/* <NavItem
        key={"Transactions"}
        icon={FiDollarSign}
        path={"admin/transactions"}
        Active={Active}
        setActive={setActive}
      >
        <Text size={"sm"}>Transactions</Text>
      </NavItem> */}
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
        p="3.5"
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

const NavItemDropdown = ({
  icon,
  children,
  subItems,
  isOpen,
  setOpen,
  activeItem,
  setActiveItem,
  ...rest
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(isOpen);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleItemClick = (path) => {
    setActiveItem(path);
  };

  return (
    <div>
      <div onClick={toggleDropdown} style={{ cursor: "pointer" }}>
        <Flex
          align="center"
          p="3.5"
          mx="4"
          my="1"
          borderRadius="5px"
          role="group"
          cursor="pointer"
          // bg={activeItem ? "#30829c" : "white"}
          // color={activeItem ? "white" : "black"}
          // fontWeight={activeItem ? "600" : "400"}
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
          {isDropdownOpen ? (
            <ChevronUpIcon
              sx={{
                display: open ? "block" : "none",
                paddingLeft: "5px",
                fontSize: "25px",
              }}
            />
          ) : (
            <ChevronDownIcon
              sx={{
                display: open ? "block" : "none",
                paddingLeft: "5px",
                fontSize: "25px",
              }}
            />
          )}
        </Flex>
      </div>
      {isDropdownOpen && (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {subItems.map((item) => (
            <li key={item.path}>
              <RouteLink
                to={"/admin" + item.path}
                style={{ textDecoration: "none" }}
              >
                <div
                  onClick={() => handleItemClick(item.path)}
                  style={{ cursor: "pointer" }}
                >
                  <Flex
                    align="center"
                    p="3"
                    pl="12"
                    mx="4"
                    my="1"
                    borderRadius="5px"
                    role="group"
                    cursor="pointer"
                    bg={item.path === activeItem ? "#30829c" : "white"}
                    color={item.path === activeItem ? "white" : "black"}
                    fontWeight={item.path === activeItem ? "600" : "400"}
                    _hover={{
                      bg: "#30829c",
                      color: "white",
                    }}
                  >
                    {item.icon && (
                      <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                          color: "white",
                        }}
                        as={item.icon}
                      />
                    )}
                    {item.label}
                  </Flex>
                </div>
              </RouteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [sales, setsales] = useState({});
  let { User_detail, token } = useSelector((store) => store?.UserAuthManager);
  const user =
    User_detail || JSON.parse(localStorage.getItem("user_detail_carvendor"));
  let admintoken =
    token || JSON.parse(localStorage.getItem("admin_token_carvendor"));

  const getData = (e) => {
    dispatch(getSalesDetails(setsales, admintoken));
  };

  useEffect(() => {
    getData();
  }, []);
  const handleLogout = () => {
    dispatch({ type: "USER_LOGOUT" });
    toast({
      title: "Logout Successfull.",
      description: "You have been successfully logged out.",
      status: "info",
      duration: 4000,
      isClosable: true,
    });
  };

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
        {user?.role == "Admin" && (
          <Tag
            cursor={"pointer"}
            onClick={() => navigate("/admin/transaction")}
            variant="outline"
            color="#30829c"
            padding={"8px"}
            visibility={{ base: "hidden", md: "visible" }}
          >
            <VStack spacing={{ base: "0", md: "0" }} alignItems="flex-end">
              <Text fontSize="s">
                <b>Daily Sales</b>
              </Text>
              <Text fontSize="xs" mt="1" color="gray.600">
                ₹ {IndianNumberSystem(sales.daily)}
              </Text>
            </VStack>
          </Tag>
        )}

        {user?.role == "Admin" && (
          <Tag
            cursor={"pointer"}
            onClick={() => navigate("/admin/transaction")}
            variant="outline"
            color="#30829c"
            padding={"8px"}
            visibility={{ base: "hidden", md: "visible" }}
          >
            <VStack spacing={{ base: "0", md: "0" }} alignItems="flex-end">
              <Text fontSize="s">
                <b>Monthly Sales</b>
              </Text>
              <Text fontSize="xs" mt="1" color="gray.600">
                ₹ {IndianNumberSystem(sales.monthly)}
              </Text>
            </VStack>
          </Tag>
        )}

        {user?.role == "Admin" && (
          <Tag
            cursor={"pointer"}
            onClick={() => navigate("/admin/transaction")}
            variant="outline"
            color="#30829c"
            padding={"8px"}
            visibility={{ base: "hidden", md: "visible" }}
          >
            <VStack spacing={{ base: "0", md: "0" }} alignItems="flex-end">
              <Text fontSize="s">
                <b>Total Sales</b>
              </Text>
              <Text fontSize="xs" mt="1" color="gray.600">
                ₹ {IndianNumberSystem(sales.total)}
              </Text>
            </VStack>
          </Tag>
        )}

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
                  <Text fontSize="sm">
                    {user?.first_name + " " + user?.last_name}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    {user?.role}
                  </Text>
                </VStack>
                <Avatar size={"sm"} src={avatar} />
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <NavLink to="/admin/dashboard/change-password">
                <MenuItem>Change Password</MenuItem>
              </NavLink>
              <NavLink to="/admin/dashboard/upload-images">
                <MenuItem>Upload Images</MenuItem>
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
