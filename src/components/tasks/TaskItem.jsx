// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useTask } from "../../contexts/TaskContext";
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "../../ui/Button";
import React, { useState } from "react";
import toast from "react-hot-toast";

function TaskItem({ task }) {
  const { dispatch } = useTask();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  function handleEditToggle() {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      if (editedText.trim() && editedText !== task.text) {
        dispatch({
          type: "EDIT_TASK",
          payload: { id: task.id, text: editedText },
        });
      }
      setIsEditing(false);
    }
  }

  return (
    <motion.li
      layout
      exit={{ opacity: 0, y: 10 }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative flex gap-2 justify-between w-full bg-white shadow-md py-4 px-6 rounded-lg transition-all ${
        task.completed ? "opacity-60" : "hover:shadow-lg"
      }`}
    >
      <div
        className={`absolute left-0 top-0 h-full w-1 rounded-l ${
          task.completed ? "bg-green-500" : "bg-blue-400"
        }`}
      />
      {isEditing ? (
        <input
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          type="text"
          className="border w-full bg-white border-gray-300 px-2 py-1 rounded outline-none"
        />
      ) : (
        <span
          className={`${
            task.completed ? "line-through text-gray-400" : ""
          } cursor-pointer`}
          onClick={() =>
            dispatch({ type: "TOGGLE_COMPLETE", payload: task.id })
          }
        >
          {task.text}
        </span>
      )}

      <div className="flex gap-2 items-center ml-4">
        <Button
          onClick={() => {
            dispatch({ type: "DELETE_TASK", payload: task.id });
            toast.error("Task deleted");
          }}
          className="bg-red-500 text-white hover:bg-red-600 transition"
        >
          <FaTrash />
        </Button>

        <Button
          onClick={handleEditToggle}
          className={`${
            isEditing
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-green-500 hover:bg-green-600"
          } text-white transition`}
        >
          <FaEdit />
        </Button>
      </div>
    </motion.li>
  );
}

export default TaskItem;
