import { Box, Typography, Divider } from "@mui/material";

const AboutUs = () => {
  return (
    <Box>
      <Typography
        sx={{ padding: "8px 16px", textAlign: "center" }}
        variant="h5"
      >
        About Us
      </Typography>
      <Divider />

      <Typography sx={{ padding: "16px" }}>
        At Food City, we're passionate about delivering delicious meals straight
        to your door. Our online platform makes it easy to browse a wide
        selection of cuisines, from classic comfort food to exotic flavors from
        around the India.
        <br />
        <br /> We partner with local restaurants and chefs to offer the freshest
        ingredients and the most authentic dishes. Our goal is to make ordering
        food as easy and convenient as possible. With just a few clicks, you can
        have your favorite meal on its way to your doorstep.
        <br />
        <br />
        Plus, our user-friendly website and make it easy to customize your
        order. At Food City, we believe that food brings people together.
        Whether you're ordering for a solo meal or a group gathering, we're here
        to make sure you get the best possible experience. Thank you for
        choosing Food City, and we can't wait to serve you.
      </Typography>
    </Box>
  );
};

export default AboutUs;
