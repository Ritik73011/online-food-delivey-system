import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./table.css";

//MODEL CODE
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const inputStyle = {
  width: "100%",
  padding: "8px",
  margin: "4px 0",
};
const AdminFoodSection = () => {
  const [foods, setFoods] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [update_id, setUpdateId] = useState("");
  const [updateInput, setUpdateInput] = useState({});

  const handleUpdateChange = (e) => {
    setUpdateInput({ ...updateInput, [e.target.name]: e.target.value });
  };
  const [open, setOpen] = useState(false);
  const handleOpen = (id) => {
    setOpen(true);
    setUpdateId(id);
  };
  const handleClose = () => setOpen(false);

  const [update, setUpdate] = useState("");

  const fetchFoods = async () => {
    let res = await fetch("https://food-app-pt18.onrender.com/foods");
    const data = await res.json();
    setFoods(data.foods);
  };

  const addFoods = () => {
    if (
      title !== "" &&
      image !== "" &&
      desc !== "" &&
      price !== "" &&
      category !== ""
    ) {
      fetch("https://food-app-pt18.onrender.com/foods", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          title: title,
          image: image,
          desc: desc,
          price: price,
          category: category,
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

  //Update
  const updateFood = () => {
    console.log(update_id);
    fetch(`https://food-app-pt18.onrender.com/update-foods/${update_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(updateInput),
    }).then((responce) => {
      responce.json().then((data) => {
        alert(data.message);
        setUpdate(Math.random());
      });
    });
    setUpdateInput({});
  };
  const removeFoods = (id) => {
    fetch(`https://food-app-pt18.onrender.com/foodsdelete/${id}`, {
      method: "DELETE",
    }).then((responce) => {
      responce.json().then((data) => {
        alert(data.message);
        setUpdate(Math.random());
      });
    });
  };
  useEffect(() => {
    fetchFoods();
  }, [update]);
  return (
    <Box>
      <table>
        <thead>
          <th>Food Image</th>
          <th>Food Title</th>
          <th>Description</th>
          <th>Price</th>
          <th>Category</th>
          <th>Remove Button</th>
          <th>Modify Button</th>
        </thead>
        <tbody>
          {foods.length > 0 ? (
            foods.map((ele) => {
              return (
                <tr key={ele._id}>
                  <td>
                    <img
                      src={ele.image}
                      style={{ width: "70px", height: "60px" }}
                      alt=""
                    />
                  </td>
                  <td>{ele.title}</td>
                  <td>{ele.desc}</td>
                  <td>₹{ele.price}</td>
                  <td>{ele.category}</td>
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
                      onClick={() => removeFoods(ele._id)}
                    >
                      REMOVE
                    </button>
                  </td>
                  <td>
                    <button
                      style={{
                        padding: "8px",
                        background: "orange",
                        color: "#030303",
                        cursor: "pointer",
                        display: "block",
                        margin: "auto",
                      }}
                      onClick={() => handleOpen(ele._id)}
                    >
                      Modify
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
          placeholder="Food Title"
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "8px", display: "block", margin: "8px auto" }}
        />

        <input
          type="text"
          placeholder="Food image link"
          onChange={(e) => setImage(e.target.value)}
          style={{
            padding: "8px",
            display: "block",
            margin: "8px auto",
          }}
        />
        <input
          type="text"
          placeholder="Food Description"
          onChange={(e) => setDesc(e.target.value)}
          style={{
            padding: "8px",
            display: "block",
            margin: "8px auto",
          }}
        />
        <input
          type="number"
          placeholder="Food Price"
          onChange={(e) => setPrice(e.target.value)}
          style={{
            padding: "8px",
            display: "block",
            margin: "8px auto",
          }}
        />
        <input
          type="text"
          placeholder="Food category"
          onChange={(e) => setCategory(e.target.value)}
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
          onClick={addFoods}
        >
          ADD
        </button>
      </Box>

      {/*MODEL CODE */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <input
            style={inputStyle}
            type="text"
            placeholder=" food title..."
            name="title"
            onChange={handleUpdateChange}
          />
          <br />
          <input
            style={inputStyle}
            type="text"
            placeholder=" food image link..."
            name="image"
            onChange={handleUpdateChange}
          />
          <br />
          <input
            style={inputStyle}
            type="number"
            placeholder=" food price..."
            name="price"
            onChange={handleUpdateChange}
          />
          <br />
          <input
            style={inputStyle}
            type="text"
            placeholder=" food description..."
            name="desc"
            onChange={handleUpdateChange}
          />
          <br />
          <button
            style={{
              padding: "8px",
              background: "orange",
              color: "#030303",
              cursor: "pointer",
              display: "block",
              margin: "10px auto",
            }}
            onClick={updateFood}
          >
            Update
          </button>
        </Box>
      </Modal>
      {/*MODEL CODE */}
    </Box>
  );
};

export default AdminFoodSection;
