import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";

export default function BalanceAdjustmentForm({ addStatement }) {
  const blankStatement = {
    amount: "",
    date: "",
    name: "",
    planned: "",
    frequency: "",
  };
  const [statement, setStatement] = useState(blankStatement);

  const changeValue = (e) => {
    setStatement({
      ...statement,
      [e.target.name]: e.target.value,
    });
  };

  const processForm = (e) => {
    console.log(e);
    e.preventDefault();
    e.target.reset();
    addStatement(statement);
    setStatement(blankStatement);
  }

  return (
    <form
      id="balanceAdjustmentForm"
      onSubmit={processForm}
    >
      <Grid container rowSpacing={1}>
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
  );
}
