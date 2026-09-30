const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Create Attendance
const createAttendance = async (req, res) => {
  try {
    const { employee, date, status } = req.body;

    const attendance = await prisma.attendance.create({
      data: {
        employee,
        date,
        status,
      },
    });

    res.status(201).json(attendance);
  } catch (error) {
    console.error("Create attendance error:", error);
    res.status(500).json({
      message: "Failed to create attendance",
      error: error.message,
    });
  }
};

// Get Attendance
const getAttendances = async (req, res) => {
  try {
    const attendances = await prisma.attendance.findMany({
      orderBy: {
        id: "desc",
      },
    });

    res.json(attendances);
  } catch (error) {
    console.error("Get attendance error:", error);
    res.status(500).json({
      message: "Failed to fetch attendance",
      error: error.message,
    });
  }
};

// Update Attendance
const updateAttendance = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { employee, date, status } = req.body;

    const attendance = await prisma.attendance.update({
      where: { id },
      data: {
        employee,
        date,
        status,
      },
    });

    res.json(attendance);
  } catch (error) {
    console.error("Update attendance error:", error);
    res.status(500).json({
      message: "Failed to update attendance",
      error: error.message,
    });
  }
};

// Delete Attendance
const deleteAttendance = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.attendance.delete({
      where: { id },
    });

    res.json({
      message: "Attendance deleted successfully",
    });
  } catch (error) {
    console.error("Delete attendance error:", error);
    res.status(500).json({
      message: "Failed to delete attendance",
      error: error.message,
    });
  }
};

module.exports = {
  createAttendance,
  getAttendances,
  updateAttendance,
  deleteAttendance,
};