// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { useTask } from "../../contexts/TaskContext";
import React from "react";

import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import Button from "../../ui/Button";

function TaskList() {
  const { tasks, dispatch, filter } = useTask();

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  const filters = [
    { key: "all", label: "All" },
    { key: "completed", label: "Completed" },
    { key: "incomplete", label: "Remaining" },
  ];

  return (
    <div className="mt-[3rem] sm:mt-0 p-5 max-w-[60rem] w-full mx-auto my-12">
      <TaskForm />

      {/* Responsive filter buttons with vertical stack on small screens */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 my-6 px-2">
        {filters.map(({ key, label }) => (
          <button
            aria-pressed={filter === key}
            key={key}
            onClick={() => dispatch({ type: "SET_FILTER", payload: key })}
            className={`px-4 py-2 rounded font-semibold whitespace-nowrap flex-shrink-0 ${
              filter === key
                ? "bg-blue-600 text-white"
                : "bg-blue-200 text-blue-900 hover:bg-blue-300"
            } transition`}
          >
            {label}
          </button>
        ))}
      </div>

      {tasks.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-gray-500 py-10"
        >
          <p>No tasks yet. Add one above!</p>
        </motion.div>
      )}

      <ul
        aria-label="Task list"
        className="flex flex-wrap justify-center gap-4 mb-4 my-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </AnimatePresence>
      </ul>

      <div className="flex justify-center mt-4">
        {tasks.length > 0 && (
          <Button
            className="bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-600 transition"
            onClick={() => {
              if (confirm("Are you sure you want to delete all tasks?"))
                dispatch({ type: "CLEAR_LIST" });
            }}
          >
            Clear list
          </Button>
        )}
      </div>
    </div>
  );
}

export default TaskList;
