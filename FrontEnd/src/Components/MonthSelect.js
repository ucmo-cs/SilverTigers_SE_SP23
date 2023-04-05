import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Fab, Typography } from "@mui/material";
import { ArrowBackRounded, ArrowForwardRounded } from "@mui/icons-material";

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
    <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
      <Fab color="secondary" onClick={prevMonth}>
        <ArrowBackRounded fontSize="large" />
      </Fab>
      <Typography variant="h1">
        {startDate.toLocaleDateString("end-us", {
          month: "long",
          year: "numeric",
        })}
      </Typography>
      <Fab color="secondary" onClick={nextMonth}>
        <ArrowForwardRounded fontSize="large" />
      </Fab>
    </Box>
  );
}
