import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { contextData } from "../context/contextData";
const PrivateRouting = ({ children }) => {
  const { login } = useContext(contextData);
  const route = useLocation().pathname;
  if (route === "/login")
    return login ? <Navigate to={"/profile"} /> : children;
  else if (route === "/signup")
    return login ? <Navigate to={"/profile"} /> : children;
  else return login ? children : <Navigate to={"/login"} />;
};

export default PrivateRouting;
