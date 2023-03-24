import { Typography, Box } from "@mui/material";
import React from "react";
import BalanceTable from "./BalanceTable";

export default function () {
  const sampleData = [
    {
      id: 0,
      date: new Date("2023-03-01"),
      description: "Paid",
      amount: 200,
      isPlanned: true,
    },
    {
      id: 1,
      date: new Date("2023-03-04"),
      description: "Grocery",
      amount: -200,
      isPlanned: true,
    },
    {
      id: 2,
      date: new Date("2023-03-15"),
      description: "Tire",
      amount: -500,
      isPlanned: false,
    },
  ];

  const sampleStartBalance = 1000;

  return (
    <Box sx={{ width: '100%' }}>
            <Typography component="h1" variant="h3">Monthly calendar view</Typography>
      <BalanceTable activity={sampleData} startBalance={sampleStartBalance} />
    </Box>
  );
}
