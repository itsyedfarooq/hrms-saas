import { Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Dashboard from "./pages/Dashboard1";
import DashboardLayout from "./layouts/DashboardLayout";

import Employees from "./pages/Employees";
import Departments from "./pages/Departments";
import Leave from "./pages/Leave";
import Payroll from "./pages/Payroll";
import Expenses from "./pages/Expenses";
import EmployeeProfile from "./pages/EmployeeProfile";
import Attendance from "./pages/Attendance";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* LOGIN */}
      <Route path="/" element={<Login />} />

      {/* DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* EMPLOYEES */}
      <Route
        path="/employees"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Employees />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* EMPLOYEE PROFILE */}
      <Route
        path="/employee/:id"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <EmployeeProfile />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* DEPARTMENTS */}
      <Route
        path="/departments"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Departments />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* LEAVE */}
      <Route
        path="/leave"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Leave />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* PAYROLL */}
      <Route
        path="/payroll"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Payroll />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* EXPENSES */}
      <Route
        path="/expenses"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Expenses />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* ATTENDANCE */}
      <Route
        path="/attendance"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Attendance />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;