import React, { useState } from "react";
import { Grid, Button, TextField, Input } from "@mui/material";
export default function () {
  const [amount, setAmount] = useState();
  const [term, setTerm] = useState();
  const [interest, setInterest] = useState();
  const [payment, setPayment] = useState(0.0);
  const [recom, setRecom] = useState("This loan is recommended as it will result in no loss of savings");

  return  (<div>
  <form>
    <Grid container rowSpacing={1}>
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
        <Button onClick={()=> setPayment((amount/term)*1+(interest/12))} variant="contained">
          Submit
        </Button>
      </Grid>
      <h2> Monthly Payment </h2>
      <Grid item xs={12}>
      <p>${payment}</p>
      </Grid>
      <Grid item xs = {12}>
      <h2> Recomendations </h2>
      </Grid>
      <p>{recom}</p>
    </Grid>
  </form>
</div>)
}