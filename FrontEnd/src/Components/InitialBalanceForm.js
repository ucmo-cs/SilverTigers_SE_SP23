import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import useUserToken from "../Hooks/useUserToken";
import {
  calculateCurrentBalance,
} from "../Util/ActivityAggregation";
import React, { useState, useReducer } from "react";
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
  const { userToken } = useUserToken();

  const [activity, setActivity] = useState([]);
  const currentBalanceReducer = (state, { activity }) => {
    return calculateCurrentBalance(activity);
  };
  const [currentBalance, currentBalanceDispatch] = useReducer(
    currentBalanceReducer,
    0.0
  );


  const handleClose = () => {
    setOpen(false);
  };

  const submitBalance = (e) => {
    statement.date = new Date();
    statement.name = "Initial Balance";
    statement.planned = 0;
    addStatement(
      userToken,
      statement,
      activity,
      setActivity,
      currentBalanceDispatch
    );
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
