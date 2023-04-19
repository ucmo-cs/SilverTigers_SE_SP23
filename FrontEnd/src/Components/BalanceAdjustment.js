import { Box, Typography } from "@mui/material";
import React, { useEffect, useState, useReducer } from "react";
import BalanceTable from "./BalanceTable";
import { currentBOM, currentEOM } from "../Util/DateUtil";
import {
  calculateCurrentBalance,
  calculateStartBalance,
  setupUserActivity,
} from "../Util/ActivityAggregation";
import useUserToken from "../Hooks/useUserToken";
import { deleteUserActivity } from "../Util/ActivityAggregation";
import BalanceAdjustmentForm from "./BalanceAdjustmentForm";
import DateRangeSelector from "./DateRangeSelector";

export default function () {
  const { userToken } = useUserToken();

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

  useEffect(() => {
    setupUserActivity(
      userToken,
      startDate,
      setActivity,
      currentBalanceDispatch,
      startBalanceDispatch
    );
  }, []);

  useEffect(() => {
    startBalanceDispatch({ activity, startDate });
  }, [startDate, endDate]);

  const addStatement = (statement) => {
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
      .then((statement) => {
        console.log(statement);
        if (statement === null) {
          alert("unable to submit expense");
          return;
        }

        statement.filterDate = new Date(statement.date);
        let newActivity = activity.concat(statement);

        setActivity(newActivity);
        currentBalanceDispatch({ activity: newActivity });
      });
  };

  const onStatementDelete = (selected) => {
    let reducedActivity = deleteUserActivity(selected, activity);
    currentBalanceDispatch({ activity: reducedActivity });
  };

  return (
    <Box>
      <Typography variant="h3">Current Balance: ${currentBalance}</Typography>
      <BalanceAdjustmentForm addStatement={addStatement} />
      <DateRangeSelector
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <BalanceTable
          activity={activity}
          startBalance={startBalance}
          startDate={startDate}
          endDate={endDate}
          onStatementDelete={onStatementDelete}
          currentBalance={currentBalance}
        />
      </Box>
    </Box>
  );
}
