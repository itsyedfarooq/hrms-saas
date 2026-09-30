const express = require("express");
const router = express.Router();

const {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createDepartment);

router.get("/", authMiddleware, getDepartments);

router.get("/:id", authMiddleware, getDepartmentById);

router.put("/:id", authMiddleware, updateDepartment);

router.delete("/:id", authMiddleware, deleteDepartment);

module.exports = router;