import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { hostInfo } = useSelector((state) => state.auth);

  if (userInfo || hostInfo) {
    return <Outlet />;
  } else {
    return <Navigate to="/" replace />;
  }
};
export default PrivateRoute;
