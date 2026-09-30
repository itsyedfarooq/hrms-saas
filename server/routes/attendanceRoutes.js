const express = require("express");

const router = express.Router();

const {
  createAttendance,
  getAttendances,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attendanceController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createAttendance);

router.get("/", authMiddleware, getAttendances);

router.put("/:id", authMiddleware, updateAttendance);

router.delete("/:id", authMiddleware, deleteAttendance);

module.exports = router;