import { NavLink, useNavigate } from "react-router-dom";
function Sidebar() {
  const navigate = useNavigate();

const handleLogout = () => {
  navigate("/");
};
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-10">
        HRMS
      </h1>

      <ul className="space-y-5">
       <NavLink to="/dashboard">
  <li className="hover:text-blue-400 cursor-pointer">
    Dashboard
  </li>
</NavLink>
       <NavLink to="/employees">
  <li className="hover:text-blue-400 cursor-pointer">
    Employees
  </li>
</NavLink>

<NavLink to="/departments">
  <li className="hover:text-blue-400 cursor-pointer">
    Departments
  </li>
</NavLink>
<NavLink to="/attendance">
  <li className="hover:text-blue-400 cursor-pointer">
    Attendance
  </li>
</NavLink>

<NavLink to="/leave">
  <li className="hover:text-blue-400 cursor-pointer">
    Leave
  </li>
</NavLink>

<NavLink to="/payroll">
  <li className="hover:text-blue-400 cursor-pointer">
    Payroll
  </li>
</NavLink>

<NavLink to="/expenses">
  <li className="hover:text-blue-400 cursor-pointer">
    Expenses
  </li>
</NavLink>
<li
  onClick={handleLogout}
  className="hover:text-red-400 cursor-pointer"
>
  Logout
</li>
      </ul>
    </div>
  );
}

export default Sidebar;