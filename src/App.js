import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import "./App.css";
import AllOrder from "./components/Admin/AllOrder";
import AllProducts from "./components/Admin/AllProducts";
import AllReviews from "./components/Admin/AllReviews";
import AllUsers from "./components/Admin/AllUsers";
import CreateProduct from "./components/Admin/CreateProduct";
import Dashboard from "./components/Admin/Dashboard";
import EditProduct from "./components/Admin/EditProduct";
import UpdateOrder from "./components/Admin/UpdateOrder";
import UpdateUser from "./components/Admin/UpdateUser";
import LoginSignup from "./components/Authentication/SignUpLogin";
import Cart from "./components/cart/Cart";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Favourites from "./components/cart/FavItems";
import Payment from "./components/cart/Payment";
import Shipping from "./components/cart/Shipping";
import Success from "./components/cart/Success";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import EditProfile from "./components/User/EditProfile";
import ForgotPassword from "./components/User/ForgotPass";
import MoreOption from "./components/User/MoreOption";
import MyOrder from "./components/User/MyOrder";
import MyOrderDetails from "./components/User/MyOrderdetails";
import Profile from "./components/User/Profile";
import ResetPassword from "./components/User/ResetPass";
import UpdatePassword from "./components/User/UpdatePass";
import Contact from "./pages/Contact";
import Notfound from "./more/NotFound";
import Support from "./more/Support";
import UserData from "./more/Userdata";
import About from "./pages/About";
// import { loadUser } from "./redux/actions/userAction";
import Store from "./store";
import ProtectedRoute from "./route/ProtectedRoute";
import { loadUser } from "./redux/actions/userAction";
function App() {
  // const [stripeApiKey, setStripeApiKey] = useState("");
  const { isAuthenticated, user } = useSelector((state) => state.user);

  // async function getStripeApiKey() {
  //   const { data } = await axios.get("/api/v2/stripeapikey");

  //   setStripeApiKey(data.stripeApiKey);
  // }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    Store.dispatch(loadUser());
    // getStripeApiKey();
  }, []);

  return (
    <BrowserRouter>
      {isAuthenticated && <UserData user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/support" element={<Support />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/more" element={<MoreOption />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/contact" element={<Contact />} />
        {/* protected routes  */}
        <Route
          path="/me"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/me/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/me/update/info"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login/shipping"
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/confirm"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <Success />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <MyOrderDetails />
            </ProtectedRoute>
          }
        />
        {/* admin routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/product"
          element={
            <ProtectedRoute isAdmin={true}>
              <CreateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute isAdmin={true}>
              <AllProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/product/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <EditProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute isAdmin={true}>
              <AllOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/order/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute isAdmin={true}>
              <AllUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/user/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute isAdmin={true}>
              <AllReviews />
            </ProtectedRoute>
          }
        />
        {/* {stripeApiKey && (
          <Route
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              </Elements>
            }
          />
        )} */}

        {/* Fallback route */}
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
