import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const EmployeeCard = ({ employee }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {employee.EmployeeId}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Name :{employee.Name} <br />
          Email :{employee.Email} <br />
          Address :{employee.Address} <br />
          Designation :{employee.Designation} <br />
          Salary :{employee.Salary} <br />
          AllowancesType :{employee.AllowancesType} <br />
          AllowancesAmount :{employee.AllowancesAmount} <br />
          OT Hours :{employee.OThours} <br />
          AmountPerHour :{employee.AmountPerHour} <br />
          TotalSalary :{employee.TotalSalary} <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="success">
            Update
          </Button>
          <Button variant="outlined" color="error">
            Delete
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default EmployeeCard;
