import {
  Box,
  Divider,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
const OrderHistory = () => {
  const media768 = useMediaQuery("(max-width:768px)");
  const [orderData, setOrderData] = useState([]);
  const [bool, setBool] = useState(true);
  const fetchOrder = () => {
    fetch("https://food-app-pt18.onrender.com/order", {
      method: "GET",
      headers: {
        token: localStorage.getItem("foodApp"),
      },
    }).then((responce) => {
      responce.json().then((data) => {
        setOrderData(data.orderItem);
        setBool(false);
      });
    });
  };

  useEffect(() => {
    fetchOrder();
  }, [window.location]);
  return (
    <Box>
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
            {orderData.length > 0 ? (
              orderData.map((ele) => {
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
                            display: "grid",
                            justifyContent: "space-between",
                            margin: "10px 0",
                          }}
                        >
                          <Typography
                            sx={{
                              fontFamily: "'Poppins',sans-serif",
                              fontWeight: "500",
                            }}
                          >
                            ₹{ele.price}
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: "'Poppins',sans-serif",
                              fontWeight: "500",
                              marginTop: "8px",
                            }}
                          >
                            Quantity : {ele.quantity}
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
                {bool ? (
                  <Box>
                    <Skeleton
                      sx={{
                        maxWidth: "1300px",
                        width: "100%",
                        display: "block",
                        margin: "auto",
                        height: "80px",
                      }}
                    />
                    <Skeleton
                      sx={{
                        maxWidth: "1300px",
                        width: "100%",
                        display: "block",
                        margin: "auto",
                        height: "80px",
                      }}
                    />
                    <Skeleton
                      sx={{
                        maxWidth: "1300px",
                        width: "100%",
                        display: "block",
                        margin: "auto",
                        height: "80px",
                      }}
                    />
                  </Box>
                ) : orderData.length > 0 ? (
                  ""
                ) : (
                  "No Order history"
                )}
              </Box>
            )}
            {/*CART SINGLE PRODUCT END */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderHistory;
