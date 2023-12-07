import { Routes, Route } from "react-router-dom";
import EmployeeDash from "../Components/EmployeeComponents/EmployeeDash";
import VendorTransactions from "../Components/VendorComponents/VendorTransactions";
import VendorCar from "../Components/VendorComponents/VendorCar";
import AddCar from "../Components/VendorComponents/FormComponents/AddCar";
import VendorProfile from "../Components/VendorComponents/VendorProfile";
import EditCar from "../Components/VendorComponents/FormComponents/EditCar";
import VendorBooking from "../Components/VendorComponents/VendorBooking";
import VendorTestDrive from "../Components/VendorComponents/VendorTestDrive";
import VendorChangePassword from "../Components/VendorComponents/VendorChangePassword";

const EmployeeRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<EmployeeDash />} />
     
    
    </Routes>
  );
};

export default EmployeeRoutes;
