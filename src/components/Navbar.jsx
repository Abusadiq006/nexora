import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { Menu } from "lucide-react"
import Sidebar from "./Sidebar"


export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("token")
    toast.success("Logged out")
    navigate("/")
  }

  return (
    <>
      {/* Top Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "7px 20px",
          background: "#013220",
          color: "white",
        }}
      >
        <h1
          style={{ cursor: "pointer", fontWeight: "bold", color: "white" }}
          onClick={() => navigate("/")}
        >
          NEXORA
        </h1>

        {/* Show hamburger only if logged in */}
        {token && (
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "1.8rem",
              cursor: "pointer",
            }}
          >
            ☰
          </button>
        )}
      </nav>

      {/* Navbar (mobile only) */}
     

      {/* Sidebar (controlled by Navbar) */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Sidebar (only if open) */}
      {sidebarOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: sidebarOpen ? 0 : "-300px", // slide animation
            width: "250px",
            height: "100%",
            background: "#013220",
            color: "white",
            padding: "20px",
            boxShadow: "-2px 0 10px rgba(0,0,0,0.7)",
            zIndex: 1000,
            transition: "right 0.3s ease-in-out", // smooth slide
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "1.5rem",
              cursor: "pointer",
              marginBottom: "20px",
            }}
          >
            ✕
          </button>

          <p
            onClick={() => {
              navigate("/feed")
              setSidebarOpen(false)
            }}
            style={{ cursor: "pointer", margin: "20px 0", color: "#0f0" }}
          >
            📰 Feed
          </p>

          <p
            onClick={() => {
              navigate("/dashboard")
              setSidebarOpen(false)
            }}
            style={{ cursor: "pointer", margin: "20px 0", color: "#0f0" }}
          >
            📊 Dashboard
          </p>

          <p
            onClick={handleLogout}
            style={{ cursor: "pointer", margin: "20px 0", color: "tomato" }}
          >
            🚪 Logout
          </p>
        </div>
      )}
    </>
  )
}
