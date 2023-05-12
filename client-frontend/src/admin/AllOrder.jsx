import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

const AllOrder = () => {
  const [foods, setFoods] = useState([]);

  const fetchOrderedFoods = async () => {
    let res = await fetch("https://food-app-pt18.onrender.com/get-all-orders");
    const data = await res.json();
    setFoods(data.orderItem);
  };
  useEffect(() => {
    fetchOrderedFoods();
  }, []);
  return (
    <Box>
      <table>
        <thead>
          <th>Food Image</th>
          <th>Food Details</th>
          <th>User Details</th>
          <th>Ordered Date</th>
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
                  <td>
                    <p style={{ fontWeight: "bolder" }}>{ele.title}</p>
                    <p style={{ fontSize: "12px" }}>{ele.desc}</p>
                    <p>Quantity : {ele.quantity}</p>
                  </td>
                  <td>
                    <p style={{ fontWeight: "bolder" }}>{ele.name}</p>
                    <p>{ele.phone}</p>
                    <p>
                      {ele.address}, {ele.pinCode}
                    </p>
                  </td>
                  <td>{ele.date.replace("T", ", Time : ")}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>Loading...</td>
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

export default AllOrder;
