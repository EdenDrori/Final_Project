import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

const Logout = () => {
  const dispach = useDispatch();
  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
    dispach(authActions.logout());
  }, []);

  return <Navigate to={ROUTES.LOGIN} replace={true} />;
};
export default Logout;
