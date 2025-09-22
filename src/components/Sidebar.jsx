import React, { useState } from "react";
import "./Sidebar.css"


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      {/* Hamburger button */}
      <button className={`sidebar ${isOpen ? "open" : ""}`}>
        {isOpen ? "x" : "="}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul>
          <li>Dashboard</li>
          <li>Profile</li>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      </div>

      {/* Overlay when sidebar is open */}
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
      </div>
  )
}


export default Sidebar