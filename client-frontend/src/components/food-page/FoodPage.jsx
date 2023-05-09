import {
  Box,
  Divider,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import SingleFood from "../popular-product/SingleFoods";
import { contextData } from "../../context/contextData";
import { useParams } from "react-router";
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const FoodsPage = () => {
  //MEDIA QUERY ST
  const media1068 = useMediaQuery("(max-width:1068px)");
  const media749 = useMediaQuery("(max-width:749px)");
  const media600 = useMediaQuery("(max-width:600px)");
  //MEDIA QUERY EN
  const { foods } = useContext(contextData);
  const { cat } = useParams();
  //Main DATA STATE
  const [tempProduct, setTempProduct] = useState([]);
  const [bool, setBool] = useState(false);
  //SORTING
  const hanldeSort = (val) => {
    if (val === "lth") {
      const sorted = [...tempProduct].sort((a, b) => {
        return a.price - b.price;
      });
      setTempProduct([...sorted]);
    } else if (val === "htl") {
      const sorted = [...tempProduct].sort((a, b) => {
        return b.price - a.price;
      });
      setTempProduct([...sorted]);
    } else if (val === "") {
      if (cat) {
        const filter = foods.filter((ele) => {
          return ele.category.toLowerCase() === cat.toLowerCase();
        });
        setTempProduct(filter);
      } else {
        setTempProduct(foods);
      }
    }
  };

  useEffect(() => {
    if (foods.length > 0) {
      if (!cat) {
        setTempProduct(foods);
      } else {
        const filter = foods.filter((ele) => {
          return ele.category.toLowerCase() === cat.toLowerCase();
        });
        setTempProduct(filter);
      }
    }
    setTimeout(() => {
      setBool(true);
    }, 7000);
  }, [foods, cat]);

  return (
    <Box>
      {/*FILTER OPTIONS START */}
      <Typography
        sx={{ padding: "8px 16px", textAlign: "center" }}
        variant="h5"
      >
        All Foods
      </Typography>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "8px 16px",
        }}
      >
        <select
          id="sort"
          onChange={(e) => hanldeSort(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option value="">--Sort By Price--</option>
          <option value="lth">Price Low To High</option>
          <option value="htl">Price High To Low</option>
        </select>
      </Box>
      {/*FILTER OPTIONS END */}

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
        {tempProduct.length > 0 ? (
          tempProduct.map((ele, idx) => {
            return <SingleFood key={idx + 1} data={ele} />;
          })
        ) : bool ? (
          <Box>No product Found</Box>
        ) : (
          arr.map((ele) => {
            return <Skeleton key={ele} height={"300px"} width={"200px"} />;
          })
        )}
      </Box>
    </Box>
  );
};

export default FoodsPage;
