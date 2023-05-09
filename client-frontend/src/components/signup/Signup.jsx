import React, { Fragment, useState } from "react";
import "./Signup.css";
import { Snackbar, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router";
export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("");
  const navigate = useNavigate();
  //Creating account
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: name,
      email: email,
      password: password,
    };
    fetch("https://food-app-pt18.onrender.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      res.json().then((msg) => {
        console.log(msg);
        if (msg.message === "signup successfully...") {
          setErrorText(msg.message);
          setColor("green");
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
            navigate("/login");
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
    <div className="signup-form-container">
      <form onSubmit={handleSubmit}>
        <h2>Create an account</h2>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          required
          onChange={(event) => setName(event.target.value)}
        />
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
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
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
    </div>
  );
}
