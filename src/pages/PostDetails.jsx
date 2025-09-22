import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../api"
import toast from "react-hot-toast"

export default function PostDetails() {
  const { id } = useParams()  // get postId from URL
  const [post, setPost] = useState(null)
  const [comment, setComment] = useState("")

  const fetchPost = async () => {
    try {
      const { data } = await api.get(`/posts/${id}`)
      setPost(data)
    } catch (err) {
      toast.error("Failed to load post")
    }
  }

  const handleLike = async () => {
    try {
      await api.put(`/posts/${id}/like`)
      toast.success("Post liked")
      fetchPost() // refresh likes count
    } catch (err) {
      toast.error("Failed to like post")
    }
  }

  const handleComment = async (e) => {
    e.preventDefault()
    try {
      await api.post(`/comments/${id}`, { text: comment })
      toast.success("Comment added")
      setComment("")
      fetchPost() // refresh comments
    } catch (err) {
      toast.error("Failed to add comment")
    }
  }

  useEffect(() => {
    fetchPost()
  }, [id])

  if (!post) return <p>Loading...</p>

  return (
    <div style={{ padding: "20px" }}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p><b>Likes:</b> {post.likes?.length || 0}</p>
      <button onClick={handleLike}>Like 👍</button>

      <h3>Comments</h3>
      {post.comments?.length === 0 && <p>No comments yet</p>}
      {post.comments?.map((c, i) => (
        <div key={i} style={{ borderTop: "1px solid #ddd", padding: "5px 0" }}>
          <p><b>{c.user?.username || "Anon"}:</b> {c.text}</p>
        </div>
      ))}

      <form onSubmit={handleComment} style={{ marginTop: "15px" }}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          required
          style={{ padding: "5px", width: "70%" }}
        />
        <button type="submit" style={{ marginLeft: "10px" }}>Post</button>
      </form>
    </div>
  )
}
