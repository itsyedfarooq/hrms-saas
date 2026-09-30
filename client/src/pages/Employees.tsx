import { useContext, useState } from "react";
import { AppContext, type Employee } from "../context/AppContext";
import { Link } from "react-router-dom";
import ConfirmDialog from "../components/ConfirmDialog";
function Employees() {
  
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
const [department, setDepartment] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [position, setPosition] = useState("");
const [salary, setSalary] = useState("");
const context = useContext(AppContext);
const [search, setSearch] = useState("");
const [image, setImage] = useState("");
const [showDeleteDialog, setShowDeleteDialog] = useState(false);
const [deleteId, setDeleteId] = useState<number | null>(null);

if (!context) return null;

const { employees, setEmployees } = context;
const filteredEmployees = employees.filter((employee) =>
  employee.name.toLowerCase().includes(search.toLowerCase())
);

const [editingId, setEditingId] = useState<number | null>(null);
const handleSaveEmployee = async () => {
  if (!name || !department || !email || !phone || !position || !salary) {
  alert("Please fill all employee details");
  return;
}

if (Number(salary) <= 0) {
  alert("Salary must be greater than 0");
  return;
}
  try {
    const token = localStorage.getItem("token");

    // EDIT EMPLOYEE
    if (editingId !== null) {
      const response = await fetch(
        `http://localhost:5000/api/employees/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            position,
            department,
            salary,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update employee");
        return;
      }

      setEmployees(
        employees.map((employee) =>
          employee.id === editingId ? data : employee
        )
      );

      alert("Employee updated successfully!");
    }

    // ADD EMPLOYEE
    else {
      const response = await fetch(
        "http://localhost:5000/api/employees",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            position,
            department,
            salary,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to create employee");
        return;
      }

      setEmployees([...employees, data]);

      alert("Employee added successfully!");
    }

    // Clear form
    setName("");
    setDepartment("");
    setEmail("");
    setPhone("");
    setPosition("");
    setSalary("");
    setImage("");
    setEditingId(null);
    setShowForm(false);

  } catch (error) {
    console.error("Employee save error:", error);
    alert("Unable to connect to server");
  }
};
const handleDeleteEmployee = async (id: number) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:5000/api/employees/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to delete employee");
      return;
    }

    // Remove employee from frontend
    setEmployees(
      employees.filter((employee) => employee.id !== id)
    );

    alert("Employee deleted successfully!");

  } catch (error) {
    console.error("Delete employee error:", error);
    alert("Unable to connect to server");
  }
};
const handleEditEmployee = (employee: Employee) => {
  setEditingId(employee.id);

  setName(employee.name);
  setDepartment(employee.department);
  setEmail(employee.email);
  setPhone(employee.phone);
  setPosition(employee.position);
  setSalary(employee.salary);
  setImage(employee.image);
  setShowForm(true);
};
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Employees</h1>

        <button
  onClick={() => {
  setEditingId(null);
  setName("");
  setDepartment("");
  setEmail("");
  setPhone("");
  setPosition("");
  setSalary("");
  setImage("");
  setShowForm(true);
}}
  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
  + Add Employee  
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
      <th>Name</th>
      <th>Department</th>
      <th>Email</th>
      <th>Salary</th>
      <th>Action</th>
    </tr>
  </thead>

  <tbody>
    {filteredEmployees.length > 0? (
    filteredEmployees.map((employee: Employee) => (
    
      <tr key={employee.id} className="border-b">
        <td className="py-3">{employee.id}</td>
        <td>
  <Link
    to={`/employee/${employee.id}`}
    className="text-blue-600 hover:underline"
  >
    {employee.name}
  </Link>
</td>
        <td>{employee.department}</td>
        <td>{employee.email}</td>
        <td>₹{employee.salary}</td>
        <td>
          <button className="text-blue-600 mr-3" onClick={() => handleEditEmployee(employee)}>
            Edit
          </button>
          <button
  className="text-red-600"
  onClick={() => {
    setDeleteId(employee.id);
    setShowDeleteDialog(true);
  }}
>
  Delete
</button>
        </td>
      </tr>
    ))
    
) : (
  <tr>
    <td colSpan={6} className="text-center py-4 text-gray-500">
      No Employees Found
    </td>
  </tr>
)}
    </tbody>
        </table>
        {showForm && (
  <div className="mt-6 bg-white p-6 rounded-lg shadow">
    <h2 className="text-xl font-bold mb-4">
      {editingId !== null ? "Edit Employee" : "Add Employee"}
    </h2>

<input
    className="border p-2 rounded w-full mb-3"
    placeholder="Employee Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
/>

<input
  className="border p-2 rounded w-full mb-3"
  placeholder="Department"
  value={department}
  onChange={(e) => setDepartment(e.target.value)}
/>
<input
  className="border p-2 rounded w-full mb-3"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
<input
  className="border p-2 rounded w-full mb-3"
  placeholder="Phone"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
/>

<input
  className="border p-2 rounded w-full mb-3"
  placeholder="Position"
  value={position}
  onChange={(e) => setPosition(e.target.value)}
/>
<input
  className="border p-2 rounded w-full mb-3"
  placeholder="Salary"
  value={salary}
  onChange={(e) => setSalary(e.target.value)}
/>

<input
  className="border p-2 rounded w-full mb-3"
  placeholder="Profile Image URL"
  value={image}
  onChange={(e) => setImage(e.target.value)}
/>

<button
  onClick={handleSaveEmployee}
  className="bg-green-600 text-white px-4 py-2 rounded"
>
 {editingId !== null ? "Update Employee" : "Save Employee"}
</button>
  </div>
)}
      </div>
     <ConfirmDialog
  open={showDeleteDialog}
  title="Delete Employee"
  message="Are you sure you want to delete this employee?"
  onConfirm={() => {
    if (deleteId !== null) {
      handleDeleteEmployee(deleteId);
    } 

    setShowDeleteDialog(false);
    setDeleteId(null);
  }}
  onCancel={() => {
    setShowDeleteDialog(false);
    setDeleteId(null);
  }}
/>
    </div>
  );
}

export default Employees;