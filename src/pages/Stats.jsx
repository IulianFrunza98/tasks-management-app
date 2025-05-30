// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useTask } from "../contexts/TaskContext";
import React from "react";
import { FaTasks, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

function Stats() {
  const { tasks = [] } = useTask();

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const incomplete = total - completed;

  const stats = [
    {
      key: "all",
      label: "Total tasks",
      icon: <FaTasks size={20} />,
      value: total,
    },
    {
      key: "completed",
      label: "Completed",
      icon: <FaCheckCircle size={20} />,
      value: completed,
    },
    {
      key: "incomplete",
      label: "Remaining",
      icon: <FaHourglassHalf size={20} />,
      value: incomplete,
    },
  ];

  const chartData = [
    { name: "Completed", value: completed || 0 },
    { name: "Remaining", value: incomplete || 0 },
  ];

  const COLORS = ["#22c55e", "#facc15"]; // green, yellow

  return (
    <div className="mt-[3.5rem] sm:mt-12 mb-12 px-4">
      <h1 className="text-2xl sm:text-xl text-center">Stats</h1>

      {/* Statistic Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tasks.length + "-" + completed}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:grid sm:grid-cols-3 gap-4 py-4"
          aria-label="Task statistics"
        >
          {stats.map(({ key, label, icon, value }) => (
            <motion.div
              key={key}
              layout
              className="flex flex-col items-center gap-2 bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100 p-4 rounded-md shadow-md"
            >
              {icon}
              <dl className="text-center">
                <dt className="font-semibold text-base sm:text-sm">{label}</dt>
                <dd className="text-base sm:text-sm">{value}</dd>
              </dl>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Donut Chart */}
      <div className="w-full max-w-md mx-auto mt-10 relative">
        <h2 className="text-center text-lg sm:text-base font-semibold mb-2">
          Task Completion Chart
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              isAnimationActive={true}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>

        {total === 0 && (
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400">
            No tasks yet
          </div>
        )}
      </div>
    </div>
  );
}

export default Stats;
