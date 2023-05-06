import { Box, Button, Divider, Typography } from "@mui/material";
import { useContext, useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { contextData } from "../context/contextData";
import OrderHistory from "../components/order-history/OrderHistory";
const Profile = () => {
  const [value, setValue] = useState("1");
  const { userInfo, updateLoginStatus } = useContext(contextData);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Typography
        sx={{ padding: "8px 16px", textAlign: "center" }}
        variant="h5"
      >
        My Profile
      </Typography>
      <Divider />
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="My Info" value="1" />
              <Tab label="Order History" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bolder", padding: "4px" }}
              >
                Name :{" "}
                <span style={{ color: "#333", fontWeight: "normal" }}>
                  {userInfo && userInfo.name}
                </span>
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bolder", padding: "4px" }}
              >
                Email :{" "}
                <span style={{ color: "#333", fontWeight: "normal" }}>
                  {userInfo && userInfo.email}
                </span>
              </Typography>

              <Button
                sx={{
                  background: "red",
                  color: "white",
                  ":hover": { background: "orangered" },
                  marginTop: "16px",
                }}
                onClick={() => {
                  localStorage.removeItem("foodApp");
                  updateLoginStatus(false);
                }}
              >
                LOGOUT
              </Button>
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <OrderHistory />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default Profile;
