/* eslint-env jest */
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import TaskForm from "../components/tasks/TaskForm";
import { TaskProvider } from "../contexts/TaskContext";

describe("TaskForm component", () => {
  it("renders input and button", () => {
    render(
      <TaskProvider>
        <TaskForm />
      </TaskProvider>
    );
    expect(screen.getByPlaceholderText(/Add a new task/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("allows user to type and submit", () => {
    render(
      <TaskProvider>
        <TaskForm />
      </TaskProvider>
    );
    const input = screen.getByPlaceholderText(/Add a new task/i);
    fireEvent.change(input, { target: { value: "New Task" } });
    expect(input.value).toBe("New Task");
  });
});
