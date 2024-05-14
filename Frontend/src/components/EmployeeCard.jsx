import React, { useState, useRef } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const EmployeeCard = ({
  employee,
  onDelete,
  originalEmployees,
  setOriginalEmployees,
}) => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [employeeData, setEmployeeData] = useState(null);
  const [editedEmployeeData, setEditedEmployeeData] = useState(null);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployeeData({
      ...editedEmployeeData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/employees/${employeeData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedEmployeeData),
        }
      );
      if (response.ok) {
        // Update the customers state with the updated data
        const updatedEmployees = employees.map((employee) =>
          employee._id === employeeData._id ? editedEmployeeData : employee
        );
        setEmployees(updatedEmployees);
        handleCloseUpdate();
      } else {
        alert("Failed to update leave data");
      }
    } catch (error) {
      alert("Error updating leave data:", error);
    }
  };

  const handleClickOpenUpdate = async (_id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/employees/${_id}`
      );
      const data = await response.json();
      setEmployeeData(data);
      setEditedEmployeeData({ ...data });
      setOpenUpdate(true);
    } catch (error) {
      alert("Error fetching Leave data:", error);
    }
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleDelete = () => {
    // Call the onDelete function passed from the parent component
    onDelete(employee._id);
  };

  const calculateTotalSalary = () => {
    const salary = parseFloat(employee.Salary);
    const allowancesAmount = parseFloat(employee.AllowancesAmount);
    const hours = parseFloat(employee.OThours);
    const Amount = parseFloat(employee.AmountPerHour);

    const totalSalary = salary + allowancesAmount + hours * Amount;

    return totalSalary;
  };

  return (
    <div>
      <Card sx={{ maxWidth: 485 }}>
        <CardMedia
          sx={{ height: 240 }}
          image={
            employee.Image ||
            "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {employee.EmployeeId}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {" "}
            Name :{employee.Name} <br />
            Email :{employee.Email} <br />
            Address :{employee.Address} <br />
            Designation :{employee.Designation} <br />
            Salary :{employee.Salary} <br />
            AllowancesType :{employee.AllowancesType} <br />
            AllowancesAmount :{employee.AllowancesAmount} <br />
            OT Hours :{employee.OThours} <br />
            AmountPerHour :{employee.AmountPerHour} <br />
            TotalSalary :{calculateTotalSalary()} <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="success"
              startIcon={<UpdateIcon />}
              onClick={() => handleClickOpenUpdate(employee._id)}
            >
              Update
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Stack>
        </CardActions>
      </Card>
      {employeeData && (
        <Dialog open={openUpdate} onClose={handleCloseUpdate}>
          <h2>Update Employee Details</h2>
          <DialogContent>
            <DialogContentText>
              To update your employee details, please edit your details
              accurately in here. The updated details will shown in the table.
            </DialogContentText>
            <form>
              <br />
              <label>Employee ID:</label>
              <input
                autoFocus
                required
                name="EmployeeId"
                type="text"
                value={editedEmployeeData.EmployeeId}
                onChange={handleEditChange}
              />
              <br />
              <label>Employee Name:</label>
              <input
                required
                name="Name"
                type="text"
                value={editedEmployeeData.Name}
                onChange={handleEditChange}
              />
              <br />
              <label>Email:</label>
              <input
                required
                name="Email"
                type="text"
                value={editedEmployeeData.Email}
                onChange={handleEditChange}
              />
              <br />
              <label>Address:</label>
              <input
                required
                name="Address"
                type="text"
                value={editedEmployeeData.Address}
                onChange={handleEditChange}
              />
              <br />
              <label>Designation:</label>
              <input
                required
                name="Designation"
                type="text"
                value={editedEmployeeData.Designation}
                onChange={handleEditChange}
              />
              <label>Salary:</label>
              <input
                required
                name="Salary"
                type="text"
                value={editedEmployeeData.Salary}
                onChange={handleEditChange}
              />
              <label>Allowances Type:</label>
              <input
                required
                name="AllowancesType"
                type="text"
                value={editedEmployeeData.AllowancesType}
                onChange={handleEditChange}
              />
              <label>Allowances Amount:</label>
              <input
                required
                name="AllowancesAmount"
                type="text"
                value={editedEmployeeData.AllowancesAmount}
                onChange={handleEditChange}
              />
              <label>OT Hours:</label>
              <input
                required
                name="OThours"
                type="text"
                value={editedEmployeeData.OThours}
                onChange={handleEditChange}
              />
              <label>Amount Per Hour:</label>
              <input
                required
                name="AmountPerHour"
                type="text"
                value={editedEmployeeData.AmountPerHour}
                onChange={handleEditChange}
              />
              <br />
              <DialogActions>
                <Button
                  onClick={handleCloseUpdate}
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
    </div>
  );
};

export default EmployeeCard;
