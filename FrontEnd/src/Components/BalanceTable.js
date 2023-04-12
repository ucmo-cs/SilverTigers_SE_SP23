import React, { useEffect, useState } from "react";
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
  TableSortLabel,
} from "@mui/material";

const DEFAULT_ORDER = "desc";
const ROW_HEIGHT = 45;
const ROWS_PER_PAGE = 15;

function descendingComparator(a, b) {
  return b.filterDate - a.filterDate;
}

function getSortComparator(order) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b)
    : (a, b) => -descendingComparator(a, b);
}

function mapData(element, accumBalance) {
  return {
    ...element,
    balance: accumBalance,
    plan: element.planned ? "Planned" : "Unplanned",
  };
}

export default function BalanceTable({
  activity,
  startBalance,
  startDate,
  endDate,
  isBalAdjust,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(ROWS_PER_PAGE);
  const [order, setOrder] = React.useState(DEFAULT_ORDER);
  const [rows, setRows] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    let newRows = [];
    let accumBalance = startBalance;

    activity.sort(getSortComparator("asc"));
    filterActivity().forEach((element) => {
      accumBalance += element.amount;
      newRows.push(mapData(element, accumBalance));
    });
    newRows.sort(getSortComparator(order));

    setRows(newRows);
  }, [startDate, endDate, startBalance]);

  const filterActivity = () => {
    return activity.filter(
      (rec) =>
        rec.filterDate.getTime() <= endDate.getTime() &&
        rec.filterDate.getTime() >= startDate.getTime()
    );
  };

  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - rows.length);

  const onSort = (event) => {
    const toggledOrder = order === "desc" ? "asc" : "desc";
    setOrder(toggledOrder);

    const sortedRows = rows.sort(getSortComparator(toggledOrder));

    setRows(sortedRows);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="right" sortDirection={order}>
                <TableSortLabel active direction={order} onClick={onSort}>
                  Date
                </TableSortLabel>
              </TableCell>
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
                  style={{ height: ROW_HEIGHT }}
                >
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">{row.balance}</TableCell>
                  <TableCell align="right">{row.plan}</TableCell>
                  {isBalAdjust && <TableCell align="right">Delete</TableCell>}
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: ROW_HEIGHT * emptyRows,
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
