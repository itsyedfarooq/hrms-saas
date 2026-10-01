import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

function Attendance() {
  const context = useContext(AppContext);

  if (!context) return null;

  const { attendances, setAttendances, employees } = context;

  const [showForm, setShowForm] = useState(false);
  const [employee, setEmployee] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // GET ATTENDANCE
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "https://hrms-saas-vjp5.onrender.com/api/attendances",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Failed to fetch attendance");
          return;
        }

        setAttendances(data);
      } catch (error) {
        console.error("Fetch attendance error:", error);
      }
    };

    fetchAttendance();
  }, [setAttendances]);

  const filteredAttendance = attendances.filter((attendance) =>
    attendance.employee
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ADD / UPDATE ATTENDANCE
  const handleSaveAttendance = async () => {
    if (!employee || !date || !status) {
      alert("Please fill all attendance details");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const url =
        editingId !== null
          ? `https://hrms-saas-vjp5.onrender.com/api/attendances/${editingId}`
          : "https://hrms-saas-vjp5.onrender.com/api/attendances";

      const response = await fetch(url, {
        method: editingId !== null ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          employee,
          date,
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.error
            ? `${data.message}\n\nActual error: ${data.error}`
            : data.message || "Failed to save attendance"
        );
        return;
      }

      if (editingId !== null) {
        setAttendances(
          attendances.map((attendance) =>
            attendance.id === editingId ? data : attendance
          )
        );

        alert("Attendance updated successfully!");
      } else {
        setAttendances([...attendances, data]);

        alert("Attendance marked successfully!");
      }

      setEmployee("");
      setDate("");
      setStatus("");
      setEditingId(null);
      setShowForm(false);
    } catch (error) {
      console.error("Save attendance error:", error);
      alert("Unable to connect to server");
    }
  };

  // DELETE ATTENDANCE
  const handleDeleteAttendance = async (id: number) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://hrms-saas-vjp5.onrender.com/api/attendances/${id}`,
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
            : data.message || "Failed to delete attendance"
        );
        return;
      }

      setAttendances(
        attendances.filter((attendance) => attendance.id !== id)
      );

      alert("Attendance deleted successfully!");
    } catch (error) {
      console.error("Delete attendance error:", error);
      alert("Unable to connect to server");
    }
  };

  // EDIT ATTENDANCE
  const handleEditAttendance = (attendance: any) => {
    setEditingId(attendance.id);
    setEmployee(attendance.employee);
    setDate(attendance.date);
    setStatus(attendance.status);
    setShowForm(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Attendance Management
        </h1>

        <button
          onClick={() => {
            setEditingId(null);
            setEmployee("");
            setDate("");
            setStatus("");
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Mark Attendance
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
              <th>Employee</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredAttendance.length > 0 ? (
              filteredAttendance.map((attendance) => (
                <tr
                  key={attendance.id}
                  className="border-b"
                >
                  <td>{attendance.employee}</td>
                  <td>{attendance.date}</td>
                  <td>{attendance.status}</td>

                  <td>
                    <button
                      onClick={() =>
                        handleEditAttendance(attendance)
                      }
                      className="text-blue-600 mr-3"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteAttendance(attendance.id)
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
                  colSpan={4}
                  className="text-center py-4 text-gray-500"
                >
                  No Attendance Found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {showForm && (
          <div className="mt-6 bg-white shadow rounded-lg p-5">

            <h2 className="text-xl font-bold mb-4">
              {editingId !== null
                ? "Edit Attendance"
                : "Mark Attendance"}
            </h2>

            <select
              className="border p-2 rounded w-full mb-3"
              value={employee}
              onChange={(e) =>
                setEmployee(e.target.value)
              }
            >
              <option value="">Select Employee</option>

              {employees.map((emp) => (
                <option key={emp.id} value={emp.name}>
                  {emp.name}
                </option>
              ))}
            </select>

            <input
              type="date"
              className="border p-2 rounded w-full mb-3"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
            />

            <select
              className="border p-2 rounded w-full mb-3"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >
              <option value="">Select Status</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Leave">Leave</option>
            </select>

            <button
              onClick={handleSaveAttendance}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              {editingId !== null
                ? "Update Attendance"
                : "Save Attendance"}
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export default Attendance;