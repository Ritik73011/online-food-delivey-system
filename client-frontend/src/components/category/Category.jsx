import { Typography, Box, Skeleton } from "@mui/material";
import { api } from "../../utils";
import { useEffect, useState } from "react";
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const Category = () => {
  const [cat, setCat] = useState([]);

  const fetchCat = () => {
    fetch("https://food-app-pt18.onrender.com/category").then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    fetchCat();
    console.log(api);
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
