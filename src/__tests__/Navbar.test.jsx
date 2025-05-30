/* eslint-env jest */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/Navbar";

/* global describe, it, expect */

describe("Navbar component", () => {
  it("renders navigation links after opening the menu", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const openMenuButtons = screen.getAllByRole("button", {
      name: /open menu/i,
    });
    const openMenuButton = openMenuButtons[0];
    expect(openMenuButton).toBeInTheDocument();

    fireEvent.click(openMenuButton);

    const tasksLinks = screen.getAllByRole("link", { name: /tasks/i });
    const statsLinks = screen.getAllByRole("link", { name: /stats/i });

    expect(tasksLinks.length).toBeGreaterThan(0);
    expect(statsLinks.length).toBeGreaterThan(0);
  });
});
