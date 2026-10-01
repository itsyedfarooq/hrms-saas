import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface Employee {
  id: number;
  name: string;
  department: string;
  email: string;
  phone: string;
  position: string;
  salary: string;
  image: string;
  status: string;
  joinDate: string;
}

export interface Department {
  id: number;
  name: string;
}

export interface Payroll {
  id: number;
  employee: string;
  salary: string;
}

export interface Attendance {
  id: number;
  employee: string;
  date: string;
  status: string;
}

export interface Leave {
  id: number;
  employee: string;
  leaveType: string;
  days: string;
}

export interface Expense {
  id: number;
  employee: string;
  type: string;
  amount: string;
  date: string;
}

type AppContextType = {
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;

  departments: Department[];
  setDepartments: React.Dispatch<React.SetStateAction<Department[]>>;

  payrolls: Payroll[];
  setPayrolls: React.Dispatch<React.SetStateAction<Payroll[]>>;

  attendances: Attendance[];
  setAttendances: React.Dispatch<React.SetStateAction<Attendance[]>>;

  leaves: Leave[];
  setLeaves: React.Dispatch<React.SetStateAction<Leave[]>>;

  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
};

export const AppContext = createContext<AppContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const AppProvider = ({ children }: Props) => {

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [payrolls, setPayrolls] = useState<Payroll[]>([]);
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Get token
  const getToken = () => {
    return localStorage.getItem("token");
  };

  // Fetch Employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = getToken();

        if (!token) return;

        const response = await fetch(
          "https://hrms-saas-vjp5.onrender.com/api/employees",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setEmployees(data);
        }
      } catch (error) {
        console.error("Employees error:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Fetch Departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const token = getToken();

        if (!token) return;

        const response = await fetch(
          "https://hrms-saas-vjp5.onrender.com/api/departments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setDepartments(data);
        }
      } catch (error) {
        console.error("Departments error:", error);
      }
    };

    fetchDepartments();
  }, []);

  // Fetch Payrolls
  useEffect(() => {
    const fetchPayrolls = async () => {
      try {
        const token = getToken();

        if (!token) return;

        const response = await fetch(
          "https://hrms-saas-vjp5.onrender.com/api/payrolls",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setPayrolls(data);
        }
      } catch (error) {
        console.error("Payroll error:", error);
      }
    };

    fetchPayrolls();
  }, []);

  // Fetch Attendance
  useEffect(() => {
    const fetchAttendances = async () => {
      try {
        const token = getToken();

        if (!token) return;

        const response = await fetch(
          "https://hrms-saas-vjp5.onrender.com/api/attendances",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setAttendances(data);
        }
      } catch (error) {
        console.error("Attendance error:", error);
      }
    };

    fetchAttendances();
  }, []);

  // Fetch Leaves
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const token = getToken();

        if (!token) return;

        const response = await fetch(
          "https://hrms-saas-vjp5.onrender.com/api/leaves",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setLeaves(data);
        }
      } catch (error) {
        console.error("Leave error:", error);
      }
    };

    fetchLeaves();
  }, []);

  // Fetch Expenses
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = getToken();

        if (!token) return;

        const response = await fetch(
          "https://hrms-saas-vjp5.onrender.com/api/expenses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setExpenses(data);
        }
      } catch (error) {
        console.error("Expenses error:", error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <AppContext.Provider
      value={{
        employees,
        setEmployees,

        departments,
        setDepartments,

        payrolls,
        setPayrolls,

        attendances,
        setAttendances,

        leaves,
        setLeaves,

        expenses,
        setExpenses,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};