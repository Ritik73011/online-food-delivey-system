import { Routes, Route } from "react-router";
import Home from "../pages/Home";
import FoodsPage from "../components/food-page/FoodPage";
const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/all-foods" element={<FoodsPage />} />
      <Route path="/all-foods/:cat/" element={<FoodsPage />} />
      <Route path="/all-foods/:cat/:id" element={<FoodsPage />} />
    </Routes>
  );
};

export default Routing;
