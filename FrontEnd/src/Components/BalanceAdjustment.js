import { Box, Grid, TextField, Button } from "@mui/material";
import React, { useEffect, useState, useReducer } from "react";
import BalanceTable from "./BalanceTable";
import { currentBOM, currentEOM } from "../Util/DateUtil";
import {
  calculateCurrentBalance,
  calculateStartBalance,
  setupUserActivity
} from "../Util/ActivityAggregation";
import useUserToken from "../Hooks/useUserToken";

export default function () {
  const { userToken } = useUserToken();

  const [statement, setStatement] = useState({
    amount: "",
    date: "",
    name: "",
    planned: "",
    frequency: "",
    user_id: userToken,
  });

  const changeValue = (e) => {
    setStatement({
      ...statement,
      [e.target.name]: e.target.value,
    });
  };

  const currentBalanceReducer = (state, { activity }) => {
    return calculateCurrentBalance(activity);
  };

  const startBalanceReducer = (state, { activity, startDate }) => {
    return calculateStartBalance(activity, startDate);
  };

  const [activity, setActivity] = useState([]);
  const [currentBalance, currentBalanceDispatch] = useReducer(
    currentBalanceReducer,
    0.0
  );
  const [startBalance, startBalanceDispatch] = useReducer(
    startBalanceReducer,
    0.0
  );
  const [startDate, setStartDate] = useState(currentBOM());
  const [endDate, setEndDate] = useState(currentEOM());

  useEffect(() => {setupUserActivity(userToken, startDate, setActivity, currentBalanceDispatch, startBalanceDispatch)}, []);

  useEffect(() => {
    setStartDate(startDate);
    setEndDate(endDate);
    startBalanceDispatch({ activity, startDate });
  }, [startDate, endDate]);

  const processForm = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/users/" + userToken + "/statement", {
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
            <div onChange={changeValue}>
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
            isBalAdjust={true}
          />
        </Box>
      </Box>
    </>
  );
}
