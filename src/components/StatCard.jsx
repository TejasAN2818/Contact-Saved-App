import { FaArrowUp } from "react-icons/fa";

export default function StatCard({
  title,
  value,
  color = "blue",
}) {
  const colors = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    red: "bg-red-500",
    orange: "bg-orange-500",
    purple: "bg-purple-500",
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all duration-300">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-slate-500 text-sm">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-3 text-slate-800">
            {value}
          </h2>

        </div>

        <div
          className={`w-14 h-14 rounded-2xl ${colors[color]} flex items-center justify-center text-white`}
        >
          <FaArrowUp />
        </div>

      </div>

    </div>
  );
}