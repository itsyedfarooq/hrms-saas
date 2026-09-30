const express = require("express");
const router = express.Router();

const {
  createPayroll,
  getPayrolls,
  updatePayroll,
  deletePayroll,
} = require("../controllers/payrollController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createPayroll);

router.get("/", authMiddleware, getPayrolls);

router.put("/:id", authMiddleware, updatePayroll);

router.delete("/:id", authMiddleware, deletePayroll);

module.exports = router;