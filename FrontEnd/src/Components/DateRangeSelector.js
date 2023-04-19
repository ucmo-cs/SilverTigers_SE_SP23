import React from "react";
import { Typography, Box } from "@mui/material";
import DateTextField from "./DateTextField";

export default function DateRangeSelector({
  label,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) {
  return (
    <Box>
      <Typography variant="caption">{label}</Typography>
      <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <Typography variant="body">From</Typography>
        <DateTextField
          title="Start Date"
          dateObject={startDate}
          setDateObject={setStartDate}
        />
        <Typography variant="body">To</Typography>
        <DateTextField
          title="End Date"
          dateObject={endDate}
          setDateObject={setEndDate}
        />
      </Box>
    </Box>
  );
}
