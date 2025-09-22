import { useEffect, useState } from "react"
import api from "../api"
import toast from "react-hot-toast"
import Masonry from "react-masonry-css"
import PostDetails from "../components/PostCard"
import PostCard from "../components/PostCard"


export default function Feed() {
  const [posts, setPosts] = useState([])

  const fetchPosts = async () => {
    try {
      const { data } = await api.get("/posts")
      setPosts(data)
    } catch (err) {
      toast.error("Failed to load posts")
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  // 🔹 Breakpoints for responsiveness
  const breakpointColumns = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  }

  return (
    <div style={{ padding: "20px",
       background: "linear-gradient(135deg, #000 60%, #056844ff)",
       height: "100vh",
       color: "white"
     }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#0f0" }}>
        Explore Feed
      </h2>

      <Masonry
        breakpointCols={breakpointColumns}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </Masonry>
    </div>
  )
}
