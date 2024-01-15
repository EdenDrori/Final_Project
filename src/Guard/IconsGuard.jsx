// import { useSelector } from "react-redux";

// const IconsGuard = ({ children }) => {
//   const userData = useSelector((bigPie) => bigPie.authSlice.userData);
//   if (userData && userData.isBusiness) {
//     return children;
//   } else {
//     return;
//   }
// };

// export default IconsGuard;

import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const IconsGuard = ({ children }) => {
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const location = useLocation();

  // Check if the current page is "/my-items"
  const isMyItemsPage = location.pathname === "/myitem";

  // Check if user is a business and on the "/my-items" page
  if (userData && userData.isBusiness && isMyItemsPage) {
    return children;
  } else {
    return null; // Return null to indicate no rendering
  }
};

export default IconsGuard;
