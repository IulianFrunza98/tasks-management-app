import React from "react";
import { render, screen } from "@testing-library/react";
import TaskItem from "../components/tasks/TaskItem";
import { TaskProvider } from "../contexts/TaskContext";

describe("TaskItem component", () => {
  const task = {
    id: 1,
    text: "Test task",
    completed: false,
  };

  it("renders task text", () => {
    render(
      <TaskProvider>
        <TaskItem task={task} />
      </TaskProvider>
    );
    expect(screen.getByText(/Test task/i)).toBeInTheDocument();
  });
});
