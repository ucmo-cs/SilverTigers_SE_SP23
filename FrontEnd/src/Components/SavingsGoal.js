import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { TextField, Typography, InputAdornment } from "@mui/material";
import SavingsGoalInfoField from "./SavingsGoalInfoField";
import {
  getUserSavingsGoal,
  updateUserSavingsGoal,
} from "../Util/ActivityAggregation";
import useUserToken from "../Hooks/useUserToken";

SavingsGoal.propTypes = {
  currentBalance: PropTypes.number,
};

export default function SavingsGoal({ currentBalance, startBalance }) {
  const { userToken } = useUserToken();

  const [savingsGoal, setSavingsGoal] = useState(0.0);
  const [targetBalance, setTargetBalance] = useState(0.0);

  useEffect(() => getUserSavingsGoal(userToken, setSavingsGoal), []);

  useEffect(() => {
    const date = new Date();
    const daysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    const dateRatio = date.getDate() / daysInMonth;
    setTargetBalance(dateRatio * savingsGoal + startBalance);
  }, [savingsGoal, currentBalance, startBalance]);

  const updateSavingsGoal = (e) => {
    let newSavingsGoal = e.target.value;

    updateUserSavingsGoal(userToken, newSavingsGoal, setSavingsGoal);
  };

  return (
    <Box
      sx={{
        width: "100%",
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <Typography variant="h5">
          current date: {new Date().toLocaleDateString()}
        </Typography>
      </div>
      <div>
        <TextField
          type="number"
          id="savingsGoal"
          label="Savings Goal"
          value={savingsGoal}
          onBlur={updateSavingsGoal}
          onChange={(e) => setSavingsGoal(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </div>
      <div>
        <SavingsGoalInfoField
          id="currentBalance"
          value={currentBalance}
          label="Today's Balance"
        />
      </div>
      <div>
        <SavingsGoalInfoField
          id="targetBalance"
          value={targetBalance}
          label="Today's Target Balance"
        />
      </div>
      <div>
        <SavingsGoalInfoField
          id="differenceTargetBalance"
          value={currentBalance - targetBalance}
          label="Difference from Target Balance"
        />
      </div>
      <div>
        <Typography>
          The Monthly Savings Calculator allows you to input your desired
          savings for this month, it will then calculate todays target balance,
          and how far above or below your current balance is.
        </Typography>
      </div>
    </Box>
  );
}
