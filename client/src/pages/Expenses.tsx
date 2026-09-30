import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

function Expenses() {
  const context = useContext(AppContext);

  if (!context) return null;

  const { expenses, setExpenses, employees } = context;

  const [showForm, setShowForm] = useState(false);
  const [employee, setEmployee] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // GET EXPENSES
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/expenses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Failed to fetch expenses");
          return;
        }

        setExpenses(data);
      } catch (error) {
        console.error("Fetch expenses error:", error);
      }
    };

    fetchExpenses();
  }, [setExpenses]);

  const filteredExpenses = expenses.filter((expense) =>
    expense.employee.toLowerCase().includes(search.toLowerCase())
  );

  // SAVE / UPDATE EXPENSE
  const handleSaveExpense = async () => {
    if (!employee || !type || !amount || !date) {
      alert("Please fill all expense details");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const url =
        editingId !== null
          ? `http://localhost:5000/api/expenses/${editingId}`
          : "http://localhost:5000/api/expenses";

      const response = await fetch(url, {
        method: editingId !== null ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          employee,
          type,
          amount,
          date,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
  alert(data.error
    ? `${data.message}\n\nActual error: ${data.error}`
    : data.message || "Failed to save expense"
  );
  return;
}

      if (editingId !== null) {
        setExpenses(
          expenses.map((expense) =>
            expense.id === editingId ? data : expense
          )
        );

        alert("Expense updated successfully!");
      } else {
        setExpenses([...expenses, data]);

        alert("Expense added successfully!");
      }

      setEmployee("");
      setType("");
      setAmount("");
      setDate("");
      setEditingId(null);
      setShowForm(false);
    } catch (error) {
      console.error("Save expense error:", error);
      alert("Unable to connect to server");
    }
  };

  // DELETE EXPENSE
  const handleDeleteExpense = async (id: number) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/expenses/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

     if (!response.ok) {
  alert(data.error
    ? `${data.message}\n\nActual error: ${data.error}`
    : data.message || "Failed to delete expense"
  );
  return;
}

      setExpenses(
        expenses.filter((expense) => expense.id !== id)
      );

      alert("Expense deleted successfully!");
    } catch (error) {
      console.error("Delete expense error:", error);
      alert("Unable to connect to server");
    }
  };

  // EDIT EXPENSE
  const handleEditExpense = (expense: any) => {
    setEditingId(expense.id);
    setEmployee(expense.employee);
    setType(expense.type);
    setAmount(String(expense.amount));
    setDate(expense.date);
    setShowForm(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Expenses</h1>

        <button
          onClick={() => {
            setEditingId(null);
            setEmployee("");
            setType("");
            setAmount("");
            setDate("");
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Expense
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-5">

        <input
          type="text"
          placeholder="Search Employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />

        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="py-3">ID</th>
              <th>Employee</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense) => (
                <tr key={expense.id} className="border-b">
                  <td className="py-3">{expense.id}</td>
                  <td>{expense.employee}</td>
                  <td>{expense.type}</td>
                  <td>₹{expense.amount}</td>
                  <td>{expense.date}</td>

                  <td>
                    <button
                      className="text-blue-600 mr-3"
                      onClick={() => handleEditExpense(expense)}
                    >
                      Edit
                    </button>

                    <button
                      className="text-red-600"
                      onClick={() =>
                        handleDeleteExpense(expense.id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-4 text-gray-500"
                >
                  No Expense Found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {showForm && (
          <div className="mt-6 bg-white shadow rounded-lg p-5">

            <h2 className="text-xl font-bold mb-4">
              {editingId !== null
                ? "Edit Expense"
                : "Add Expense"}
            </h2>

            <select
              className="border p-2 rounded w-full mb-3"
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
            >
              <option value="">Select Employee</option>

              {employees.map((emp) => (
                <option key={emp.id} value={emp.name}>
                  {emp.name}
                </option>
              ))}
            </select>

            <input
              className="border p-2 rounded w-full mb-3"
              placeholder="Expense Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />

            <input
              className="border p-2 rounded w-full mb-3"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <input
              type="date"
              className="border p-2 rounded w-full mb-3"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <button
              onClick={handleSaveExpense}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              {editingId !== null
                ? "Update Expense"
                : "Save Expense"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Expenses;