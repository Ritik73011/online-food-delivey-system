import React, { Fragment, useContext, useState } from "react";
import "./Login.css";
import { Snackbar, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { contextData } from "../../context/contextData";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [color, setColor] = useState("");
  const [open, setOpen] = useState(false);
  const naviaget = useNavigate();
  const { updateLoginStatus } = useContext(contextData);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    fetch("https://food-app-pt18.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      res.json().then((msg) => {
        if (msg.token) {
          localStorage.setItem("foodApp", msg.token);
          setErrorText("Login Success...");
          setColor("green");
          setOpen(true);
          updateLoginStatus(true);
          setTimeout(() => {
            setOpen(false);
            naviaget("/");
          }, 3000);
        }
        setErrorText(msg.message);
        setColor("#f54f43");
        setOpen(true);
      });
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
  //SNACKBAR CODE END
  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          required
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          minLength={6}
          onChange={(event) => {
            setPassword(event.target.value);
            event.target.setCustomValidity("");
          }}
          onInvalid={(e) =>
            e.target.setCustomValidity(
              "Password must me greater than 5 character"
            )
          }
        />
        <button type="submit">Login</button>
        <p style={{ textAlign: "left", marginTop: "8px" }}>
          Don't have an account ?
          <span
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => {
              naviaget("/signup");
            }}
          >
            Click here
          </span>{" "}
        </p>

        {/*Toast Alert Message */}
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          message={errorText}
          action={action}
          sx={{
            "& .css-1eqdgzv-MuiPaper-root-MuiSnackbarContent-root": {
              background: color,
            },
            fontWeight: "bolder",
          }}
        />
        {/*Toast Alert Message */}
      </form>
    </div>
  );
}
