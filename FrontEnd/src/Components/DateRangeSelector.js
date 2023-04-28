import React from "react";
import { Typography, Box } from "@mui/material";
import DateTextField from "./DateTextField";
import { centerRow } from "../Util/Styling";

export default function DateRangeSelector({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) {
  return (
    <Box sx={{ paddingBottom: "0.25em" }}>
      <Box sx={centerRow}>
        <Typography
          variant="body"
          sx={{ fontSize: "1.5em", pr: "0.5em", pt: "0.4em" }}
        >
          Show Activity From
        </Typography>
        <DateTextField
          title="Start Date"
          dateObject={startDate}
          setDateObject={setStartDate}
        />
        <Typography
          variant="body"
          sx={{
            fontSize: "1.5em",
            pl: "0.5em",
            pr: "0.5em",
            pt: "0.4em",
          }}
        >
          To
        </Typography>
        <DateTextField
          title="End Date"
          dateObject={endDate}
          setDateObject={setEndDate}
        />
      </Box>
    </Box>
  );
}
