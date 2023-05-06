import { useMediaQuery } from "@mui/material";
import Navbar from "./components/navbar/Navbar";
import Footer from './components/footer/Footer'
import Routing from './routing/Routing'
import { contextData } from './context/contextData'
import { useEffect, useState } from "react";
function App() {
  const media768 = useMediaQuery("(max-width:768px)");
  const [login, setLogin] = useState([]);
  const [category, setCategory] = useState([]);
  const [foods, setFoods] = useState([]);

  const fetchCat = async () => {
    let res = await fetch("https://food-app-pt18.onrender.com/category");
    const data = await res.json();
    setCategory(data.category);
  };
  const fetchFood = async () => {
    let res = await fetch("https://food-app-pt18.onrender.com/foods");
    const data = await res.json();
    setFoods(data.foods);
  };


  useEffect(() => {
    fetchCat();
    fetchFood();
  }, [login])
  return (
    <div>
      <contextData.Provider value={{ category, foods }}>
        <Navbar />
        <div style={{ marginTop: media768 ? "52.01px" : "61.99px" }}>
          <Routing />
        </div>
        <Footer />
      </contextData.Provider>

    </div>
  );
}

export default App;
