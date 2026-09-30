import {
  FaUsers,
  FaBuilding,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaWallet,
  FaUserCheck,
} from "react-icons/fa";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import DashboardCard from "../components/DashboardCard";
import DepartmentChart from "../components/DepartmentChart";
function Dashboard() {
  const context = useContext(AppContext);

  if (!context) return null;

const {
  employees,
  departments,
  payrolls,
  leaves,
  expenses,
  attendances,
} = context;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-gray-500 mt-2">
        Welcome to HRMS Dashboard
      </p>

<div className="grid grid-cols-3 md:grid-cols-4 gap-6 mt-8">
  <DashboardCard
    title="Employees"
    value={employees.length}  
    icon={<FaUsers />}
  />

  <DashboardCard
    title="Departments"
    value={departments.length}
    icon={<FaBuilding />}
  />

  <DashboardCard
    title="Leave Requests"
    value={leaves.length}
    icon={<FaCalendarCheck />}
  />

  <DashboardCard
    title="Payroll"
    value={payrolls.length}
    icon={<FaMoneyBillWave />}
  />

  <DashboardCard
    title="Expenses"
    value={expenses.length}
    icon={<FaWallet />}
  />
  <DashboardCard
  title="Attendance"
  value={attendances.length}
  icon={<FaUserCheck />}
/>
</div>
<DepartmentChart />
<div className="bg-white shadow rounded-lg p-5 mt-6">
  <h2 className="text-xl font-bold mb-4">
    Recent Employees
  </h2>

  <table className="w-full">
    <thead>
      <tr className="border-b text-left">
        <th className="py-2">Name</th>
        <th>Department</th>
        <th>Email</th>
      </tr>
    </thead>

    <tbody>
      {employees.slice(0, 5).map((employee) => (
        <tr key={employee.id} className="border-b">
          <td className="py-2">{employee.name}</td>
          <td>{employee.department}</td>
          <td>{employee.email}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
  );
}

export default Dashboard;