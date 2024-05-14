import React, { useEffect, useRef, useState } from "react";
import Header from "./Navbar";
import Footer from "./Footer";
import ReactToPrint from "react-to-print";
import { styled } from "@mui/material/styles";
import moment from "moment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
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
  const [openApprove, setOpenApprove] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [employeeLeaveData, setEmployeeLeaveData] = useState(null);
  const [editedEmployeeLeaveData, setEditedEmployeeLeaveData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResult, setNoResult] = useState(false);
  const componentRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/leaves");
        const data = await response.json();
        setLeaves(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/leaves/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete employee leave record");
      }

      // Update the state to reflect the deletion
      setLeaves(
        employeeleaves.filter((employeeleave) => employeeleave._id !== id)
      );
    } catch (error) {
      console.error("Error deleting employee leave record:", error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployeeLeaveData({
      ...editedEmployeeLeaveData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/leaves/${employeeLeaveData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedEmployeeLeaveData),
        }
      );
      if (response.ok) {
        // Update the customers state with the updated data
        const updatedEmployeeLeaves = employeeleaves.map((employeeleave) =>
          employeeleave._id === employeeLeaveData._id
            ? editedEmployeeLeaveData
            : employeeleave
        );
        setLeaves(updatedEmployeeLeaves);
        handleCloseApprove();
      } else {
        alert("Failed to update employee leave data");
      }
    } catch (error) {}
  };

  const handleClickOpenApprove = async (_id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/leaves/${_id}`);
      const data = await response.json();
      setEmployeeLeaveData(data);
      setEditedEmployeeLeaveData({ ...data });
      setOpenApprove(true);
    } catch (error) {
      alert("Error fetching Employee Leave data:", error);
    }
  };

  const handleCloseApprove = () => {
    setOpenApprove(false);
  };

  const handleClickOpenReject = async (_id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/leaves/${_id}`);
      const data = await response.json();
      setEmployeeLeaveData(data);
      setEditedEmployeeLeaveData({ ...data });
      setOpenReject(true);
    } catch (error) {
      alert("Error fetching Employee Leave data:", error);
    }
  };

  const handleCloseReject = () => {
    setOpenReject(false);
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      try {
        const response = await fetch("http://localhost:5000/api/leaves");
        const data = await response.json();
        setLeaves(data);
        setNoResult(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      const filteredLeaves = employeeleaves.filter((leave) =>
        Object.values(leave).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      console.log("Filtered Leaves:", filteredLeaves);
      setLeaves(filteredLeaves);
      setNoResult(filteredLeaves.length === 0); // Set noResult based on whether there are search results
      console.log("No Result:", noResult);
    }
  };

  const handleClearSearch = async () => {
    setSearchQuery(""); // Reset the search query
    setLeaves([]); // Clear the displayed results
    try {
      const response = await fetch("http://localhost:5000/api/leaves");
      const data = await response.json();
      setLeaves(data); // Fetch all leaves again
      setNoResult(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    const searchInput = document.querySelector(".search_input");
    if (searchInput) {
      searchInput.value = "";
    }
  };

  const dateFormat = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  return (
    <>
      <Header />
      <h1>Leave Management</h1>
      <div>
        <input
          sx={{
            float: "right",
            marginBottom: "20px",
            marginRight: "20px",
            width: "80%",
          }}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          className="search_input"
          placeholder="Search Leaves"
        ></input>
        <Button
          sx={{
            float: "right",
            marginBottom: "20px",
            marginRight: "20px",
          }}
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          onClick={handleSearch}
        >
          Search
        </Button>
        {searchQuery && (
          <Button
            sx={{
              float: "right",
              marginBottom: "20px",
              marginRight: "20px",
            }}
            variant="contained"
            color="error"
            startIcon={<ClearIcon />}
            onClick={handleClearSearch}
          >
            Clear
          </Button>
        )}
      </div>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 700 }}
          aria-label="customized table"
          ref={componentRef}
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Employee ID</StyledTableCell>
              <StyledTableCell>Employee Name</StyledTableCell>
              <StyledTableCell align="center">E-mail</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell>Leave Reason</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>StatusReason</StyledTableCell>
              <StyledTableCell align="center"> Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {noResult ? (
              <StyledTableRow>
                <StyledTableCell colSpan={7} align="center">
                  No results found.
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              employeeleaves.map((employeeleave) => (
                <StyledTableRow key={employeeleave._id}>
                  <StyledTableCell>{employeeleave.EmployeeID}</StyledTableCell>
                  <StyledTableCell>
                    {employeeleave.EmployeeName}
                  </StyledTableCell>
                  <StyledTableCell>{employeeleave.Email}</StyledTableCell>
                  <StyledTableCell>
                    {dateFormat(employeeleave.Date)}
                  </StyledTableCell>
                  <StyledTableCell>{employeeleave.LeaveReason}</StyledTableCell>
                  <StyledTableCell>{employeeleave.Status}</StyledTableCell>
                  <StyledTableCell>
                    {employeeleave.StatusReason}
                  </StyledTableCell>

                  <React.Fragment>
                    <StyledTableCell>
                      <Stack direction="row" spacing={2} marginTop={1}>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() =>
                            handleClickOpenApprove(employeeleave._id)
                          }
                        >
                          Approve
                        </Button>
                        <Button
                          variant="outlined"
                          color="warning"
                          onClick={() =>
                            handleClickOpenReject(employeeleave._id)
                          }
                        >
                          Reject
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDelete(employeeleave._id)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </StyledTableCell>
                  </React.Fragment>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div>
          <Box
            sx={{
              float: "right",
              marginTop: "20px",
              marginBottom: "20px",
              marginRight: "40px",
            }}
          >
            <ReactToPrint
              trigger={() => (
                <Button variant="contained" startIcon={<DescriptionIcon />}>
                  Generate Report
                </Button>
              )}
              content={() => componentRef.current}
              documentTitle="Leave Details Report"
              onAfterPrint={() =>
                alert("Leave Detail Report Successfully Downloaded !")
              }
            />
          </Box>
        </div>
      </TableContainer>
      {employeeLeaveData && (
        <Dialog open={openApprove} onClose={handleCloseApprove}>
          <h2>Approve Leave</h2>
          <DialogContent>
            <DialogContentText>
              To approve the leave, please update about the approval and mention
              the reason if only needed in here. The updated details will shown
              in the table and also to the relevant employee.
            </DialogContentText>
            <form>
              <br />
              <label>Approved Message:</label>
              <input
                autoFocus
                required
                name="Status"
                type="text"
                value={editedEmployeeLeaveData.Status}
                onChange={handleEditChange}
              />
              <br />
              <label>Approved Reason:</label>
              <input
                autoFocus
                name="StatusReason"
                type="text"
                value={editedEmployeeLeaveData.StatusReason}
                onChange={handleEditChange}
              />
              <br />

              <DialogActions>
                <Button
                  onClick={handleCloseApprove}
                  color="error"
                  variant="contained"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="success"
                  variant="contained"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      )}
      {employeeLeaveData && (
        <Dialog open={openReject} onClose={handleCloseReject}>
          <h2>Reject Leave</h2>
          <DialogContent>
            <DialogContentText variant="h6">
              To reject the leave, please update about the rejection and mention
              the reason for the rejection accurately in here. The updated
              details will shown in the table and also to the relevant employee.
            </DialogContentText>
            <form>
              <br />
              <label>Reject Message:</label>
              <input
                autoFocus
                required
                name="Status"
                type="text"
                value={editedEmployeeLeaveData.Status}
                onChange={handleEditChange}
              />
              <br />
              <label>Reject Reason:</label>
              <input
                autoFocus
                required
                name="StatusReason"
                type="text"
                value={editedEmployeeLeaveData.StatusReason}
                onChange={handleEditChange}
              />
              <br />

              <DialogActions>
                <Button
                  onClick={handleCloseReject}
                  color="error"
                  variant="contained"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="success"
                  variant="contained"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      )}
      <Footer />
    </>
  );
};

export default EmployeeLeave;
