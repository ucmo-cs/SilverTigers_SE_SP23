import React, { useEffect, useState } from "react";
import { Grid, Button, TextField } from "@mui/material";
import {
  getCurrentBalance,
  getUserSavingsGoal,
} from "../Util/ActivityAggregation";
import useUserToken from "../Hooks/useUserToken";
import {
  validPositiveInteger,
  errorStyling,
  validPositiveNumber,
} from "../Util/Validation";

export default function LoanEstimator() {
  const [isValid, setIsValid] = useState({ isValid: true, errorMessage: "" });
  const [payment, setPayment] = useState(0.0);
  const [recom, setRecom] = useState(
    "Loan will have minimal impact on savings."
  );

  const { userToken } = useUserToken();

  const [currentBalance, setCurrentBalance] = useState(0.0);

  useEffect(() => {
    getCurrentBalance(userToken, setCurrentBalance);
  }, []);

  const [savingsGoal, setSavingsGoal] = useState(0.0);

  useEffect(() => {
    getUserSavingsGoal(userToken, setSavingsGoal);
  }, []);

  const grid = {
    display: "grid",
    justifyContent: "center",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gridGap: "20px",
  };

  const column = {
    color: "green",
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
      setIsValid({
        isValid: false,
        errorMessage: "Please enter a loan amount greater than 0",
      });
    } else if (!validPositiveNumber.test(loan.term)) {
      setIsValid({
        isValid: false,
        errorMessage:
          "Please loan term that is a whole number that is greater than 0 ",
      });
    } else if (!validPositiveInteger.test(loan.interest)) {
      setIsValid({
        isValid: false,
        errorMessage: "Please enter an interest amount greater than 0",
      });
    } else {
      setIsValid({ isValid: true, errorMessage: "" });
      setPayment(
        ((loan.amount / loan.term) * 1 + loan.interest / 12).toFixed(2)
      );
      setRecom(
        (loan.amount / loan.term) * 1 + (loan.interest / 12) * loan.term >
          currentBalance
          ? "Loan will result in balance falling lower than $0, not recommended"
          : (loan.amount / loan.term) * 1 + loan.interest / 12 >= savingsGoal
          ? "Loan payments are greater than savings goal, loan not recommended"
          : "Loan will have minimal impact on savings"
      );
    }
  };
  return (
    <div>
      <form>
        <div style={grid}>
          <div style={column} />
          <div style={column}>
            <h1>Balance: ${currentBalance.toFixed(2)}</h1>
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
              {isValid.isValid ? (
                <div style={column}>
                  <h1> Monthly Payment </h1>
                  <h2>${payment}</h2>
                  <p>{recom}</p>
                </div>
              ) : (
                isValid.errorMessage
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
