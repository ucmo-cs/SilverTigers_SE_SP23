import { Box } from "@mui/material";
import React, { useEffect, useState, useReducer } from "react";
import BalanceTable from "./BalanceTable";
import MonthSelect from "./MonthSelect";
import SavingsGoal from "./SavingsGoal";
import { currentBOM, currentEOM } from "../Util/DateUtil";
import {
  calculateCurrentBalance,
  calculateStartBalance,
  setupUserActivity,
} from "../Util/ActivityAggregation";
import useUserToken from "../Hooks/useUserToken";

export default function () {
  const currentBalanceReducer = (state, { activity }) => {
    return calculateCurrentBalance(activity);
  };

  const startBalanceReducer = (state, { activity, startDate }) => {
    return calculateStartBalance(activity, startDate);
  };

  const { userToken } = useUserToken();
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

  return (
    <Box sx={{ width: "100%" }}>
      <MonthSelect
        startDate={startDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <Box sx={{ width: "70%" }}>
          <BalanceTable
            activity={activity}
            startBalance={startBalance}
            startDate={startDate}
            endDate={endDate}
          />
        </Box>
        <Box sx={{ width: "30%" }}>
        <SavingsGoal
          currentBalance={currentBalance}
          startBalance={calculateStartBalance(activity, new Date())}
        />
        </Box>
      </Box>
    </Box>
  );
}
