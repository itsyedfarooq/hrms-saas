const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Create Expense
const createExpense = async (req, res) => {
  try {
    const { employee, type, amount, date } = req.body;

    const expense = await prisma.expense.create({
      data: {
        employee,
        type,
        amount: Number(amount),
        date,
      },
    });

    res.status(201).json(expense);
  } catch (error) {
  console.error("Create expense error:", error);
  res.status(500).json({
    message: "Failed to create expense",
    error: error.message,
  });
}
};

// Get Expenses
const getExpenses = async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      orderBy: {
        id: "desc",
      },
    });

    res.json(expenses);
  } catch (error) {
    console.error("Get expenses error:", error);
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
};

// Update Expense
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { employee, type, amount, date } = req.body;

    const expense = await prisma.expense.update({
      where: {
        id: Number(id),
      },
      data: {
        employee,
        type,
        amount: Number(amount),
        date,
      },
    });

    res.json(expense);
  } catch (error) {
    console.error("Update expense error:", error);
    res.status(500).json({ message: "Failed to update expense" });
  }
};

// Delete Expense
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.expense.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
  console.error("Delete expense error:", error);
  res.status(500).json({
    message: "Failed to delete expense",
    error: error.message,
  });
}
};

module.exports = {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
};