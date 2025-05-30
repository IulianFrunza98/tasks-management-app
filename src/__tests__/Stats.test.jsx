import React from "react";
import { render, screen } from "@testing-library/react";
import Stats from "../pages/Stats";
import { TaskProvider } from "../contexts/TaskContext";

/* global describe, it, expect, beforeAll, global */

beforeAll(() => {
  global.ResizeObserver = class {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
  };
});

describe("Stats page", () => {
  it("renders stats labels", () => {
    render(
      <TaskProvider>
        <Stats />
      </TaskProvider>
    );

    expect(screen.getByText(/total tasks/i)).toBeInTheDocument();
    expect(screen.getByText(/completed/i)).toBeInTheDocument();
    expect(screen.getByText(/remaining/i)).toBeInTheDocument();
  });
});
