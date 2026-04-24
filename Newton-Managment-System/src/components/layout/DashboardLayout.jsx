import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  // toggle sidebar (open/close from header button)
  const toggleSidebar = () => {
    setOpen((prev) => !prev);
  };

  // close sidebar helper
  const closeSidebar = () => {
    setOpen(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      {/* HEADER */}
      <Header onToggleSidebar={toggleSidebar} />

      {/* BODY */}
      <div className="flex flex-1 relative overflow-hidden">
        {/* MOBILE OVERLAY */}
        {open && (
          <div
            onClick={closeSidebar}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
          />
        )}

        {/* SIDEBAR */}
        <div
          className={`
            fixed top-16 left-0 z-50
            h-[calc(100vh-64px)]
            transition-transform duration-300 ease-in-out
            md:static md:translate-x-0
            ${open ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <Sidebar closeSidebar={closeSidebar} />
        </div>

        {/* MAIN CONTENT (clicking here closes sidebar) */}
        <main
          onClick={closeSidebar}
          className="flex-1 overflow-y-auto bg-white p-4 md:p-6"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;