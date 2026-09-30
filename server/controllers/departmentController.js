const prisma = require("../config/prisma");

// Create Department
const createDepartment = async (req, res) => {
  try {
    const { name } = req.body;

    const department = await prisma.department.create({
      data: {
        name,
      },
    });

    res.status(201).json(department);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Departments
const getDepartments = async (req, res) => {
  try {
    const departments = await prisma.department.findMany({
      orderBy: {
        id: "asc",
      },
    });

    res.json(departments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get Department by ID
const getDepartmentById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const department = await prisma.department.findUnique({
      where: { id },
    });

    if (!department) {
      return res.status(404).json({
        message: "Department not found",
      });
    }

    res.json(department);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update Department
const updateDepartment = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;

    const department = await prisma.department.update({
      where: { id },
      data: {
        name,
      },
    });

    res.json(department);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Department
const deleteDepartment = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.department.delete({
      where: { id },
    });

    res.json({
      message: "Department deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};