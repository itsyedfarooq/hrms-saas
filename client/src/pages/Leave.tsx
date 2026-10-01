import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

function Leave() {
  const context = useContext(AppContext);

  if (!context) return null;

  const { leaves, setLeaves } = context;

  const [showForm, setShowForm] = useState(false);
  const [employee, setEmployee] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [days, setDays] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  // GET LEAVES
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "https://hrms-saas-vjp5.onrender.com/api/leaves",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Failed to fetch leaves");
          return;
        }

        setLeaves(data);
      } catch (error) {
        console.error("Fetch leaves error:", error);
        alert("Unable to connect to server");
      }
    };

    fetchLeaves();
  }, [setLeaves]);

  const filteredLeaves = leaves.filter((leave) =>
    leave.employee.toLowerCase().includes(search.toLowerCase())
  );

  // ADD / UPDATE LEAVE
  const handleSaveLeave = async () => {
    if (!employee || !leaveType || !days) {
      alert("Please fill all leave details");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const url =
        editingId !== null
          ? `https://hrms-saas-vjp5.onrender.com/api/leaves/${editingId}`
          : "https://hrms-saas-vjp5.onrender.com/api/leaves";

      const response = await fetch(url, {
        method: editingId !== null ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          employee,
          leaveType,
          days,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.error
            ? `${data.message}\n\nActual error: ${data.error}`
            : data.message || "Failed to save leave"
        );
        return;
      }

      if (editingId !== null) {
        setLeaves(
          leaves.map((leave) =>
            leave.id === editingId ? data : leave
          )
        );

        alert("Leave updated successfully!");
      } else {
        setLeaves([...leaves, data]);

        alert("Leave added successfully!");
      }

      setEmployee("");
      setLeaveType("");
      setDays("");
      setEditingId(null);
      setShowForm(false);
    } catch (error) {
      console.error("Save leave error:", error);
      alert("Unable to connect to server");
    }
  };

  // DELETE LEAVE
  const handleDeleteLeave = async (id: number) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://hrms-saas-vjp5.onrender.com/api/leaves/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.error
            ? `${data.message}\n\nActual error: ${data.error}`
            : data.message || "Failed to delete leave"
        );
        return;
      }

      setLeaves(
        leaves.filter((leave) => leave.id !== id)
      );

      alert("Leave deleted successfully!");
    } catch (error) {
      console.error("Delete leave error:", error);
      alert("Unable to connect to server");
    }
  };

  // EDIT LEAVE
  const handleEditLeave = (leave: any) => {
    setEditingId(leave.id);
    setEmployee(leave.employee);
    setLeaveType(leave.leaveType);
    setDays(String(leave.days));
    setShowForm(true);
  };

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Leave</h1>

        <button
          onClick={() => {
            setEditingId(null);
            setEmployee("");
            setLeaveType("");
            setDays("");
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Leave
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
              <th>Leave Type</th>
              <th>Days</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredLeaves.length > 0 ? (
              filteredLeaves.map((leave) => (

                <tr
                  key={leave.id}
                  className="border-b"
                >

                  <td className="py-3">
                    {leave.id}
                  </td>

                  <td>
                    {leave.employee}
                  </td>

                  <td>
                    {leave.leaveType}
                  </td>

                  <td>
                    {leave.days}
                  </td>

                  <td>

                    <button
                      onClick={() =>
                        handleEditLeave(leave)
                      }
                      className="text-blue-600 mr-3"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteLeave(leave.id)
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
                  colSpan={5}
                  className="text-center py-4 text-gray-500"
                >
                  No Leaves Found
                </td>
              </tr>

            )}

          </tbody>

        </table>

        {showForm && (

          <div className="mt-6 bg-white shadow rounded-lg p-5">

            <h2 className="text-xl font-bold mb-4">
              {editingId !== null
                ? "Edit Leave"
                : "Add Leave"}
            </h2>

            <input
              className="border p-2 rounded w-full mb-3"
              placeholder="Employee Name"
              value={employee}
              onChange={(e) =>
                setEmployee(e.target.value)
              }
            />

            <input
              className="border p-2 rounded w-full mb-3"
              placeholder="Leave Type"
              value={leaveType}
              onChange={(e) =>
                setLeaveType(e.target.value)
              }
            />

            <input
              type="number"
              className="border p-2 rounded w-full mb-3"
              placeholder="Number of Days"
              value={days}
              onChange={(e) =>
                setDays(e.target.value)
              }
            />

            <button
              onClick={handleSaveLeave}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              {editingId !== null
                ? "Update Leave"
                : "Save Leave"}
            </button>

          </div>

        )}

      </div>

    </div>
  );
}

export default Leave;