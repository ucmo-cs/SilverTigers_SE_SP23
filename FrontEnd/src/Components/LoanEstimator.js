import React, { useEffect, useState, useReducer } from "react";
import { Grid, Button, TextField, Input } from "@mui/material";
import {calculateCurrentBalance, calculateStartBalance, setupUserActivity} from "../Util/ActivityAggregation";
import { currentBOM, currentEOM } from "../Util/DateUtil";
import useUserToken from "../Hooks/useUserToken";
import { deleteUserActivity } from "../Util/ActivityAggregation";

export default function () {
  const [amount, setAmount] = useState();
  const [term, setTerm] = useState();
  const [interest, setInterest] = useState();
  const [payment, setPayment] = useState(0.0);
  const [recom, setRecom] = useState("Loan will have minimal impact on savings.");

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
    display: 'grid',
    justifyContent: 'center',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridGap: '20px',
  }

const column = {
    color: 'green',
    textAlign: 'center',
    padding: '20px',
    textAlign: 'center',
  }

  return  (<div>
  <form>
        <div style={grid}>
          <div style={column}/>
          <div style={column}>
              <h1>Balance: ${startBalance}</h1>
              <h1>Loan Estimator</h1>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    variant="outlined"
                    placeholder="Loan Amount"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setAmount(event.target.value);
                      }}
                    value={amount}
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    variant="outlined"
                    placeholder="Loan Term (months)"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setTerm(event.target.value);
                      }}
                    value={term}
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    variant="outlined"
                    placeholder="Interest Rate"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setInterest(event.target.value);
                      }}
                    value={interest}
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <Button onClick={()=> {
                    setPayment((amount/term)*1+(interest/12));
                    setRecom(((amount/term)*1+(interest/12)*term > currentBalance) ? "Loan will result in balance falling lower than $0, not recommended" : ((amount/term)*1+(interest/12) >= savingsGoal) ? "Loan payments are greater than savings goal, loan not recommended": "Loan will have minimal impact on savings" )
                  }} variant="contained">
                    Submit
                  </Button>
                </Grid>
          </div>
          <div style={column}>
                <h1> Monthly Payment </h1>
                <h2>${payment}</h2>
                <p>{recom}</p>
          </div>
        </div>
  </form>
</div>)
}