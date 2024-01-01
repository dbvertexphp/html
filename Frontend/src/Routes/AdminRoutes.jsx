import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDash from "../Components/AdminComponents/AdminDash";
import AdminCustomer from "../Components/AdminComponents/AdminCustomer";
import AdminVendor from "../Components/AdminComponents/AdminVendor";
import AdminWebsite from "../Components/AdminComponents/AdminWebsite";
import AddVendor from "../Components/AdminComponents/AdminVendor/AddVendor";
import EditVendor from "../Components/AdminComponents/AdminVendor/EditVendor";
import AdminCar from "../Components/AdminComponents/AdminCar";
import AdminReport from "../Components/AdminComponents/AdminReport";
import AdminCarComponent from "../Components/AdminComponents/AdminCarComponents/AdminCarComponent";
import ChangePassword from "../Components/AdminComponents/AdminChangePassword";
import UploadStuff from "../Components/Extra/UploadStuff";
import AdminEmployees from "../Components/AdminComponents/AdminEmployees";
import AddEmployees from "../Components/AdminComponents/AdminEmployees/AddEmployees";
import EditEmployees from "../Components/AdminComponents/AdminEmployees/EditEmployees";
import AdminTestdrive from "../Components/AdminComponents/AdminTestdrive";
import AdminBookings from "../Components/AdminComponents/AdminBookings";
import EditCar from "../Components/VendorComponents/FormComponents/EditCar";
import AdminCarEdit from "../Components/AdminComponents/AdminCarEdit";
import CarModelTable from "../Components/AdminComponents/AdminCarComponents/CarModel/CarModelTable";
import BodyTypeTable from "../Components/AdminComponents/AdminCarComponents/BodyType/BodyTypeTable";
import CarNameTable from "../Components/AdminComponents/AdminCarComponents/CarName/CarNameTable";
import MakeTable from "../Components/AdminComponents/AdminCarComponents/Make/MakeTable";
import LocationTable from "../Components/AdminComponents/AdminCarComponents/Location/LocationTable";
import ColorTable from "../Components/AdminComponents/AdminCarComponents/Color/ColorTable";
import TestimonialSection from "../Components/AdminComponents/WebsiteTabs/TestimonialSection";
import HompageBanner from "../Components/AdminComponents/WebsiteTabs/HomepageBanner";
import BrandSection from "../Components/AdminComponents/WebsiteTabs/BrandSection";
import ReportTransaction from "../Components/AdminComponents/AdminReport/ReportTransaction";
import ReportTestDrive from "../Components/AdminComponents/AdminReport/ReportTestDrive";
import ReportBooking from "../Components/AdminComponents/AdminReport/ReportBooking";
import ReportCustomer from "../Components/AdminComponents/AdminReport/ReportCustomer";
import ReportVendor from "../Components/AdminComponents/AdminReport/ReportVendor";
import ReportEmployee from "../Components/AdminComponents/AdminReport/ReportEmployee";
import AdminTransactions from "../Components/AdminComponents/AdminTransactions";
import ReportCar from "../Components/AdminComponents/AdminReport/ReportCar";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<AdminDash />} />
      <Route path="/dashboard/change-password" element={<ChangePassword />} />
      <Route path="/dashboard/upload-images" element={<UploadStuff />} />

      <Route path="/customer" element={<AdminCustomer />} />

      <Route path="/vendor" element={<AdminVendor />} />
      <Route path="/vendor/add-vendor" element={<AddVendor />} />
      <Route path="/vendor/edit/:id" element={<EditVendor />} />

      <Route path="/car" element={<AdminCar />} />

      <Route path="/components/brand" element={<MakeTable />} />
      <Route path="/components/model" element={<CarModelTable />} />
      <Route path="/components/name" element={<CarNameTable />} />
      <Route path="/components/bodytype" element={<BodyTypeTable />} />
      <Route path="/components/location" element={<LocationTable />} />
      <Route path="/components/color" element={<ColorTable />} />

      <Route path="/booking" element={<AdminBookings />} />
      <Route path="/transaction" element={<AdminTransactions />} />
      <Route path="/employees" element={<AdminEmployees />} />
      <Route path="/employees/add-employees" element={<AddEmployees />} />
      <Route path="/employees/edit/:id" element={<EditEmployees />} />
      <Route path="/car/edit/:id" element={<AdminCarEdit />} />
      <Route path="/test-drives" element={<AdminTestdrive />} />

      <Route path="/website/banners" element={<HompageBanner />} />
      <Route path="/website/testimonials" element={<TestimonialSection />} />
      <Route path="/website/brands" element={<BrandSection />} />
      <Route path="/website/upload" element={<UploadStuff />} />

      <Route path="/report/transaction" element={<ReportTransaction />} />
      <Route path="/report/testdrive" element={<ReportTestDrive />} />
      <Route path="/report/booking" element={<ReportBooking />} />
      <Route path="/report/customer" element={<ReportCustomer />} />
      <Route path="/report/vendor" element={<ReportVendor />} />
      <Route path="/report/employee" element={<ReportEmployee />} />
      <Route path="/report/car" element={<ReportCar />} />
    </Routes>
  );
};

export default AdminRoutes;
