import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./table.css";
const AdminCategory = () => {
  const [category, setCategory] = useState([]);
  const [catName, setCatName] = useState("");
  const [catImage, setCatImage] = useState("");
  const [update, setUpdate] = useState("");

  const fetchCat = async () => {
    let res = await fetch("https://food-app-pt18.onrender.com/category");
    const data = await res.json();
    setCategory(data.category);
  };

  const addCategory = () => {
    if (catName !== "" && catImage !== "") {
      fetch("https://food-app-pt18.onrender.com/category", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          catName: catName,
          catImage: catImage,
        }),
      }).then((responce) => {
        responce.json().then((data) => {
          alert(data.message);
          setUpdate(Math.random());
        });
      });
    } else {
      alert("please fill details");
    }
  };
  const removeCategory = (id) => {
    fetch(`https://food-app-pt18.onrender.com/category/${id}`, {
      method: "DELETE",
    }).then((responce) => {
      responce.json().then((data) => {
        alert(data.message);
        setUpdate(Math.random());
      });
    });
  };
  useEffect(() => {
    fetchCat();
  }, [update]);
  return (
    <Box>
      <table>
        <thead>
          <th>Category Image</th>
          <th>Category Name</th>
          <th>Remove Button</th>
        </thead>
        <tbody>
          {category.length > 0 ? (
            category.map((ele) => {
              return (
                <tr key={ele._id}>
                  <td>
                    <img
                      src={ele.catImage}
                      style={{ width: "70px", height: "60px" }}
                      alt=""
                    />
                  </td>
                  <td>{ele.catName}</td>
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
                      onClick={() => removeCategory(ele._id)}
                    >
                      REMOVE
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

      <Box sx={{ margin: "16px auto" }}>
        <input
          type="text"
          placeholder="category name"
          onChange={(e) => setCatName(e.target.value)}
          style={{ padding: "8px", display: "block", margin: "8px auto" }}
        />

        <input
          type="text"
          placeholder="category image link"
          onChange={(e) => setCatImage(e.target.value)}
          style={{
            padding: "8px",
            display: "block",
            margin: "8px auto",
          }}
        />
        <button
          style={{
            padding: "8px",
            background: "green",
            color: "white",
            cursor: "pointer",
            display: "block",
            margin: "10px auto",
          }}
          onClick={addCategory}
        >
          ADD
        </button>
      </Box>
    </Box>
  );
};

export default AdminCategory;
