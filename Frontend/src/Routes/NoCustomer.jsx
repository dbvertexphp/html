import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NoCustomer = ({ children }) => {
  const navigate = useNavigate();
  const { Customer_detail, token, isAuth } = useSelector(
    (state) => state.CustomerAuthManager
  );

  useEffect(() => {
    if (isAuth || Customer_detail || token) {
      navigate("/customer");
    }
  }, []);

  return <>{children}</>;
};

export default NoCustomer;
