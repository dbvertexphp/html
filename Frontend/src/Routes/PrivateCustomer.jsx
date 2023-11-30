import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateCustomer = ({ children }) => {
  const navigate = useNavigate();
  const { Customer_detail, token, isAuth } = useSelector(
    (state) => state.CustomerAuthManager
  );

  useEffect(() => {
    if (!isAuth || !Customer_detail || !token) {
      navigate("/customer-login");
    }
  }, [isAuth, Customer_detail, token, navigate]);

  return <>{children}</>;
};

export default PrivateCustomer;
