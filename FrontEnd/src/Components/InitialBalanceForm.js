import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import React, { useState } from "react";
export default function InitialBalanceForm({ addStatement }) {
  const blankStatement = {
    amount: "",
    date: "",
    name: "",
    planned: "",
    frequency: "",
  };
  const [statement, setStatement] = useState(blankStatement);
  const [open, setOpen] = React.useState(true);

  const handleClose = (e) => {
    e.preventDefault();
  };

  const submitBalance = (e) => {
    statement.date = new Date();
    statement.name = "Initial Balance";
    statement.planned = 0;
    setOpen(false);
    addStatement(statement);
  };

  const changeValue = (e) => {
    setStatement({
      ...statement,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            Please Enter Initial Balance for Bank Account
          </DialogContentText>
          <TextField
            required
            autoFocus
            name="amount"
            type="number"
            variant="outlined"
            placeholder="Initial Amount"
            onChange={changeValue}
            value={statement.amount}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={submitBalance}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
