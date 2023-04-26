import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useState } from "react";

export default function InitialBalanceForm({addStatement}) {
  const blankStatement = {
    amount: "",
    date: "",
    name: "",
    planned: "",
    frequency: "",
  };
  const [statement, setStatement] = useState(blankStatement);
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const submitBalance = (e) => {
    statement.date = new Date();
    statement.name = "Initial Balance";
    statement.planned = 0;
    addStatement(statement);
    window.location.reload(false);
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
