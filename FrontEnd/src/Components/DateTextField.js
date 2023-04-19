import React, { useEffect, useState } from "react";
import { TextField, Tooltip } from "@mui/material";
import { formatDate } from "../Util/DateUtil";

export default function DateTextField({ title, dateObject, setDateObject }) {
  const [dateString, setDateString] = useState(formatDate(dateObject));

  useEffect(() => {
    setDateString(formatDate(dateObject));
  }, [dateObject]);

  const updateDate = (event) => {
    setDateObject(new Date(event.target.value));
  };

  const onDateChange = (event) => {
    setDateString(event.target.value);
  };

  return (
    <Tooltip title={title}>
      <TextField
        type="date"
        value={dateString}
        onChange={onDateChange}
        onBlur={updateDate}
        variant="outlined"
        name="date"
      />
    </Tooltip>
  );
}
