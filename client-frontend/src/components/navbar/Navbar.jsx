import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
const Navbar = () => {
  const media768 = useMediaQuery("(max-width:768px)");
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };

  const handleClick = (text) => {
    const route = text.replace(" ", "-").toLowerCase();
    navigate("/" + route);
  };
  //Drawer Code START
  const [state, setState] = React.useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ [anchor]: open });
  };
  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["All Foods", "Cart", "Profile", "About Us", "Contcat Us"].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleClick(text)}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  //Drawer Code END
  return (
    <Box
      sx={{
        display: "flex",
        background: "#0a1e2e",
        justifyContent: "space-between",
        padding: media768 ? "10px 16px" : "10px 48px",
        gap: "8px",
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        zIndex: "100",
      }}
    >
      <Box sx={{ display: "flex", gap: "24px", alignItems: "center" }}>
        {media768 && (
          <MenuIcon
            sx={{ color: "white", cursor: "pointer" }}
            onClick={toggleDrawer("left", true)}
          />
        )}
        <Typography
          variant={media768 ? "h5" : "h4"}
          sx={{ color: "white", cursor: "pointer" }}
          onClick={navigateToHome}
        >
          Food<span style={{ color: "orangered" }}>City</span>
        </Typography>
      </Box>

      <Box
        sx={{
          display: media768 ? "none" : "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <IconButton onClick={() => handleClick("All Foods")}>
          <Typography sx={{ color: "white" }}>All Foods </Typography>
        </IconButton>
        <IconButton onClick={() => handleClick("Cart")}>
          <Typography sx={{ color: "white" }}>Cart </Typography>
        </IconButton>
        <IconButton onClick={() => handleClick("Profile")}>
          <Typography sx={{ color: "white" }}>Profile </Typography>
        </IconButton>
        <IconButton onClick={() => handleClick("About Us")}>
          <Typography sx={{ color: "white" }}>About Us </Typography>
        </IconButton>
        <IconButton onClick={() => handleClick("Contact Us")}>
          <Typography sx={{ color: "white" }}>Contact Us </Typography>
        </IconButton>
      </Box>

      <React.Fragment>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </Box>
  );
};

export default Navbar;
