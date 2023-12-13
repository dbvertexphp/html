import { Routes, Route } from "react-router-dom";
import EmployeeDash from "../Components/EmployeeComponents/EmployeeDash";
import VendorTransactions from "../Components/VendorComponents/VendorTransactions";
import EmployeeCar from "../Components/EmployeeComponents/EmployeeCar";
import EmployeeVendor from "../Components/EmployeeComponents/EmployeeVendor";
import EditVendor from "../Components/EmployeeComponents/EmployeeVendor/EditVendor";
import AddCar from "../Components/VendorComponents/FormComponents/AddCar";
import EmployeeProfile from "../Components/EmployeeComponents/EmployeeProfile";
import EditCar from "../Components/VendorComponents/FormComponents/EditCar";
import EmployeeBooking from "../Components/EmployeeComponents/EmployeeBooking";
import EmployeeTestDrive from "../Components/EmployeeComponents/EmployeeTestDrive";
import EmployeeChangePassword from "../Components/EmployeeComponents/EmployeeChangePassword";

const EmployeeRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<EmployeeDash />} />
      <Route
        path="/dashboard/change-password"
        element={<EmployeeChangePassword />}
      />
      <Route path="/dashboard/edit-profile" element={<EmployeeProfile />} />
      <Route path="/vendor" element={<EmployeeVendor />} />
      <Route path="/vendor/edit/:id" element={<EditVendor />} />
      <Route path="/car" element={<EmployeeCar />} />
      <Route path="/booking" element={<EmployeeBooking />} />
      <Route path="/testdrives" element={<EmployeeTestDrive />} />
    </Routes>
  );
};

export default EmployeeRoutes;
