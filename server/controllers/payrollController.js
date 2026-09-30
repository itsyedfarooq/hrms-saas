const prisma = require("../config/prisma");

// Create Payroll
const createPayroll = async (req, res) => {
  try {
    const { employee, salary } = req.body;

    const payroll = await prisma.payroll.create({
      data: {
        employee,
        salary: Number(salary),
      },
    });

    res.status(201).json(payroll);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Payrolls
const getPayrolls = async (req, res) => {
  try {
    const payrolls = await prisma.payroll.findMany({
      orderBy: {
        id: "asc",
      },
    });

    res.json(payrolls);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update Payroll
const updatePayroll = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { employee, salary } = req.body;

    const payroll = await prisma.payroll.update({
      where: { id },
      data: {
        employee,
        salary: Number(salary),
      },
    });

    res.json(payroll);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Payroll
const deletePayroll = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.payroll.delete({
      where: { id },
    });

    res.json({
      message: "Payroll deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createPayroll,
  getPayrolls,
  updatePayroll,
  deletePayroll,
};