import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { department: "IT", employees: 5 },
  { department: "HR", employees: 3 },
  { department: "Finance", employees: 2 },
];

function DepartmentChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">
        Employees by Department
      </h2>
      <ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>
    <XAxis dataKey="department" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="employees" fill="#3B82F6" />
  </BarChart>
</ResponsiveContainer>
    </div>
  );
}

export default DepartmentChart;