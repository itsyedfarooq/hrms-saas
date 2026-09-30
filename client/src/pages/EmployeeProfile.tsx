import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  salary: number;
}

function EmployeeProfile() {
  const { id } = useParams();

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:5000/api/employees/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.log(data);
          setLoading(false);
          return;
        }

        setEmployee(data);
      } catch (error) {
        console.error("Error fetching employee:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold">
          Loading employee...
        </h2>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold text-red-600">
          Employee Not Found
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Employee Profile
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-8">

        <div className="space-y-3">

          <h2 className="text-3xl font-bold mb-4">
            {employee.name}
          </h2>

          <p>
            <strong>Employee ID:</strong>{" "}
            {employee.id}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {employee.email}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {employee.phone}
          </p>

          <p>
            <strong>Position:</strong>{" "}
            {employee.position}
          </p>

          <p>
            <strong>Department:</strong>{" "}
            {employee.department}
          </p>

          <p>
            <strong>Salary:</strong>{" "}
            ₹{employee.salary}
          </p>

        </div>

      </div>

    </div>
  );
}

export default EmployeeProfile;