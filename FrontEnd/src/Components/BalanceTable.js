import React from "react";
import PropTypes from "prop-types";
import {
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Table,
  Box,
  TablePagination,
} from "@mui/material";

function mapData(element, accumBalance) {
  return {
    ...element,
    balance: accumBalance,
    plan: element.isPlanned ? "Planned" : "Unplanned",
  };
}

export default function BalanceTable({ activity, startBalance }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let rows = [];
  let accumBalance = startBalance;
  activity.forEach((element) => {
    accumBalance += element.amount;
    rows.push(mapData(element, accumBalance));
  });

  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - rows.length);

  return (
    <Box sx={{ width: "70%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Balance</TableCell>
              <TableCell align="right"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">
                    {row.date.toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">{row.balance}</TableCell>
                  <TableCell align="right">{row.plan}</TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
