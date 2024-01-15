import { Box } from "@mui/material";
import nextKey from "generate-my-key";
import myLinks, {
  alwaysLinks,
  loggedInLinks,
  loggedOutLinks,
  loggedInBizLinks,
  loggedInAdminLinks,
} from "../../myLinks";
import NavLinkComponent from "../NavLinkComponent";
import { useSelector } from "react-redux";
import { getToken } from "../../../service/storageService";
import { jwtDecode } from "jwt-decode";

const Links = () => {
  const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);

  let token = getToken();
  let loggedInBiz = token ? jwtDecode(token).isBusiness : false;
  let loggedInAdmin = token ? jwtDecode(token).isAdmin : false;

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {alwaysLinks.map((myItem) => (
        <NavLinkComponent to={myItem.to} key={nextKey()}>
          {myItem.children}
        </NavLinkComponent>
      ))}
      {loggedIn &&
        !loggedInBiz &&
        loggedInLinks.map((myItem) => (
          <NavLinkComponent to={myItem.to} key={nextKey()}>
            {myItem.children}
          </NavLinkComponent>
        ))}
      {loggedIn &&
        loggedInBiz &&
        loggedInBizLinks.map((myItem) => (
          <NavLinkComponent to={myItem.to} key={nextKey()}>
            {myItem.children}
          </NavLinkComponent>
        ))}
      {loggedIn &&
        loggedInBiz &&
        loggedInAdmin &&
        loggedInAdminLinks.map((myItem) => (
          <NavLinkComponent to={myItem.to} key={nextKey()}>
            {myItem.children}
          </NavLinkComponent>
        ))}
      {!loggedIn &&
        !loggedInBiz &&
        loggedOutLinks.map((myItem) => (
          <NavLinkComponent to={myItem.to} key={nextKey()}>
            {myItem.children}
          </NavLinkComponent>
        ))}
    </Box>
  );
};

export default Links;
