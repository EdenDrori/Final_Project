import { Box, Drawer } from "@mui/material";
import { useSelector } from "react-redux";
import { getToken } from "../../../service/storageService";
import { jwtDecode } from "jwt-decode";
import NavLinkComponent from "../NavLinkComponent";
import myLinks, {
  alwaysLinks,
  loggedInLinks,
  loggedOutLinks,
  loggedInBizLinks,
  loggedInAdminLinks,
} from "../../myLinks";
import nextKey from "generate-my-key";

const LeftDrawerComponent = ({ isOpen, onCloseDrawer }) => {
  const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);

  let token = getToken();
  let loggedInBiz = token ? jwtDecode(token).isBusiness : false;
  let loggedInAdmin = token ? jwtDecode(token).isAdmin : false;
  const list = () => (
    <Box
      sx={{ width: { auto: 250 }, display: "flex", flexDirection: "column" }}
      role="presentation"
      onClick={onCloseDrawer}
      onKeyDown={onCloseDrawer}
    >
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
  return (
    <Drawer anchor="left" open={isOpen} onClose={onCloseDrawer}>
      {list()}
    </Drawer>
  );
};

export default LeftDrawerComponent;
