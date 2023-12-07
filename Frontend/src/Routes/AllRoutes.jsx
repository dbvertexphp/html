import { Routes, Route, useLocation } from "react-router-dom";
import Login from "../Pages/Login";
import VendorLogin from "../Pages/VendorLogin";
import EmployeeLogin from "../Pages/EmployeeLogin";
import VendorDashboard from "../Pages/VendorDashboard";
import EmployeeDashboard from "../Pages/EmployeeDashboard";
import AdminDashboard from "../Pages/AdminDashboard";
import PrivateAdminRoute from "./PrivateAdmin";
import PrivateVendorRoute from "./PrivateVendor";
import PrivateEmployeeRoute from "./PrivateEmployee";
import WebsiteLayout from "../Components/WebsiteComponents/WebsiteLayout";
import Homepage from "../Pages/Homepage";
import Aboutpage from "../Pages/Aboutpage";
import ContactUs from "../Pages/ContactUs";
import PrivacyPolicyX from "../Pages/PrivacyPolicyX";
import Terms from "../Pages/Terms";
import ProductPage from "../Pages/ProductPage";
import SearchPage from "../Pages/SearchPage";
import Faq from "../Pages/Faq";
import CustomerLogin from "../Pages/CustomerLogin";
import CustomerRegister from "../Pages/CustomerRegister";
import Layout from "../Components/CustomerComponents/Layout";
import Dashboard from "../Components/CustomerComponents/Dashboard";
import EditProfile from "../Components/CustomerComponents/EditProfile";
import Orders from "../Components/CustomerComponents/Orders";
import ErrorPage from "../Pages/ErrorPage";
import CustomerLoginEmail from "../Pages/CustomerLoginEmail";
import VendorRegister from "../Pages/VendorRegister";
import Transaction from "../Components/CustomerComponents/Transaction";

import PrivateCustomer from "./PrivateCustomer";
import NoCustomer from "./NoCustomer";
import TestDrive from "../Components/CustomerComponents/TestDrive";
import ReturnPolicy from "../Pages/ReturnPolicy";
import { useEffect } from "react";
import PaymentSuccess from "../Components/Extra/PaymentSuccess";
import PaymentFailed from "../Components/Extra/PaymentFailed";
import CustomerChangePassword from "../Components/CustomerComponents/CustomerChangePassword";

const AllRoutes = () => {
  const Location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [Location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<WebsiteLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/about" element={<Aboutpage />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyX />} />
        <Route path="/refund-policy" element={<ReturnPolicy />} />
        <Route path="/terms-conditions" element={<Terms />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/collection" element={<SearchPage />} />
        <Route path="/vendor-register" element={<VendorRegister />} />

        <Route
          path="/customer-login"
          element={
            <NoCustomer>
              <CustomerLogin />
            </NoCustomer>
          }
        />
        <Route
          path="/customer-email-login"
          element={
            <NoCustomer>
              <CustomerLoginEmail />
            </NoCustomer>
          }
        />
        <Route
          path="/customer-register"
          element={
            <NoCustomer>
              <CustomerRegister />
            </NoCustomer>
          }
        />
        <Route
          path="/customer"
          element={
            <PrivateCustomer>
              <Layout />
            </PrivateCustomer>
          }
        >
          <Route
            index
            element={
              <PrivateCustomer>
                <Dashboard />
              </PrivateCustomer>
            }
          />
          <Route
            path="/customer/edit-profile"
            element={
              <PrivateCustomer>
                <EditProfile />
              </PrivateCustomer>
            }
          />
          <Route
            path="/customer/change-password"
            element={
              <PrivateCustomer>
                <CustomerChangePassword />
              </PrivateCustomer>
            }
          />
          <Route
            path="/customer/bookings"
            element={
              <PrivateCustomer>
                <Orders />
              </PrivateCustomer>
            }
          />
          <Route
            path="/customer/test-drives"
            element={
              <PrivateCustomer>
                <TestDrive />
              </PrivateCustomer>
            }
          />{" "}
          <Route
            path="/customer/transaction"
            element={
              <PrivateCustomer>
                <Transaction />
              </PrivateCustomer>
            }
          />
        </Route>
      </Route>
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/payment-failed" element={<PaymentFailed />} />
      <Route path="/admin-login" element={<Login />} />
      <Route
        path="/admin/*"
        element={
          <PrivateAdminRoute>
            <AdminDashboard />
          </PrivateAdminRoute>
        }
      />

      <Route path="/vendor-login" element={<VendorLogin />} />
      <Route
        path="/vendor/*"
        element={
          <PrivateVendorRoute>
            <VendorDashboard />
          </PrivateVendorRoute>
        }
      />
 <Route path="/employee-login" element={<EmployeeLogin />} />
 <Route
        path="/employee/*"
        element={
          <PrivateEmployeeRoute>
            <EmployeeDashboard />
          </PrivateEmployeeRoute>
        }
      />
      <Route path="*" element={<ErrorPage />} />
     
    </Routes>
  );
};

export default AllRoutes;
