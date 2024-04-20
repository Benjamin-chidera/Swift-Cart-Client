import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { User } from "./components/Applayout/user/User";
import Home from "./pages/home/Home";
import { SkinCare } from "./pages/skinCare/SkinCare";
import { SkinCareDetails } from "./pages/skinCare/SkinCareDetails";
import { Clothes } from "./pages/clothes/Clothes";
import { ClothesDetails } from "./pages/clothes/ClothesDetails";
import Shoe from "./pages/shoe/Shoe";
import { ShoesDetails } from "./pages/shoe/ShoesDetails";
import BodySuitsWomen from "./pages/BodySuits/women/BodySuitsWomen";
import BodySuitsWomenDetails from "./pages/BodySuits/women/BodySuitsWomenDetails";
import LoungeWomenDetails from "./pages/Lounge/women/LoungeWomenDetails";
import LoungeWomen from "./pages/Lounge/women/LoungeWomen";
import BodySuitsMen from "./pages/BodySuits/men/BodySuitsMen";
import LoungeMen from "./pages/Lounge/men/LoungeMen";
import LoungeMenDetails from "./pages/Lounge/men/LoungeMenDetails";
import { Checkout } from "./pages/checkout/Checkout";
import Orders from "./pages/myOrders/Orders";
import { Admin } from "./components/Applayout/admin/Admin";
import { Dashboard } from "./pages/admin/home/Dashboard";
import { UserList } from "./pages/admin/users/UserList";
import { UserProfile } from "./pages/admin/users/UserProfile";
import AddProducts from "./pages/admin/products/AddProducts";
import ProductList from "./pages/admin/products/ProductList";
import NewOrders from "./pages/admin/orders/NewOrders";
import OrderHistory from "./pages/admin/orders/OrderHistory";
import Reviews from "./pages/admin/reviews/Reviews";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import ForgottenPassword from "./pages/auth/ForgottenPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import EditProducts from "./pages/admin/products/EditProducts";
import { Men } from "./components/home/recent/Men";
import { Women } from "./components/home/recent/Women";
import AdminSignup from "./pages/admin/auth/Signup";
import AdminSignin from "./pages/admin/auth/Signin";
import UserError from "./pages/Error/user/UserError";

const router = createBrowserRouter([
  // user
  {
    element: <User />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/recent/:gender",
        element: <Men />,
      },
      {
        path: "/recent/:gender",
        element: <Women />,
      },
      {
        path: "/:category/:tags",
        element: <SkinCare />,
      },
      {
        path: "/skinCare/:productId",
        element: <SkinCareDetails />,
      },
      {
        path: "/:category/:tags",
        element: <Clothes />,
      },
      {
        path: "/clothesDetails/:clothesId",
        element: <ClothesDetails />,
      },
      {
        path: "/:category/:tags",
        element: <Shoe />,
      },
      {
        path: "/shoesDetails/:shoesId",
        element: <ShoesDetails />,
      },
      {
        path: "/categories/:category/:gender",
        element: <BodySuitsWomen />,
      },
      {
        path: "/bodysuits-women-Details/:bodysuitId",
        element: <BodySuitsWomenDetails />,
      },
      {
        path: "/categories/:category/:gender",
        element: <BodySuitsMen />,
      },
      {
        path: "/bodysuits-men-Details/:bodysuitId",
        element: <BodySuitsWomenDetails />,
      },
      {
        path: "/categories/:category/:gender",
        element: <LoungeWomen />,
      },
      {
        path: "/lounge-women-Details/:loungeId",
        element: <LoungeWomenDetails />,
      },
      {
        path: "/lounge/men/:category",
        element: <LoungeMen />,
      },
      {
        path: "/lounge-men-Details/:loungeId",
        element: <LoungeMenDetails />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/order",
        element: <Orders />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/forgotten-password",
        element: <ForgottenPassword />,
      },
      {
        path: "/reset-password/:token",
        element: <ResetPassword />,
      },
      {
        path: "*",
        element: <UserError />,
      },
    ],
  },

  // admin
  {
    element: <Admin />,
    path: "/admin",
    children: [
      {
        index: "/",
        element: <Dashboard />,
      },
      {
        path: "userList",
        element: <UserList />,
      },

      {
        path: "add-products",
        element: <AddProducts />,
      },
      {
        path: "product-list",
        element: <ProductList />,
      },
      {
        path: "edit-product/:productId",
        element: <EditProducts />,
      },
      {
        path: "new-order",
        element: <NewOrders />,
      },
      {
        path: "order-history",
        element: <OrderHistory />,
      },
      {
        path: "reviews",
        element: <Reviews />,
      },
      {
        path: "/admin/signup",
        element: <AdminSignup />,
      },
      {
        path: "/admin/signin",
        element: <AdminSignin />,
      },
      {
        path: "*",
        element: <UserError />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
