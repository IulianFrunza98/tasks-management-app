import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskList from "../components/tasks/TaskList";
import { TaskProvider } from "../contexts/TaskContext";

const { describe, it, expect } = global;

describe("TaskList component", () => {
  it("renders filter buttons", () => {
    render(
      <TaskProvider>
        <TaskList />
      </TaskProvider>
    );
    expect(screen.getByText(/All/i)).toBeInTheDocument();
  });
});
