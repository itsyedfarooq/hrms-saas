import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";

function Payroll() {
  const [showForm, setShowForm] = useState(false);

  const [employee, setEmployee] = useState("");
  const [salary, setSalary] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
const context = useContext(AppContext);

if (!context) return null;

const { payrolls, setPayrolls, employees } = context;
useEffect(() => {
  const fetchPayrolls = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await fetch(
        "https://hrms-saas-vjp5.onrender.com/api/payrolls",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log("Failed to fetch payrolls:", data);
        return;
      }

      setPayrolls(data);
    } catch (error) {
      console.error("Error fetching payrolls:", error);
    }
  };

  fetchPayrolls();
}, [setPayrolls]);
const filteredPayrolls = payrolls.filter((payroll) =>
  payroll.employee.toLowerCase().includes(search.toLowerCase())
);
const handleSavePayroll = async () => {
  if (!employee || !salary) {
    alert("Please select employee and enter salary");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login again");
      return;
    }

    const url =
      editingId !== null
        ? `https://hrms-saas-vjp5.onrender.com/api/payrolls/${editingId}`
        : "https://hrms-saas-vjp5.onrender.com/api/payrolls";

    const response = await fetch(url, {
      method: editingId !== null ? "PUT" : "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employee,
        salary: Number(salary),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("Payroll error:", data);
      alert(data.message || "Failed to save payroll");
      return;
    }

    if (editingId !== null) {
      setPayrolls(
        payrolls.map((payroll) =>
          payroll.id === editingId ? data : payroll
        )
      );
      setEditingId(null);
    } else {
      setPayrolls([...payrolls, data]);
    }

    setEmployee("");
    setSalary("");
    setShowForm(false);
  } catch (error) {
    console.error("Error saving payroll:", error);
  }
};
const handleEditPayroll = (payroll: any) => {
  setEditingId(payroll.id);
  setEmployee(payroll.employee);
  setSalary(String(payroll.salary));
  setShowForm(true);
};
const handleDeletePayroll = async (id: number) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this payroll?"
  );

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `https://hrms-saas-vjp5.onrender.com/api/payrolls/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to delete payroll");
      return;
    }

    setPayrolls(
      payrolls.filter((payroll) => payroll.id !== id)
    );
  } catch (error) {
    console.error("Error deleting payroll:", error);
  }
};
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Payroll</h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Payroll
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
        <th>Salary</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      {filteredPayrolls.length > 0 ? (
  filteredPayrolls.map((payroll) => (
        <tr key={payroll.id} className="border-b">
          <td className="py-3">{payroll.id}</td>
          <td>{payroll.employee}</td>
          <td>₹{payroll.salary}</td>

          <td>
           <button
  className="text-blue-600 mr-3"
  onClick={() => handleEditPayroll(payroll)}
>
  Edit
</button>

            <button className="text-red-600" onClick={() => handleDeletePayroll(payroll.id)}>
              Delete
            </button>
          </td>
        </tr>
      ))
) : (
  <tr>
    <td colSpan={4} className="text-center py-4 text-gray-500">
      No Payroll Found
    </td>
  </tr>
)}
    </tbody>
  </table>
</div>
{showForm && (
  <div className="mt-6 bg-white p-6 rounded-lg shadow">
    <h2 className="text-xl font-bold mb-4">
  {editingId !== null ? "Edit Payroll" : "Add Payroll"}
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
      placeholder="Salary"
      value={salary}
      onChange={(e) => setSalary(e.target.value)}
    />

    <button
      className="bg-green-600 text-white px-4 py-2 rounded"
      onClick={handleSavePayroll}
    >
      {editingId !== null ? "Update Payroll" : "Save Payroll"}
    </button>
  </div>
)}
    </div>
  );
}

export default Payroll;