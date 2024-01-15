import { styled, alpha } from "@mui/material/styles";
import ROUTES from "../../../routes/ROUTES";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  display:
    window.location.pathname === (ROUTES.ITEMS || ROUTES.HOME)
      ? "block"
      : "none",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(1),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  [theme.breakpoints.up("md")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  [theme.breakpoints.up("lg")]: {
    marginRight: theme.spacing(30),
    marginLeft: theme.spacing(60),
    width: "auto",
  },
  [theme.breakpoints.up("xl")]: {
    marginRight: theme.spacing(50),
    marginLeft: theme.spacing(60),
  },
}));
export default Search;
