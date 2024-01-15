import { Route, Routes } from "react-router-dom";
import ROUTES from "./ROUTES";
import HomePage from "../pages/home/HomePage";
import RegisterPage from "../pages/register/RegisterPage";
import Error404Page from "../pages/404/ErrorPage";
import LoginPage from "../pages/login/LoginPage";
import EditItem from "../pages/EditItem/EditItem";
import AuthGuard from "../Guard/AuthGuard";
import BizGuard from "../Guard/BizGuard";
import FavoritePage from "../pages/FavoritePage/FavoritePage";
import Logout from "../pages/login/Logout";
import ProfilePage from "../pages/profilePage/ProfilePage";
import AllUsersPage from "../pages/Sandbox/AllUsersPage";
import AdminGuard from "../Guard/AdminGuard";
import EditUsersPage from "../pages/Sandbox/EditUsersPage";
import AboutPage from "../pages/AboutPage/AboutePage";
import EditProfile from "../pages/profilePage/EditProfile";
import AddItem from "../pages/addItemPage/AddItemComponent";
import MyItemPage from "../pages/myItemPage/MyItemPage";
import ItemsPage from "../pages/itemsPage/ItemsPage";
import ItemDetailsPage from "../pages/ItemDetailsPage/ItemDetailsPage";
import Checkout from "../pages/CheckOutPage/CheckOut";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.ITEMS} element={<ItemsPage />} />
      <Route path={`${ROUTES.ITEM}/:_id`} element={<ItemDetailsPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />

      <Route path={ROUTES.LOGOUT} element={<Logout />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route
        path={`${ROUTES.EDITITEM}/:_id`}
        element={
          <BizGuard>
            <EditItem />
          </BizGuard>
        }
      />
      <Route
        path={ROUTES.MYITEM}
        element={
          <BizGuard>
            <MyItemPage />
          </BizGuard>
        }
      />
      <Route
        path={ROUTES.ADDITEM}
        element={
          <BizGuard>
            <AddItem />
          </BizGuard>
        }
      />

      <Route
        path={ROUTES.USERS}
        element={
          <AdminGuard>
            <AllUsersPage />
          </AdminGuard>
        }
      />
      <Route path={`${ROUTES.EDITUSERS}/:userId`} element={<EditUsersPage />} />
      <Route
        path={ROUTES.FAVORITE}
        element={
          <AuthGuard>
            <FavoritePage />
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.PROFILE}
        element={
          <AuthGuard>
            <ProfilePage />
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.EDITPROFILE}
        element={
          <AuthGuard>
            <EditProfile />
          </AuthGuard>
        }
      />
      <Route
        path={`${ROUTES.CHECKOUT}/:_id`}
        element={
          <AuthGuard>
            <Checkout />
          </AuthGuard>
        }
      />

      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
};
export default Router;
