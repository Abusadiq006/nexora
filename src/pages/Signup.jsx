import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import toast from "react-hot-toast";

export default function Signup() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/signup", formData);

      // ✅ Save token so user stays logged in
      localStorage.setItem("token", data.token);

      toast.success("Signup successful! Welcome 🎉");

      // ✅ Redirect to dashboard
      navigate("/feeds");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #000 60%, #056844ff)",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#111",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 0 20px rgba(0,255,0,0.3)",
          width: "350px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            fontWeight: "bold",
            fontSize: "2rem",
            textShadow: "0 0 10px #0f0",
          }}
        >
          Signup
        </h2>

        {/* Username */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #0f0",
            outline: "none",
          }}
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #0f0",
            outline: "none",
          }}
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #0f0",
            outline: "none",
          }}
        />

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            background: "#0f0",
            color: "black",
            border: "none",
            padding: "12px",
            borderRadius: "8px",
            fontWeight: "bold",
            width: "100%",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          Sign Up
        </button>

        <p style={{ marginTop: "15px", fontSize: "0.9rem" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#0f0", textDecoration: "none" }}>
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
