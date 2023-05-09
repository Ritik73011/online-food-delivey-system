import React, { Fragment, useEffect, useState } from "react";
import { Snackbar, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router";
export default function Checkout() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [errorText, setErrorText] = useState("");
  const [cartData, setCartData] = useState([]);
  const [open, setOpen] = useState(false);
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
        console.log(data.cartItems);
      });
    });
  };

  //Creating account
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://food-app-pt18.onrender.com/order", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(
        cartData.map((ele) => ({ ...ele, date: new Date() }))
      ),
    }).then((responce) => {
      responce.json().then((data) => {
        if (data.message === "added to your order page...") {
          setErrorText("Order placed Successfully...");
          setOpen(true);
          setTimeout(() => {
            navigate("/");
          }, 2500);
        }
        console.log(data);
      });
    });
    //delete
    fetch("https://food-app-pt18.onrender.com/deletemany", {
      method: "DELETE",
      headers: {
        token: localStorage.getItem("foodApp"),
      },
    }).then((responce) => {
      responce.json().then((data) => {});
    });
  };

  //SNACKBAR CODE START
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </Fragment>
  );

  useEffect(() => {
    fetchCartItem();
  }, []);
  //SNACKBAR CODE END
  return (
    <div className="signup-form-container">
      <form onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center" }}>
          Pay ₹
          {cartData.length > 0 &&
            cartData
              .map((ele) => {
                return +ele.quantity * +ele.price;
              })
              .reduce((a, b) => a + b, 0)}
        </h2>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          required
          onChange={(event) => setName(event.target.value)}
        />
        <label htmlFor="phone">Phone:</label>
        <input
          type="number"
          id="phone"
          name="phone"
          value={phone}
          required
          onChange={(event) => setPhone(event.target.value)}
        />

        <label htmlFor="pincode">Pincode:</label>
        <input
          type="number"
          id="pincode"
          name="pincode"
          required
          value={pincode}
          minLength={6}
          onChange={(event) => setPincode(event.target.value)}
        />
        <label htmlFor="address">Address:</label>
        <input
          type="address"
          id="address"
          name="address"
          required
          value={address}
          minLength={6}
          onChange={(event) => setAddress(event.target.value)}
        />
        <button type="submit">PAY</button>
      </form>
      {/*Toast Alert Message */}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message={errorText}
        action={action}
        sx={{ color: "#fff" }}
      />
      {/*Toast Alert Message */}
    </div>
  );
}
