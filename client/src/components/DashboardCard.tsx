import type { ReactNode } from "react";
type DashboardCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode; 
};

function DashboardCard({ title, value, icon }: DashboardCardProps) {
  return (
    <div className="bg-white shadow rounded-lg p-5 flex justify-between items-center">
        <div>
      <h2 className="text-gray-500">{title}</h2>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
    <div className="text-4xl text-blue-600">
      {icon}
    </div>
    </div>
  );
}

export default DashboardCard;