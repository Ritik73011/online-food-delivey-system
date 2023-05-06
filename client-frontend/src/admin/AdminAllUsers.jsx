import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./table.css";
const AdminAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState("");

  const fetchUsers = async () => {
    let res = await fetch("https://food-app-pt18.onrender.com/get-users");
    const data = await res.json();
    setUsers(data.users);
  };

  const removeUsers = (id) => {
    fetch(`https://food-app-pt18.onrender.com/deleteusers/${id}`, {
      method: "DELETE",
    }).then((responce) => {
      responce.json().then((data) => {
        alert(data.message);
        setUpdate(Math.random());
      });
    });
  };
  useEffect(() => {
    fetchUsers();
  }, [update]);
  return (
    <Box>
      <table>
        <thead>
          <th>User Name</th>
          <th>User Email</th>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((ele) => {
              return (
                <tr key={ele._id}>
                  <td>{ele.name}</td>
                  <td>{ele.email}</td>
                  <td>
                    <button
                      style={{
                        padding: "8px",
                        background: "red",
                        color: "white",
                        cursor: "pointer",
                        display: "block",
                        margin: "auto",
                      }}
                      onClick={() => removeUsers(ele._id)}
                    >
                      REMOVE USER
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>Loading...</td>
              <td>Loading...</td>
              <td>Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </Box>
  );
};

export default AdminAllUsers;
