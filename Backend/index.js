const express = require("express");
const DBconnection = require("./config/db");
const router = require("./routes/employees");
const routerLeaves = require("./routes/leaves");
const routerCustomer = require("./routes/customers");
const routerFeedback = require("./routes/feedbacks");
const routerSupplier = require("./routes/suppliers");
const routerShoppingcart = require("./routes/shoppingcarts");
const routerOrderDetail = require("./routes/orderDetails");
const routerEmployeeLeave = require("./routes/employeeleaves");

const cors = require("cors");

const bodyParser = require("body-parser");

const app = express();
//middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// db connection
DBconnection();

app.use("/api/employees", router);
app.use("/api/leaves", routerLeaves);
app.use("/api/customers", routerCustomer);
app.use("/api/feedbacks", routerFeedback);
app.use("/api/suppliers", routerSupplier);
app.use("/api/shoppingcart", routerShoppingcart);
app.use("/api/orderDetails", routerOrderDetail);
app.use("/api/employeeleaves", routerEmployeeLeave);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));
