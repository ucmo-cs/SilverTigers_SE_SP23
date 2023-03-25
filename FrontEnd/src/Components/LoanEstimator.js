import React from "react";
import { Grid, Button, TextField } from "@mui/material";
export default function () {
  return  (<div>
  <form>
    <Grid container rowSpacing={1}>
        <h2>Loan Estimator</h2>
      <Grid item xs={12}>
        <TextField
          type="text"
          variant="outlined"
          placeholder="Loan Amount"
        ></TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          type="number"
          variant="outlined"
          placeholder="Loan Term"
        ></TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          type="number"
          variant="outlined"
          placeholder="Interest Rate"
        ></TextField>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Grid>
    </Grid>
  </form>
</div>)
}
