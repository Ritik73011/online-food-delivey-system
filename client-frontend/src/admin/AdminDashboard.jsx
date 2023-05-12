import React, { useContext, useEffect } from "react";
import { AdminContext } from "./AdminContext";
import { useNavigate } from "react-router";
import { Box, Typography, Divider } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AdminCategory from "./AdminCategory";
import AdminFoodSection from "./AdminFoodSection";
import AdminAllUsers from "./AdminAllUsers";
import AllOrder from "./AllOrder";
const AdminDashboard = () => {
  const { adminLogin, updateAdminStatus } = useContext(AdminContext);
  const navigate = useNavigate();
  //TAB CODE
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //TAB CODE
  useEffect(() => {
    if (!adminLogin) {
      navigate("/admin");
    }
  }, [adminLogin]);
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{ padding: "8px 16px", textAlign: "center", width: "70%" }}
          variant="h5"
        >
          Admin Dashboard
        </Typography>
        <button
          style={{
            background: "red",
            padding: "0px 6px",
            height: "24px",
            color: "white",
            display: "block",
            margin: "auto",
            cursor: "pointer",
            border: "none",
          }}
          onClick={() => updateAdminStatus(false)}
        >
          LOGOUT
        </button>
      </Box>
      <Divider />
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Category" value="1" />
            <Tab label="Foods" value="2" />
            <Tab label="All Orders" value="3" />
            <Tab label="Users" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <AdminCategory />
        </TabPanel>
        <TabPanel value="2">
          <AdminFoodSection />
        </TabPanel>
        <TabPanel value="3">
          <AllOrder />
        </TabPanel>
        <TabPanel value="4">
          <AdminAllUsers />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default AdminDashboard;
