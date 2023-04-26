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
import InitialBalanceForm from "./InitialBalanceForm";
export default function () {
  const [isValid, setIsValid] = useState(true);
  const currentBalanceReducer = (state, { activity }) => {
    if (activity.length == 0) setIsValid(false);
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
        if (statement === null) {
          alert("unable to submit expense");
          return;
        }
        let newActivity = activity.concat(statement);
        setActivity(newActivity);
        currentBalanceDispatch({ activity: newActivity });
      
      });
  };
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
    <>
      {isValid ? (
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
      ) : (
        <InitialBalanceForm addStatement={addStatement} />
      )}
    </>
  );
}
