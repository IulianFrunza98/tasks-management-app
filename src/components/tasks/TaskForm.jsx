// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import React, { useState, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { useTask } from "../../contexts/TaskContext";
import Button from "../../ui/Button";
import toast from "react-hot-toast";

function TaskForm() {
  const { dispatch } = useTask();
  const inputRef = useRef(null);
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!text.trim()) {
      toast.error("Task cannot be empty");
      return;
    }

    dispatch({ type: "ADD_TASK", payload: text });
    setText("");
    inputRef.current.focus();
    toast.success("Task added");
  }

  return (
    <motion.form
      className="py-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl text-center font-bold mb-4">Task List</h1>

      <div className="flex justify-center items-center gap-2 w-full">
        <label htmlFor="addTask" className="sr-only">
          Add task
        </label>
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Add a new task..."
          className="w-full sm:w-[20rem] bg-white border border-gray-300 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-400 transition placeholder:text-gray-400"
          id="addTask"
          name="addTask"
          required
        />
        <Button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          <FaPlus />
        </Button>
      </div>
    </motion.form>
  );
}

export default TaskForm;
