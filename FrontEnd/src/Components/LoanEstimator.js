import React, { useEffect, useState, useReducer } from "react";
import { Grid, Button, TextField, Input } from "@mui/material";
import {
  calculateCurrentBalance,
  calculateStartBalance,
  setupUserActivity,
} from "../Util/ActivityAggregation";
import { currentBOM, currentEOM } from "../Util/DateUtil";
import useUserToken from "../Hooks/useUserToken";
import { validPositiveInteger, errorStyling, validPositiveNumber } from "../Util/Validation";

export default function () {
  const [isValid, setIsValid] = useState({isValid: true, errorMessage: ""});
  const [payment, setPayment] = useState(0.0);
  const [recom, setRecom] = useState(
    "Loan will have minimal impact on savings."
  );

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

  const userId = sessionStorage.getItem("userToken");
  const [savingsGoal, setSavingsGoal] = useState(0.0);

  useEffect(() => {
    fetch("http://localhost:8080/bankuser/" + userId + "/savingsGoal", {
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
        setSavingsGoal(res);
      });
  }, []);

  const grid = {
    display: "grid",
    justifyContent: "center",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gridGap: "20px",
  };

  const column = {
    color: "green",
    textAlign: "center",
    padding: "20px",
    textAlign: "center",
  };

  const [loan, setLoan] = useState({
    amount: "",
    term: "",
    interest: "",
  });

  const changeValue = (e) => {
    setLoan({
      ...loan,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    if (!validPositiveInteger.test(loan.amount)) {
      setIsValid({isValid: false, errorMessage: "Please enter a loan amount greater than 0"});
    } else if(!validPositiveNumber.test(loan.term)) {
      setIsValid({isValid:false, errorMessage: "Please loan term that is a whole number that is greater than 0 "})
    } else if(!validPositiveInteger.test(loan.interest)) {
      setIsValid({isValid: false, errorMessage: "Please enter an interest amount greater than 0"});
    } else {
      setIsValid({isValid: true, errorMessage:""})
      setPayment((loan.amount/loan.term)*1+(loan.interest/12));
      setRecom(((loan.amount/loan.term)*1+(loan.interest/12)*loan.term > currentBalance) ? "Loan will result in balance falling lower than $0, not recommended" : ((loan.amount/loan.term)*1+(loan.interest/12) >= savingsGoal) ? "Loan payments are greater than savings goal, loan not recommended": "Loan will have minimal impact on savings" )
    }
  };
  return (
    <div>
      <form>
        <div style={grid}>
          <div style={column} />
          <div style={column}>
            <h1>Balance: ${currentBalance}</h1>
            <h1>Loan Estimator</h1>
            <Grid item xs={12}>
              <TextField
                required
                type="number"
                variant="outlined"
                placeholder="Loan Amount"
                name="amount"
                value={loan.amount}
                onChange={changeValue}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="term"
                type="number"
                variant="outlined"
                placeholder="Loan Term (months)"
                value={loan.term}
                onChange={changeValue}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="interest"
                type="number"
                variant="outlined"
                placeholder="Interest Rate"
                onChange={changeValue}
                value={loan.interest}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={submit} variant="contained">
                Submit
              </Button>
            </Grid>
            <div style={errorStyling}>
            {isValid.isValid ? <></> : isValid.errorMessage}
            </div>
          </div>
          <div style={column}>
            <h1> Monthly Payment </h1>
            <h2>${payment}</h2>
            <p>{recom}</p>
          </div>
        </div>
      </form>
    </div>
  );
}
