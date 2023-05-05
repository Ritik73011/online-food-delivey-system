import { useMediaQuery } from "@mui/material";
import Navbar from "./components/navbar/Navbar";
import Routing from './routing/Routing'

function App() {
  const media768 = useMediaQuery("(max-width:768px)");
  return (
    <div>
      <Navbar />
      <div style={{ marginTop: media768 ? "52.01px" : "61.99px" }}>
        <Routing />
      </div>
    </div>
  );
}

export default App;
