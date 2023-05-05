import { Typography, Box, Skeleton } from "@mui/material";
import { api } from "../../utils";
import { useEffect, useState } from "react";
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const Category = () => {
  const [cat, setCat] = useState([]);

  const fetchCat = async () => {
    let res = await fetch("https://food-app-pt18.onrender.com/category", {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    const data = res.json();
    console.log(data);
  };

  useEffect(() => {
    fetchCat();
  }, []);
  return (
    <div>
      <Typography variant="h5" sx={{ padding: "12px 16px" }}>
        All Categories
      </Typography>
      <Box
        sx={{
          padding: "12px 16px",
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        {cat.length > 0
          ? cat.map((ele) => {
              return (
                <Box key={ele._id}>
                  <Box>
                    <img src={ele.catImage} alt="" width={"100%"} />
                  </Box>
                  <Typography>{ele.catName}</Typography>
                </Box>
              );
            })
          : arr.map((ele) => {
              return <Skeleton key={ele} height={"250px"} width={"150px"} />;
            })}
      </Box>
    </div>
  );
};

export default Category;
