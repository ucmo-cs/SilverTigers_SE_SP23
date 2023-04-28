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
  addStatement,
} from "../Util/ActivityAggregation";
import useUserToken from "../Hooks/useUserToken";
import InitialBalanceForm from "./InitialBalanceForm";

export default function MonthlyCalendar() {
  const [isValid, setIsValid] = useState(true);
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
    if (activity.length === 0) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [currentBalance]);

  const addStatementHandler = (statement) => {
    addStatement(
      userToken,
      statement,
      activity,
      setActivity,
      currentBalanceDispatch
    );
  };

  useEffect(() => {
    startBalanceDispatch({ activity, startDate });
  }, [startDate, endDate]);
  return (
    <>
      {isValid ? (
        <Box sx={{ width: "100%" }}>
          <Box sx={{ p: "0.25em" }}>
            <MonthSelect
              startDate={startDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          </Box>
          <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
            <Box sx={{ width: "70%" }}>
              <BalanceTable
                activity={activity}
                startBalance={startBalance}
                startDate={startDate}
                endDate={endDate}
                currentBalance={currentBalance}
              />
            </Box>
            <Box sx={{ width: "30%", p: "1em" }}>
              <SavingsGoal
                currentBalance={currentBalance}
                startBalance={calculateStartBalance(activity, currentBOM())}
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <InitialBalanceForm addStatement={addStatementHandler} />
      )}
    </>
  );
}
