import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { contextData } from "../../context/contextData";
const FoodDescription = () => {
  const media768 = useMediaQuery("(max-width:768px)");
  const { id } = useParams();
  const { login } = useContext(contextData);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const goToCart = () => {
    if (login) {
      fetch("https://food-app-pt18.onrender.com/cart", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          token: localStorage.getItem("foodApp"),
        },
        body: JSON.stringify({
          title: data[0].title,
          image: data[0].image,
          desc: data[0].desc,
          price: data[0].price,
          quantity: 1,
        }),
      }).then((res) => {
        res.json().then((msg) => {
          if (
            msg.message === "added to your cart..." ||
            msg.message === "already added.."
          ) {
            navigate("/cart");
          }
        });
      });
    } else {
      navigate("/login");
    }
  };
  const fetchFoodById = async () => {
    let res = await fetch(`https://food-app-pt18.onrender.com/food/${id}`);
    const data = await res.json();
    setData(data.foods);
  };

  useEffect(() => {
    fetchFoodById();
  }, [id]);
  return (
    <Box
      sx={{
        maxWidth: "1300px",
        width: "100%",
        display: media768 ? "grid" : "flex",
        gap: "16px",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        padding: "8px",
      }}
    >
      <Box sx={{ width: media768 ? "100%" : "50%" }}>
        <img
          src={data.length > 0 ? data[0].image : ""}
          width={"100%"}
          style={{
            display: "block",
            margin: "auto",
            maxWidth: "500px",
            borderRadius: "16px",
          }}
          alt=""
        />
      </Box>
      <Box sx={{ width: media768 ? "100%" : "50%" }}>
        <Typography sx={{ padding: "6px 0", fontSize: "18px" }}>
          {data.length > 0 ? data[0].title : "Loading...."}
        </Typography>
        <Typography sx={{ padding: "6px 0" }}>
          Price :{" "}
          <span style={{ fontWeight: "bolder" }}>
            ₹{data.length > 0 ? data[0].price : "Loading...."}
          </span>
        </Typography>
        <Typography sx={{ padding: "6px 0" }}>
          Category : {data.length > 0 ? data[0].category : "Loading...."}
        </Typography>
        <Typography sx={{ padding: "6px 0" }}>
          {data.length > 0 ? data[0].desc : "Loading...."}
        </Typography>
        <Button
          sx={{
            background: "orange",
            color: "white",
            fontWeight: "bolder",
            padding: "8px 16px",
            ":hover": {
              background: "orangered",
            },
            marginTop: "24px",
          }}
          onClick={goToCart}
        >
          Add to cart
        </Button>
      </Box>
    </Box>
  );
};

export default FoodDescription;
