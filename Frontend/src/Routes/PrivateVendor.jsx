import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateVendorRoute = ({ children }) => {
  const { isAuth, VendorDetail, token } = useSelector(
    (store) => store.VendorAuthManager
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth && !VendorDetail && !token) {
      navigate("/vendor-login");
    }
  }, [isAuth]);

  return <>{children}</>;
};

export default PrivateVendorRoute;
