import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import { Checkout } from "./pages/checkout/Checkout";
import Orders from "./pages/myOrders/Orders";
import { Admin } from "./components/Applayout/admin/Admin";
import { Dashboard } from "./pages/admin/home/Dashboard";
import { UserList } from "./pages/admin/users/UserList";
import AddProducts from "./pages/admin/products/AddProducts";
import ProductList from "./pages/admin/products/ProductList";
import NewOrders from "./pages/admin/orders/NewOrders";
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
import { SingleOrder } from "./pages/admin/orders/SingleOrder";
import OrderDetails from "./pages/myOrders/orderDetails";
import AdminError from "./pages/Error/admin/AdminError";
import { UserRoute } from "./Private/user/UserRoute";
import { AdminRoute } from "./Private/admin/AdminRoute";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<User />}>
            <Route index element={<Home />} />
            <Route path="/recent/:gender" element={<Men />} />
            <Route path="/recent/:gender" element={<Women />} />
            <Route path="/:category/:tags" element={<SkinCare />} />
            <Route
              path="/:category/:tags/:productId"
              element={<SkinCareDetails />}
            />
            <Route
              path="/categories/:category/:gender"
              element={<BodySuitsWomen />}
            />
            <Route
              path="/:category/:gender/:bodysuitId"
              element={<BodySuitsWomenDetails />}
            />

            {/* User Private Route */}
            <Route element={<UserRoute />}>
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order" element={<Orders />} />
              <Route path="/order/:orderId" element={<OrderDetails />} />
            </Route>
            {/* User Private Route */}
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/forgotten-password" element={<ForgottenPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/*" element={<UserError />} />

          {/* admin */}

          <Route path="/admin" element={<Admin />}>
            <Route element={<AdminRoute />}>
              <Route index element={<Dashboard />} />
              <Route path="userList" element={<UserList />} />
              <Route path="add-products" element={<AddProducts />} />
              <Route path="product-list" element={<ProductList />} />
              <Route
                path="edit-product/:productId"
                element={<EditProducts />}
              />
              <Route path="new-order" element={<NewOrders />} />
              <Route path="new-order/:orderId" element={<SingleOrder />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
          </Route>

          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/signin" element={<AdminSignin />} />
          <Route path="/admin/*" element={<AdminError />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
