import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #000 60%, #013220)",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
        fontFamily: "Arial, sans-sarif",
      }}
    >
      <h1 style={{ fontSize: "4rem", 
        fontWeight: "bold", 
        marginBottom: "15px",
        textShadow: "0 0 20px #0f0, 0 0 40px #0f0" }}>
        NEXORA
      </h1>
      <p style={{ fontSize: "1.4rem", 
        marginBottom: "50px", 
        color: "#0f0",
        fontStyle: "italic", }}>
        Connect • Share • Explore
      </p>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/signup">
          <button
            style={{
              background: "white",
              color: "black",
              border: "none",
              padding: "14px 28px",
              borderRadius: "10px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s ease",
              boxShadow: "0 4px 15px rgba(255,255,255,0.3)"
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1")}
          >
            Sign Up
          </button>
        </Link>

        <Link to="/login">
          <button
            style={{
              background: "#0f0",
              color: "black",
              border: "none",
              padding: "14px 28px",
              borderRadius: "10px",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "0.3s ease",
              boxShadow: "0 4px 15px rgba(0,255,0,0.4)"
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.1")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}
