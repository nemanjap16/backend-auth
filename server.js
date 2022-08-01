const express = require("express");
const cors = require("cors");
const colors = require("colors");
const { dbConnect } = require("./config/db.connect");

const invoicesRoutes = require("./routes/invoices");
const usersRoutes = require("./routes/users");
require("dotenv").config();

const app = express();
dbConnect();
colors.enable();

// middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// log middleware
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// invoices routes
app.use("/api/invoices", invoicesRoutes);
app.use("/api/users", usersRoutes);

const PORT = process.env.PORT || 5000;

// listen for requests
app.listen(`${PORT}`, () => {
  console.log(`Server started on port ${PORT}`.blue);
});
