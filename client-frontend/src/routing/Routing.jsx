import { Routes, Route } from "react-router";
import Home from "../pages/Home";
import FoodsPage from "../components/food-page/FoodPage";
import FoodDescPage from "../pages/FoodDescPage";
import Login from "../components/login/Login";
import Signup from "../components/signup/Signup";
import PrivateRouting from "./PrivateRouting";
import Profile from "../pages/Profile";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import AboutUs from "../pages/AboutUs";
import AdminDashboard from "../admin/AdminDashboard";
import AdminLogin from "../admin/AdminLogin";
const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/all-foods" element={<FoodsPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/all-foods/:cat/" element={<FoodsPage />} />
      <Route path="/all-foods/:cat/:id" element={<FoodDescPage />} />
      <Route
        path="/login"
        element={
          <PrivateRouting>
            <Login />
          </PrivateRouting>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRouting>
            <Profile />
          </PrivateRouting>
        }
      />
      <Route
        path="/signup"
        element={
          <PrivateRouting>
            <Signup />
          </PrivateRouting>
        }
      />
    </Routes>
  );
};

export default Routing;
