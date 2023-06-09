import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { toLocalDate } from "../Util/DateUtil";
import {column , grid, backgroundColor, centerButton} from "../Util/Styling";
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
    e.preventDefault();
    e.target.reset();
    statement.date = toLocalDate(statement.date);
    addStatement(statement);
    setStatement(blankStatement);
  };

  return (
    <form id="balanceAdjustmentForm" onSubmit={processForm} sx={grid}>
      <Grid container rowSpacing={1} sx={column}>
        <Grid item xs={12}>
          <TextField
            required
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
            required
            name="amount"
            type="number"
            value={statement.amount}
            onChange={changeValue}
            variant="outlined"
            placeholder="Amount"
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
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
            <input type="radio" name="planned" value="true" required />
            Planned
            <input type="radio" name="planned" value="false" />
            Unplanned
          </div>
        </Grid>
        <Grid item sx={centerButton}>
          <Button variant="contained" type="submit" sx={{backgroundColor:backgroundColor}}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
