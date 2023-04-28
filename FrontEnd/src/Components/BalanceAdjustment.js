import { Box, Typography } from "@mui/material";
import React, { useEffect, useState, useReducer } from "react";
import BalanceTable from "./BalanceTable";
import { currentBOM, currentEOM } from "../Util/DateUtil";
import {
  calculateCurrentBalance,
  calculateStartBalance,
  setupUserActivity,
  addStatement,
} from "../Util/ActivityAggregation";
import useUserToken from "../Hooks/useUserToken";
import { deleteUserActivity } from "../Util/ActivityAggregation";
import BalanceAdjustmentForm from "./BalanceAdjustmentForm";
import DateRangeSelector from "./DateRangeSelector";
import { centerRow, column} from "../Util/Styling";

export default function BalanceAdjustment() {
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

  const addStatementHandler = (statement) => {
    addStatement(
      userToken,
      statement,
      activity,
      setActivity,
      currentBalanceDispatch
    );
  };

  const onStatementDelete = (selected) => {
    let reducedActivity = deleteUserActivity(selected, activity);
    currentBalanceDispatch({ activity: reducedActivity });
  };

  return (
    <Box sx={column}>
      <Typography variant="h5">
        Current Balance: ${currentBalance.toFixed(2)}
      </Typography>
      <BalanceAdjustmentForm addStatement={addStatementHandler} />
      <DateRangeSelector
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
        <BalanceTable
          activity={activity}
          startBalance={startBalance}
          startDate={startDate}
          endDate={endDate}
          onStatementDelete={onStatementDelete}
          currentBalance={currentBalance}
        />
    </Box>
  );
}
