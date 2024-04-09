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
        path: "/skin/:category",
        element: <SkinCare />,
      },
      {
        path: "/skinCare/:productId",
        element: <SkinCareDetails />,
      },
      {
        path: "/clothes/:category",
        element: <Clothes />,
      },
      {
        path: "/clothesDetails/:clothesId",
        element: <ClothesDetails />,
      },
      {
        path: "/shoes/:category",
        element: <Shoe />,
      },
      {
        path: "/shoesDetails/:shoesId",
        element: <ShoesDetails />,
      },
      {
        path: "/bodysuits/women/:category",
        element: <BodySuitsWomen />,
      },
      {
        path: "/bodysuits-women-Details/:bodysuitId",
        element: <BodySuitsWomenDetails />,
      },
      {
        path: "/bodysuits/men/:category",
        element: <BodySuitsMen />,
      },
      {
        path: "/bodysuits-men-Details/:bodysuitId",
        element: <BodySuitsWomenDetails />,
      },
      {
        path: "/lounge/women/:category",
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
