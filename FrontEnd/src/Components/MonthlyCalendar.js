import { Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import BalanceTable from "./BalanceTable";
import MonthSelect from "./MonthSelect";
import SavingsGoal from "./SavingsGoal";

export default function () {
  const userId = sessionStorage.getItem("userToken");

  const currentBOM = () => {
    const current = new Date();
    return new Date(current.getFullYear(), current.getMonth(), 1);
  };

  const currentEOM = () => {
    const current = new Date();
    return new Date(current.getFullYear(), current.getMonth() + 1, 0);
  };

  const [activity, setActivity] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(0.0);
  const [startBalance, setStartBalance] = useState(0.0);
  const [startDate, setStartDate] = useState(currentBOM());
  const [endDate, setEndDate] = useState(currentEOM());

  const calculateCurrentBalance = (activity) => {
    const dateTime = new Date();

    const currentActivity = activity.filter(
      (rec) => rec.filterDate.getTime() <= dateTime.getTime()
    );

    setCurrentBalance(
      currentActivity
        .map((rec) => rec.amount)
        .reduce((total, current) => total + current)
    );
  };

  const calculateStartBalance = (activity) => {
    const currentActivity = activity.filter(
      (rec) => rec.filterDate.getTime() < startDate.getTime()
    );

    const amounts = currentActivity.map((rec) => rec.amount);

    if (amounts.length === 0) {
      setStartBalance(0.0);
    } else {
      setStartBalance(amounts.reduce((total, current) => total + current));
    }
  };

  const calculateCurrentMonthStartBalance = (activity) => {
    const currentActivity = activity.filter(
      (rec) => rec.filterDate.getTime() < new Date().getTime()
    );

    const amounts = currentActivity.map((rec) => rec.amount);

    if (amounts.length === 0) {
      return 0;
    }
    return amounts.reduce((total, current) => total + current);
  };

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
        res.forEach((row) => {
          row.filterDate = new Date(row.date);
        });
        setActivity(res);
        calculateCurrentBalance(res);
        calculateStartBalance(res);
      });
  }, []);

  useEffect(() => {
    calculateStartBalance(activity);
  }, [startDate, endDate]);

  return (
    <Box sx={{ width: "100%" }}>
      <MonthSelect
        startDate={startDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <BalanceTable
          activity={activity}
          startBalance={startBalance}
          startDate={startDate}
          endDate={endDate}
          addDel={false}
        />
        <SavingsGoal
          currentBalance={currentBalance}
          startBalance={calculateCurrentMonthStartBalance(activity)}
        />
      </Box>
    </Box>
  );
}
