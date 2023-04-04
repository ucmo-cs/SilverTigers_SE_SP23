import { Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import BalanceTable from "./BalanceTable";
import SavingsGoal from "./SavingsGoal";

export default function () {
  const userId = sessionStorage.getItem("userToken");

  const [rows, setRows] = useState([]);

  const sampleStartBalance = 1000;

  useEffect(() => {
    fetch("http://localhost:8080/users/" + userId + "/statements", {
      method: "GET",
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((res) => {
        console.log(res);
        setRows(res);
      });
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography component="h1" variant="h3">
        Monthly calendar view
      </Typography>
      <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <BalanceTable activity={rows} startBalance={sampleStartBalance} />
        <SavingsGoal activity={rows} />
      </Box>
    </Box>
  );
}
