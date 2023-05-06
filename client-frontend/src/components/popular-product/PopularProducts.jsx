import {
  Box,
  Button,
  Divider,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useContext } from "react";
import SingleFoods from "./SingleFoods";
import { contextData } from "../../context/contextData";
import { useNavigate } from "react-router-dom";

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

const PopularProducts = () => {
  //Media Query
  const media1068 = useMediaQuery("(max-width:1068px)");
  const media749 = useMediaQuery("(max-width:749px)");
  const media600 = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const { foods } = useContext(contextData);
  const navigateToFoods = () => {
    navigate("/all-foods");
  };
  return (
    <Box>
      <Typography
        variant="h5"
        sx={{ padding: "12px 16px", marginTop: "12px", textAlign: "center" }}
      >
        Popular Foods
      </Typography>
      <Divider />
      <Box
        sx={{
          padding: media600 ? "" : "10px 16px",
          display: "grid",
          gridTemplateColumns: media1068
            ? media749
              ? "repeat(2,1fr)"
              : "repeat(3,1fr)"
            : "repeat(5,1fr)",
          gap: media600 ? "8px" : "16px",
        }}
      >
        {foods.length > 0
          ? foods.map((ele, idx) => {
              if (idx < 20) return <SingleFoods key={idx + 1} data={ele} />;
            })
          : arr.map((ele) => {
              return <Skeleton key={ele} height={"300px"} width={"200px"} />;
            })}
      </Box>
      <Button
        sx={{ display: "block", margin: "12px auto" }}
        onClick={navigateToFoods}
      >
        View More Foods
      </Button>
    </Box>
  );
};

export default PopularProducts;
