import {
  Typography,
  Box,
  Skeleton,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { useContext } from "react";
import { contextData } from "../../context/contextData";
import { useNavigate } from "react-router";
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const Category = () => {
  //media query
  const media1180 = useMediaQuery("(max-width:1180px)");
  const media930 = useMediaQuery("(max-width:930px)");
  const media720 = useMediaQuery("(max-width:720px)");
  const media485 = useMediaQuery("(max-width:485px)");
  const { category } = useContext(contextData);
  const navigate = useNavigate();
  const handleClick = (ele) => {
    navigate("/all-foods/" + ele.catName.toLowerCase());
  };
  return (
    <div>
      <Typography
        variant="h5"
        sx={{ padding: "12px 16px", marginTop: "12px", textAlign: "center" }}
      >
        All Categories
      </Typography>
      <Divider />
      <Box
        sx={{
          padding: "12px 16px",
          display: "grid",
          gridTemplateColumns: media1180
            ? media930
              ? media720
                ? "repeat(2,1fr)"
                : "repeat(3,1fr)"
              : "repeat(4,1fr)"
            : "repeat(5,1fr)",
          gap: "16px",
          alignItems: "center",
        }}
      >
        {category.length > 0
          ? category.map((ele) => {
              return (
                <Box
                  key={ele._id}
                  sx={{
                    padding: "8px",
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleClick(ele)}
                >
                  <Box>
                    <img
                      src={ele.catImage}
                      alt=""
                      width={"100%"}
                      style={{
                        width: media485 ? "130px" : "200px",
                        height: media485 ? "130px" : "150px",
                        display: "block",
                        margin: "auto",
                      }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      textAlign: "center",
                      marginTop: "10px",
                      fontSize: media485 ? "16px" : "18px",
                    }}
                  >
                    {ele.catName}
                  </Typography>
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
