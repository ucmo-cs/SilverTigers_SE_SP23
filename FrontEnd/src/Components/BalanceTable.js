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
  Tooltip,
  IconButton,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const DEFAULT_ORDER = "desc";
const ROW_HEIGHT = 45;
const ROWS_PER_PAGE = 15;

function descendingComparator(a, b) {
  let res = b.filterDate - a.filterDate;
  return res === 0 ? b.amount - a.amount : res;
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
  onStatementDelete,
  currentBalance,
}) {
  const isBalAdjust = onStatementDelete !== undefined;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(ROWS_PER_PAGE);
  const [order, setOrder] = React.useState(DEFAULT_ORDER);
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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
  }, [startDate, endDate, startBalance, currentBalance]);

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

  const onSelect = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="right" sortDirection={order}>
                <Tooltip title="Sort">
                  <TableSortLabel active direction={order} onClick={onSort}>
                    Date
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Balance</TableCell>
              <TableCell align="right"> </TableCell>
              {isBalAdjust ? (
                <TableCell align="center">
                  <Tooltip title="Delete">
                    <span>
                      <IconButton
                        disabled={selected.length <= 0}
                        onClick={() => onStatementDelete(selected)}
                      >
                        <DeleteIcon
                          color={selected.length > 0 ? "error" : "disabled"}
                        />
                      </IconButton>
                    </span>
                  </Tooltip>
                </TableCell>
              ) : (
                <></>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const isRowSelected = isSelected(row.id);
                const rowProps = isBalAdjust
                  ? {
                      onClick: (event) => onSelect(event, row.id),
                      "aria-checked": isRowSelected,
                      selected: isRowSelected,
                    }
                  : {};

                return (
                  <TableRow
                    key={row.id}
                    {...rowProps}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={{ height: ROW_HEIGHT }}
                  >
                    <TableCell align="right">{row.date}</TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.amount.toFixed(2)}</TableCell>
                    <TableCell align="right">
                      {row.balance.toFixed(2)}
                    </TableCell>
                    <TableCell align="right">{row.plan}</TableCell>
                    {isBalAdjust ? (
                      <TableCell padding="checkbox" align="center">
                        <Checkbox color="primary" checked={isRowSelected} />
                      </TableCell>
                    ) : (
                      <></>
                    )}
                  </TableRow>
                );
              })}
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
      />
    </Box>
  );
}
