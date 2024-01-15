import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const NavLinkComponent = ({ to, children }) => {
  return (
    <NavLink to={to} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <Typography
          color={isActive ? "text.secondary" : "text.primary"}
          backgroundColor={isActive ? "rgba(0, 0, 0, 0.1)" : "none"}
          sx={{
            p: 2,
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          {children}
        </Typography>
      )}
    </NavLink>
  );
};
{
}
export default NavLinkComponent;
