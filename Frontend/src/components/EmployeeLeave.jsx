import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, Email, calories, fat, carbs, protein) {
  return { name, Email, calories, fat, carbs, protein };
}

const rows = [
  createData(
    "EMP001",
    "employee1@example.com",
    "2024-03-15T00:00:00.00000:00",
    "Vacation",
    "Pending",
    "Pending"
  ),
  createData(
    "EMP001",
    "employee1@example.com",
    "2024-03-15T00:00:00.00000:00",
    "Vacation",
    "Pending",
    "Pending"
  ),
  createData(
    "EMP001",
    "employee1@example.com",
    "2024-03-15T00:00:00.00000:00",
    "Vacation",
    "Pending",
    "Pending"
  ),
  createData(
    "EMP001",
    "employee1@example.com",
    "2024-03-15T00:00:00.00000:00",
    "Vacation",
    "Pending",
    "Pending"
  ),
  createData(
    "EMP001",
    "employee1@example.com",
    "2024-03-15T00:00:00.00000:00",
    "Vacation",
    "Pending",
    "Pending"
  ),
];

const EmployeeLeave = ({ employee }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Employee ID</StyledTableCell>
            <StyledTableCell align="center">E-mail</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell>Leave Reason</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>RejectReason</StyledTableCell>
            <StyledTableCell align="center"> Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell>{row.name}</StyledTableCell>
              <StyledTableCell>{row.Email}</StyledTableCell>
              <StyledTableCell>{row.calories}</StyledTableCell>
              <StyledTableCell>{row.fat}</StyledTableCell>
              <StyledTableCell>{row.carbs}</StyledTableCell>
              <StyledTableCell>{row.protein}</StyledTableCell>
              <Stack direction="row" spacing={2} marginTop={1}>
                <Button variant="contained" color="success">
                  Approve
                </Button>
                <Button variant="outlined" color="error">
                  Reject
                </Button>
              </Stack>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeLeave;
