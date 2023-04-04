import { Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import BalanceTable from "./BalanceTable";

export default function () {
  const userId = sessionStorage.getItem("userToken");

  const [rows, setRows] = useState([]);

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

  useEffect(()=> {
    fetch("http://localhost:8080/users/"+userId+"/statements", {method: "GET"})
    .then((res) => {
      if(res.status === 200) {
        return res.json();
      } else {
        return null;
      }
    }).then((res) => {
      console.log(res);
      setRows(res);
    })
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
            <Typography component="h1" variant="h3">Monthly calendar view</Typography>
      <BalanceTable activity={rows} startBalance={sampleStartBalance} />
    </Box>
  );
}
