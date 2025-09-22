import { useNavigate } from "react-router-dom"

export default function PostCard({ post }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/posts/${post._id}`)}  // 👈 navigate to PostDetails
      style={{
        background: "#111",
        borderRadius: "12px",
        padding: "15px",
        marginBottom: "20px",
        color: "white",
        cursor: "pointer",
        transition: "0.3s",
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {post.image && (
        <img
          src={post.image}
          alt="post"
          style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
        />
      )}
      {post.video && (
        <video
          src={post.video}
          controls
          style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
        />
      )}

      <h3>{post.title}</h3>
      <p>{post.content?.slice(0, 100)}...</p>
      <p style={{ fontSize: "0.9rem", color: "#0f0" }}>
        {post.likes?.length || 0} Likes • {post.comments?.length || 0} Comments
      </p>
    </div>
  )
}
