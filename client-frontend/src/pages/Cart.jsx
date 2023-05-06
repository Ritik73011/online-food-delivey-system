import {
  Box,
  Button,
  Divider,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router";
import Skeloton from "../components/skelton/Skeloton";
const Cart = () => {
  const media768 = useMediaQuery("(max-width:768px)");
  const [cartData, setCartData] = useState([]);
  const [quan, setQuan] = useState();
  const [bool, setBool] = useState(true);
  const navigate = useNavigate();
  const fetchCartItem = () => {
    fetch("https://food-app-pt18.onrender.com/cart", {
      method: "GET",
      headers: {
        token: localStorage.getItem("foodApp"),
      },
    }).then((responce) => {
      responce.json().then((data) => {
        if (localStorage.getItem("foodApp")) {
          setCartData(data.cartItems);
        }
        setBool(false);
        console.log(data.cartItems);
      });
    });
  };

  //delete cart item
  const deleteCartItem = (id) => {
    fetch(`https://food-app-pt18.onrender.com/cart/${id}`, {
      method: "DELETE",
      headers: {
        token: localStorage.getItem("foodApp"),
      },
    }).then((res) => {
      res.json().then((msg) => {
        console.log(msg);
        if (quan) {
          setQuan(false);
        } else {
          setQuan(true);
        }
      });
    });
  };
  //Update Cart ITem
  const updateCartQuan = (id, quan) => {
    fetch(`https://food-app-pt18.onrender.com/cart/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        quantity: quan,
      }),
    }).then((res) => {
      res.json().then((msg) => {
        console.log(msg);
        if (quan) {
          setQuan(false);
        } else {
          setQuan(true);
        }
      });
    });
  };
  const minusClick = (quan, id) => {
    if (quan === 1) {
      deleteCartItem(id);
    } else {
      updateCartQuan(id, +quan - 1);
    }
    setQuan(Math.random());
  };
  const plusClick = (id, quan) => {
    updateCartQuan(id, +quan + 1);
    setQuan(Math.random());
  };
  const deleteClick = (id) => {
    deleteCartItem(id);
    setQuan(Math.random());
  };

  //Checkout
  const checkout = () => {
    if (cartData.length > 0) {
      navigate("/checkout");
    } else {
      alert("please add some foods");
    }
  };
  useEffect(() => {
    fetchCartItem();
  }, [quan, window.location]);
  return (
    <Box>
      <Typography
        sx={{ padding: "8px 16px", textAlign: "center" }}
        variant="h5"
      >
        My Cart
      </Typography>
      <Divider />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            maxWidth: "1100px",
            width: "100%",
            margin: "16px 0",
            textAlign: "left",
            display: media768 ? "grid" : "flex",
            gap: "32px",
          }}
        >
          <Box sx={{ width: "100%" }}>
            {/*CART SINGLE PRODUCT START */}
            {cartData.length > 0 ? (
              cartData.map((ele) => {
                return (
                  <Box key={ele._id}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "24px",
                        width: "100%",
                        padding: "2px 8px",
                      }}
                    >
                      <img
                        src={ele.image}
                        style={{
                          width: media768 ? "90px" : "100px",
                          height: media768 ? "90px" : "100px",
                          display: "block",
                          margin: "auto",
                        }}
                        alt=""
                      />
                      <Box sx={{ width: "100%" }}>
                        <CloseIcon
                          sx={{
                            fontSize: "medium",
                            cursor: "pointer",
                            float: "right",
                          }}
                          onClick={() => deleteClick(ele._id)}
                        />
                        <Typography
                          fontSize={"'Poppins',sans-serif"}
                          sx={{
                            fontWeight: "600",
                            textTransform: "capitalize",
                            marginTop: "12px",
                          }}
                        >
                          {ele.title}
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            margin: "10px 0",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: "14px",
                            }}
                          >
                            <p
                              style={{
                                border: "1px solid grey",
                                padding: "0px 8px",
                                cursor: "pointer",
                              }}
                              onClick={() => minusClick(ele.quantity, ele._id)}
                            >
                              –
                            </p>
                            <p
                              style={{
                                border: "1px solid grey",
                                padding: "0px 8px",
                                cursor: "pointer",
                              }}
                            >
                              {ele.quantity}
                            </p>
                            <p
                              style={{
                                border: "1px solid grey",
                                padding: "0px 8px",
                                cursor: "pointer",
                              }}
                              onClick={() => plusClick(ele._id, ele.quantity)}
                            >
                              +
                            </p>
                          </Box>
                          <Typography
                            sx={{
                              fontFamily: "'Poppins',sans-serif",
                              fontWeight: "500",
                            }}
                          >
                            ₹{ele.price}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Divider sx={{ margin: "6px 0" }} />
                  </Box>
                );
              })
            ) : (
              <Box>
                {!localStorage.getItem("foodApp") ? (
                  "No Item Found"
                ) : bool ? (
                  <Skeleton
                    sx={{
                      maxWidth: "1300px",
                      width: "100%",
                      display: "block",
                      margin: "auto",
                      height: "80px",
                    }}
                  />
                ) : cartData ? (
                  <Skeloton />
                ) : (
                  "No Item Found"
                )}
              </Box>
            )}
            {/*CART SINGLE PRODUCT END */}
          </Box>
          {/*AMOUNT DETAILS START */}
          <Box
            sx={{
              maxWidth: "360px",
              width: "100%",
              margin: media768 && "auto",
              padding: "8px",
              display: !localStorage.getItem("foodApp") && "none",
            }}
          >
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "8px",
              }}
            >
              <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
                SUBTOTAL
              </Typography>
              <Typography sx={{ fontSize: "14px" }}>
                ₹
                {cartData.length > 0 &&
                  cartData
                    .map((ele) => {
                      return +ele.quantity * +ele.price;
                    })
                    .reduce((a, b) => a + b, 0)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                margin: "10px 0",
              }}
            >
              <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
                DELIVERY
              </Typography>
              <Typography sx={{ fontSize: "14px" }}>FREE</Typography>
            </Box>

            <Button
              sx={{
                background: "#161616",
                width: "100%",
                color: "#ffc107",
                ":hover": { background: "#333" },
                marginTop: "16px",
              }}
              onClick={checkout}
            >
              CHECKOUT
            </Button>
          </Box>
          {/*AMOUNT DETAILS END */}
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;
