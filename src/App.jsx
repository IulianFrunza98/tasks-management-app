import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import React from "react";

import TaskList from "./components/tasks/TaskList";
import Stats from "./pages/Stats";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "8px",
            background: "#f0f9ff",
            color: "#0369a1",
            fontWeight: "600",
            fontSize: "1rem",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          },
          success: {
            style: {
              background: "#d1fae5",
              color: "#065f46",
              fontWeight: "700",
            },
            iconTheme: { primary: "#065f46", secondary: "#d1fae5" },
          },
          error: {
            style: {
              background: "#fee2e2",
              color: "#b91c1c",
              fontWeight: "700",
            },
            iconTheme: { primary: "#b91c1c", secondary: "#fee2e2" },
          },
        }}
      />

      <Router>
        <div className="min-h-screen flex bg-blue-50 justify-center">
          <Navbar />
          <main className="flex-1 px-4 sm:px-8 max-w-6xl mx-auto sm:ml-26 sm:mr-8">
            <Routes>
              <Route path="/" element={<TaskList />} />
              <Route path="stats" element={<Stats />} />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
}

export default App;
