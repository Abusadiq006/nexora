import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api"
import toast from "react-hot-toast"
import Sidebar from "../components/Sidebar"



export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState({ title: "", content: "" })
  const navigate = useNavigate()


  const Dashboard = () => {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold"
          >User Dashboard</h1>
          {/* Your profile, stats, posts, etc. */}
        </div>
      </div>
    )
  }

  const fetchDashboardData = async () => {
    try {
      // ✅ Fetch user
      const userRes = await api.get("/auth/me")
      setUser(userRes.data)

      // ✅ Fetch only this user’s posts
      const postsRes = await api.get("/posts/dashboard/user")
      setPosts(postsRes.data.posts || [])
    } catch (err) {
      toast.error("Failed to load dashboard")
    }
  }

  const handleCreatePost = async (e) => {
    e.preventDefault()
    if (!newPost.title || !newPost.content) {
      return toast.error("Title and content required")
    }

    try {
      const { data } = await api.post("/posts", newPost)
      setPosts([data, ...posts]) // ✅ update without reload
      setNewPost({ title: "", content: "" })
      toast.success("Post created 🎉")
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create post")
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/dashboard/${id}`)
      setPosts(posts.filter((p) => p._id !== id))
      toast.success("Post deleted")
    } catch (err) {
      toast.error("Delete failed")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    toast.success("Logged out")
    navigate("/login")
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  if (!user) return <p style={{ color: "white", textAlign: "center" }}>Loading...</p>

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #000 60%, #013220)",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      {/* Profile Header */}
      <div
        style={{
          background: "#111",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "20px",
          textAlign: "center",
          boxShadow: "0 0 20px rgba(0,255,0,0.3)",
        }}
      >
        <img
          src={`https://ui-avatars.com/api/?name=${user.username}&background=013220&color=fff`}
          alt="avatar"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            marginBottom: "10px",
          }}
        />
        <h2 style={{ margin: "5px 0" }}>{user.username}</h2>
        <p style={{ color: "#aaa" }}>{user.email}</p>
        <button
          onClick={() => navigate("/edit-profile")}
          style={{
            background: "#0f0",
            color: "black",
            border: "none",
            padding: "8px 15px",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Edit Profile
        </button>
      </div>

      {/* Create Post Section */}
      <div
        style={{
          background: "#111",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "20px",
          boxShadow: "0 0 20px rgba(0,255,0,0.3)",
        }}
      >
        <h3 style={{ marginBottom: "15px", textAlign: "center" }}>Create New Post</h3>
        <form onSubmit={handleCreatePost}>
          <input
            type="text"
            placeholder="Post Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "6px",
              border: "1px solid #0f0",
              outline: "none",
              background: "#000",
              color: "white",
            }}
          />
          <textarea
            placeholder="What's on your mind?"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "6px",
              border: "1px solid #0f0",
              outline: "none",
              background: "#000",
              color: "white",
              minHeight: "100px",
            }}
          />
          <button
            type="submit"
            style={{
              background: "#0f0",
              color: "black",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Post
          </button>
        </form>
      </div>

      {/* User Stats */}
      <div
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "12px",
          marginBottom: "20px",
          boxShadow: "0 0 20px rgba(0,255,0,0.3)",
          textAlign: "center",
        }}
      >
        <h3>Total Posts: {posts.length}</h3>
      </div>

      {/* Posts Section */}
      <div>
        <h2>Your Posts</h2>
        {posts.length === 0 && <p>No posts yet</p>}
        {posts.map((post) => (
          <div
            key={post._id}
            style={{
              background: "#111",
              padding: "15px",
              borderRadius: "12px",
              marginBottom: "15px",
              boxShadow: "0 0 10px rgba(0,255,0,0.2)",
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p style={{ fontSize: "0.9rem", color: "#aaa" }}>
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() => navigate(`/edit-post/${post._id}`)}
                style={{
                  background: "#0f0",
                  color: "black",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post._id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Actions Section */}
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <button
          onClick={handleLogout}
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  )
}


