import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, TextField, InputAdornment } from "@mui/material";

SavingsGoalInfoField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.number,
};

export default function SavingsGoalInfoField({ id, label, value }) {
  return (
    <Box>
      {" "}
      <Typography>{label}</Typography>
      <TextField
        type="number"
        id={id}
        disabled
        variant="filled"
        value={value.toFixed(2)}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
    </Box>
  );
}
