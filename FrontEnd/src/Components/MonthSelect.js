import React from "react";
import PropTypes from "prop-types";
import { Box, Fab, Typography } from "@mui/material";
import { ArrowBackRounded, ArrowForwardRounded } from "@mui/icons-material";
import { buttonStyling, centerMonthlySelect, centerRow, rowCenter } from "../Util/Styling";
MonthSelect.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  setStartDate: PropTypes.func,
  endDate: PropTypes.instanceOf(Date),
};

export default function MonthSelect({ startDate, setStartDate, setEndDate }) {
  const nextMonth = () => {
    setStartDate(
      new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1)
    );
    setEndDate(new Date(startDate.getFullYear(), startDate.getMonth() + 2, 0));
  };

  const prevMonth = () => {
    setStartDate(
      new Date(startDate.getFullYear(), startDate.getMonth() - 1, 1)
    );
    setEndDate(new Date(startDate.getFullYear(), startDate.getMonth(), 0));
  };

  return (
    <Box sx={centerMonthlySelect}>
      <Fab sx={buttonStyling} onClick={prevMonth}>
        <ArrowBackRounded fontSize="large" />
      </Fab>
      <Typography variant="h1">
        {startDate.toLocaleDateString("end-us", {
          month: "long",
          year: "numeric",
        })}
      </Typography>
      <Fab sx={buttonStyling} onClick={nextMonth}>
        <ArrowForwardRounded fontSize="large" />
      </Fab>
    </Box>
  );
}
