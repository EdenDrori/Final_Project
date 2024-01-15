import ROUTES from "../routes/ROUTES";

const myLinks = [
  { to: ROUTES.HOME, children: "Home" },
  { to: ROUTES.REGISTER, children: "Register" },
  { to: ROUTES.LOGIN, children: "Login" },
];

const alwaysLinks = [
  { to: ROUTES.HOME, children: "Home" },
  { to: ROUTES.ITEMS, children: "Shop Now" },
  { to: ROUTES.ABOUT, children: "About" },
];
const loggedInLinks = [
  { to: ROUTES.PROFILE, children: "Profile" },
  { to: ROUTES.FAVORITE, children: "Favorite" },
  { to: ROUTES.LOGOUT, children: "Logout" },
];
const loggedInBizLinks = [
  { to: ROUTES.PROFILE, children: "Profile" },
  { to: ROUTES.MYITEM, children: "My Items" },
  //{ to: ROUTES.CREATEITEM, children: "New Item" },
  { to: ROUTES.FAVORITE, children: "Favorite" },
  { to: ROUTES.LOGOUT, children: "Logout" },
];
const loggedInAdminLinks = [{ to: ROUTES.USERS, children: "CRM" }];

const loggedOutLinks = [
  { to: ROUTES.REGISTER, children: "Register" },
  { to: ROUTES.LOGIN, children: "Login" },
];

export default myLinks;
export {
  alwaysLinks,
  loggedInLinks,
  loggedOutLinks,
  loggedInBizLinks,
  loggedInAdminLinks,
};
