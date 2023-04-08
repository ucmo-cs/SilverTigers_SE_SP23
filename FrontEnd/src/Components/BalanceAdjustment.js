import { Box, Grid, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import BalanceTable from "./BalanceTable";

export default function () {
  const userId = sessionStorage.getItem("userToken");

  const [statement, setStatement] = useState({
    amount: "",
    date: "",
    name: "",
    planned: "",
    frequency: "",
    user_id: userId,
  });

  const changeValue = (e) => {
    setStatement({
      ...statement,
      [e.target.name]: e.target.value,
    });
  };

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
    setStartDate(startDate);
    setEndDate(endDate);
    calculateStartBalance(activity);
  }, [startDate, endDate]);

  const processForm = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/users/" + userId + "/statement",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(statement),
    })
      .then((res) => {
        console.log(1, res);
        if (res.status === 201) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((res) => {
        console.log(res);
        if (res !== null) {
            window.location.reload(false);
        } else {
          alert("unable to submit expense");
        }
      });
  };

  return (
    <>
      <form onSubmit={processForm}>
        <Grid container rowSpacing={1}>
          <Grid item xs={12}>
            <h3>Current Balance: ${currentBalance}</h3>
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="date"
              value={statement.date}
              onChange={changeValue}
              variant="outlined"
              placeholder="Date"
              name="date"
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
            name="amount"
              type="text"
              value={statement.amount}
              onChange={changeValue}
              variant="outlined"
              placeholder="Amount"
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
                name="name"
              type="text"
              value={statement.name}
              onChange={changeValue}
              variant="outlined"
              placeholder="Description"
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <div onChange={changeValue} >
              <input type="radio" name="planned" value="true" />
              Planned
              <input type="radio" name="planned" value="false" />
              Unplanned
              </div>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
          <BalanceTable
            activity={activity}
            startBalance={startBalance}
            startDate={startDate}
            endDate={endDate}
            addDel={true}
          />
        </Box>
      </Box>
    </>
  );
}
