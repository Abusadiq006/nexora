🗂️ Project Snapshot: Nexora

->  Type: Fullstack MERN-style project (React frontend + ->  Node/Express backend).

* Backend:

->  Built with Express.js.

->  MongoDB (Atlas) for storage.

->  JWT auth with protect middleware.

->  Endpoints for auth, posts, (and we planned notes/products later).

->  Post model includes title, content, media, author.

->  Controllers: createPost, getAllPosts, getUserPosts, updateUserPost, deleteUserPost, likePost.

* Frontend:

->  React (with React Router).

->  State via hooks + localStorage for token persistence.

->  User dashboard shows posts authored by the logged-in user.

* Recent Fix:

->  Posts disappearing after logout/login → solved by making sure getUserPosts queries using req.user._id from the decoded JWT.

* Current Status:

✅ Auth & post creation working.

✅ User-specific posts retrieval fixed.

✅ GitHub repo created + .env secured in .gitignore.

⏳ Deployment next (Render/Vercel).