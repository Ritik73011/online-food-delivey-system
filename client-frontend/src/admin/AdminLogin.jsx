import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AdminContext } from "./AdminContext";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const naviaget = useNavigate();
  const { updateAdminStatus, adminLogin } = useContext(AdminContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === "abc@gmail.com" && password === "abc123") {
      updateAdminStatus(true);
      naviaget("/admin-dashboard");
    } else {
      alert("wrong credentials");
    }
  };
  useEffect(() => {
    if (adminLogin) {
      naviaget("/admin-dashboard");
    }
  }, [adminLogin]);
  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit}>
        <h2>ADMIN LOGIN</h2>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
