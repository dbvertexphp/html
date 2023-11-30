import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateAdminRoute = ({ children }) => {
  const { isAuth, UserDetail, token } = useSelector(
    (store) => store.UserAuthManager
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth && !UserDetail && !token) {
      navigate("/admin-login");
    }
  }, [isAuth]);

  return <>{children}</>;
};

export default PrivateAdminRoute;
