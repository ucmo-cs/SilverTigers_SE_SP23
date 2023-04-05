import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";

SavingsGoal.propTypes = {
  activity: PropTypes.arrayOf(PropTypes.object),
};

export default function SavingsGoal({ activity }) {
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

  const updateSavingsGoal = (e) => {
    let newSavingsGoal = e.target.value;

    fetch("http://localhost:8080/bankuser/" + userId + "/savingsGoal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ savingsGoal: newSavingsGoal }),
    })
      .then((res) => {
        if (res.status === 200) {
          return newSavingsGoal;
        } else {
          return savingsGoal;
        }
      })
      .then((res) => {
        console.log(res);
        setSavingsGoal(res);
      });
  };

  return (
    <Box
      sx={{
        width: "30%",
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          type="number"
          id="savingsGoal"
          label="Savings Goal"
          value={savingsGoal}
          onBlur={updateSavingsGoal}
          onChange={(e) => setSavingsGoal(e.target.value)}
        />
      </div>
    </Box>
  );
}
