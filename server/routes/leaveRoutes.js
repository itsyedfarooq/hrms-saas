const express = require("express");

const router = express.Router();

const {
  createLeave,
  getLeaves,
  updateLeave,
  deleteLeave,
} = require("../controllers/leaveController");

const authMiddleware = require("../middleware/authMiddleware");

// Create Leave
router.post("/", authMiddleware, createLeave);

// Get Leaves
router.get("/", authMiddleware, getLeaves);

// Update Leave
router.put("/:id", authMiddleware, updateLeave);

// Delete Leave
router.delete("/:id", authMiddleware, deleteLeave);

module.exports = router;