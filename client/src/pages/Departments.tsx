import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

function Departments() {
  const [department, setDepartment] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const context = useContext(AppContext);

  if (!context) return null;

  const { departments, setDepartments } = context;

  // Get departments from backend
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "https://hrms-saas-vjp5.onrender.com/api/departments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error("Failed to fetch departments:", data);
          return;
        }

        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, [setDepartments]);

  const filteredDepartments = departments.filter((dept) =>
    (dept.name ?? "").toLowerCase().includes(search.toLowerCase())
  );

  // Add / Update Department
  // Add / Update Department
const handleSaveDepartment = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found");
      return;
    }

    if (!department.trim()) {
      alert("Please enter department name");
      return;
    }

    // UPDATE existing department
    if (editingId !== null) {
      const response = await fetch(
        `https://hrms-saas-vjp5.onrender.com/api/departments/${editingId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: department,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log("Failed to update department:", data);
        alert(data.message || "Failed to update department");
        return;
      }

      setDepartments(
        departments.map((dept) =>
          dept.id === editingId ? data : dept
        )
      );

      setEditingId(null);
    }

    // CREATE new department
    else {
      const response = await fetch(
        "https://hrms-saas-vjp5.onrender.com/api/departments",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: department,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log("Failed to create department:", data);
        alert(data.message || "Failed to create department");
        return;
      }

      setDepartments([...departments, data]);
    }

    setDepartment("");
    setShowForm(false);

  } catch (error) {
    console.error("Error saving department:", error);
  }
};

  // Edit Department
  const handleEditDepartment = (dept: any) => {
    setEditingId(dept.id);
    setDepartment(dept.name);
    setShowForm(true);
  };

  // Delete Department
 const handleDeleteDepartment = async (id: number) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this department?"
  );

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login again");
      return;
    }

    const response = await fetch(
      `https://hrms-saas-vjp5.onrender.com/api/departments/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to delete department");
      return;
    }

    setDepartments(
      departments.filter((department) => department.id !== id)
    );

  } catch (error) {
    console.error("Error deleting department:", error);
    alert("Server error");
  }
};

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Departments
        </h1>

        <button
          onClick={() => {
            setEditingId(null);
            setDepartment("");
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Department
        </button>

      </div>

      <div className="bg-white shadow rounded-lg p-5">

        <input
          type="text"
          placeholder="Search Department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />

        <table className="w-full">

          <thead>
            <tr className="border-b text-left">
              <th className="py-3">ID</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredDepartments.length > 0 ? (

              filteredDepartments.map((department) => (

                <tr
                  key={department.id}
                  className="border-b"
                >

                  <td className="py-3">
                    {department.id}
                  </td>

                  <td>
                    {department.name}
                  </td>

                  <td>

                    <button
                      onClick={() =>
                        handleEditDepartment(department)
                      }
                      className="text-blue-600 mr-3"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteDepartment(department.id)
                      }
                      className="text-red-600"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td
                  colSpan={3}
                  className="text-center py-4 text-gray-500"
                >
                  No Departments Found
                </td>
              </tr>

            )}

          </tbody>

        </table>

        {showForm && (

          <div className="mt-6 bg-white p-6 rounded-lg shadow">

            <h2 className="text-xl font-bold mb-4">
              {editingId !== null
                ? "Edit Department"
                : "Add Department"}
            </h2>

            <input
              className="border p-2 rounded w-full mb-3"
              placeholder="Department Name"
              value={department}
              onChange={(e) =>
                setDepartment(e.target.value)
              }
            />

            <button
              onClick={handleSaveDepartment}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              {editingId !== null
                ? "Update Department"
                : "Save Department"}
            </button>

          </div>

        )}

      </div>

    </div>
  );
}

export default Departments;