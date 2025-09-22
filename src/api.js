import axois from "axios"


const api = axois.create({
    baseURL: "http://localhost:5000/api", // your backend
})


// Attach token automatically 
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
}
    return config
},
(error) => Promise.reject(error)
)


export default api