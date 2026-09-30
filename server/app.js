const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const employeeRoutes = require("./routes/employeeRoutes");
app.use("/api/employees", employeeRoutes);

const departmentRoutes = require("./routes/departmentRoutes");

app.use("/api/departments", departmentRoutes);
const PORT = process.env.PORT || 5000;
const payrollRoutes = require("./routes/payrollRoutes");

app.use("/api/payrolls", payrollRoutes);

const expenseRoutes = require("./routes/expenseRoutes");

app.use("/api/expenses", expenseRoutes);

const leaveRoutes = require("./routes/leaveRoutes");
app.use("/api/leaves", leaveRoutes);

const attendanceRoutes = require("./routes/attendanceRoutes");

app.use("/api/attendances", attendanceRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});