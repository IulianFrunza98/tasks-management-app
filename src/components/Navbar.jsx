// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTasks, FaBars, FaTimes } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((p) => !p);

  return (
    <>
      {/* Hamburger button mobile */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="hamburger"
            onClick={toggleMenu}
            className="fixed top-4 left-4 p-2 rounded-md bg-blue-800 text-white text-xl z-60 sm:hidden"
            aria-label="Open menu"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaBars />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isOpen ? 192 : 64 }} // 12rem = 192px, 4rem = 64px
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        className="fixed top-0 left-0 h-screen bg-blue-800 text-white flex-col items-center z-50 hidden sm:flex overflow-hidden shadow-md"
      >
        <motion.button
          onClick={toggleMenu}
          className="mt-4 p-2 rounded-md hover:bg-blue-700 text-white text-xl"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </motion.button>

        {/* Links */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ delay: isOpen ? 0.15 : 0 }}
          className={`flex flex-col items-start gap-6 mt-10 w-full pl-4 ${
            !isOpen ? "pointer-events-none" : ""
          }`}
        >
          <li>
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-blue-100 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white transition"
            >
              <FaTasks />
              <span>Tasks</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/stats"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-blue-100 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white transition"
            >
              <IoIosStats />
              <span>Stats</span>
            </NavLink>
          </li>
        </motion.ul>
      </motion.aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
              className="fixed top-0 bottom-0 left-0 w-[70vw] bg-blue-800 text-white z-50 flex flex-col p-4 sm:hidden"
            >
              <motion.button
                onClick={toggleMenu}
                className="self-end p-2 mt-2"
                aria-label="Close menu"
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes size={24} />
              </motion.button>

              <nav className="mt-2 flex flex-col gap-6 text-lg">
                <NavLink
                  to="/"
                  className="flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <FaTasks />
                  <span>Tasks</span>
                </NavLink>
                <NavLink
                  to="/stats"
                  className="flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <IoIosStats />
                  <span>Stats</span>
                </NavLink>
              </nav>
            </motion.div>

            {/* Overlay */}
            <motion.div
              className="fixed inset-0 backdrop-blur-sm z-40 sm:hidden"
              onClick={toggleMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
