import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateEmployeeRoute = ({ children }) => {
  const { isAuth, EmployeeDetail, token } = useSelector(
    (store) => store.EmployeeAuthManager
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth && !EmployeeDetail && !token) {
      navigate("/employee-login");
    }
  }, [isAuth]);

  return <>{children}</>;
};

export default PrivateEmployeeRoute;
