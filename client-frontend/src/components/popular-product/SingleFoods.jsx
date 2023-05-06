import { Box, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router";

const SingleFoods = ({ data }) => {
  // Navigation
  const navigate = useNavigate();
  const media449 = useMediaQuery("(max-width:449px)");
  //GO TO PRODUCT DESC
  const goToDescription = () => {
    navigate(`/all-foods/${data._id}`);
  };

  return (
    <Box
      sx={{
        padding: "8px",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        cursor: "pointer",
      }}
      onClick={() => goToDescription(data)}
    >
      <Box sx={{ padding: "8px", position: "relative" }}>
        <img
          width={"100%"}
          src={data.image}
          style={{ minHeight: "200px", maxHeight: "200px" }}
          alt=""
        />
      </Box>
      <Box sx={{ padding: "6px" }}>
        <Typography
          sx={{
            margin: "8px 0",
            fontWeight: "500",
            color: "#000",
            fontFamily: "'Poppins',sans-serif",
            fontSize: media449 && "14px",
          }}
        >
          {media449
            ? data.title.length > 30
              ? data.title.substring(0, 30) + "..."
              : data.title
            : data.title.length > 50
            ? data.title.substring(0, 50) + "..."
            : data.title}
        </Typography>
        <Typography
          sx={{
            margin: "8px 0",
            fontWeight: "500",
            color: "#000",
          }}
        >
          Price : ₹{data.price}
        </Typography>
        <Typography
          sx={{
            margin: "8px 0",
            fontWeight: "500",
            color: "#000",
          }}
        >
          Category : {data.category}
        </Typography>
      </Box>
    </Box>
  );
};

export default SingleFoods;
