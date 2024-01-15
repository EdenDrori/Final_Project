import { useSelector } from "react-redux";

const LoggedOutGuard = ({ children }) => {
  const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);
  if (loggedIn) {
    return children;
  } else {
    return;
  }
};
export default LoggedOutGuard;
