import { Routes, Route } from "react-router-dom";
import VendorDash from "../Components/VendorComponents/VendorDash";
import VendorTransactions from "../Components/VendorComponents/VendorTransactions";
import VendorCar from "../Components/VendorComponents/VendorCar";
import AddCar from "../Components/VendorComponents/FormComponents/AddCar";
import VendorProfile from "../Components/VendorComponents/VendorProfile";
import EditCar from "../Components/VendorComponents/FormComponents/EditCar";
import VendorBooking from "../Components/VendorComponents/VendorBooking";
import VendorTestDrive from "../Components/VendorComponents/VendorTestDrive";
import VendorChangePassword from "../Components/VendorComponents/VendorChangePassword";

const VendorRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<VendorDash />} />
      <Route
        path="/dashboard/change-password"
        element={<VendorChangePassword />}
      />
      <Route path="/dashboard/edit-profile" element={<VendorProfile />} />
      <Route path="/bookings" element={<VendorBooking />} />
      <Route path="/transactions" element={<VendorTransactions />} />
      <Route path="/testdrives" element={<VendorTestDrive />} />
      <Route path="/cars" element={<VendorCar />} />
      <Route path="/cars/add-car" element={<AddCar />} />
      <Route path="/cars/edit-car/:id" element={<EditCar />} />
    </Routes>
  );
};

export default VendorRoutes;
