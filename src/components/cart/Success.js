import React from "react";
import CheckCircle from "@mui/icons-material/CheckCircle";
// import "./orderSuccess.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="orderSuccess">
      <CheckCircle />

      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default Success;
