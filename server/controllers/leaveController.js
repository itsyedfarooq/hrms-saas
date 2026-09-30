const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Create Leave
const createLeave = async (req, res) => {
  try {
    const { employee, leaveType, days } = req.body;

    const leave = await prisma.leave.create({
      data: {
        employee,
        leaveType,
        days: Number(days),
      },
    });

    res.status(201).json(leave);
  } catch (error) {
    console.error("Create leave error:", error);
    res.status(500).json({
      message: "Failed to create leave",
      error: error.message,
    });
  }
};

// Get Leaves
const getLeaves = async (req, res) => {
  try {
    const leaves = await prisma.leave.findMany({
      orderBy: {
        id: "desc",
      },
    });

    res.json(leaves);
  } catch (error) {
    console.error("Get leaves error:", error);
    res.status(500).json({
      message: "Failed to fetch leaves",
      error: error.message,
    });
  }
};

// Update Leave
const updateLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const { employee, leaveType, days } = req.body;

    const leave = await prisma.leave.update({
      where: {
        id: Number(id),
      },
      data: {
        employee,
        leaveType,
        days: Number(days),
      },
    });

    res.json(leave);
  } catch (error) {
    console.error("Update leave error:", error);
    res.status(500).json({
      message: "Failed to update leave",
      error: error.message,
    });
  }
};

// Delete Leave
const deleteLeave = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.leave.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "Leave deleted successfully",
    });
  } catch (error) {
    console.error("Delete leave error:", error);
    res.status(500).json({
      message: "Failed to delete leave",
      error: error.message,
    });
  }
};

module.exports = {
  createLeave,
  getLeaves,
  updateLeave,
  deleteLeave,
};