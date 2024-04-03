import React, { useEffect, useState } from "react";
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

const EmployeeLeave = () => {
  const [employeeleaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/employeeleaves"
        );
        const data = await response.json();
        setLeaves(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
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
          {employeeleaves.map((employeeleave) => (
            <StyledTableRow key={employeeleave._id}>
              <StyledTableCell>{employeeleave.EmployeeID}</StyledTableCell>
              <StyledTableCell>{employeeleave.Email}</StyledTableCell>
              <StyledTableCell>{employeeleave.Date}</StyledTableCell>
              <StyledTableCell>{employeeleave.LeaveReason}</StyledTableCell>
              <StyledTableCell>{employeeleave.Status}</StyledTableCell>
              <StyledTableCell>{employeeleave.StatusReason}</StyledTableCell>
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
