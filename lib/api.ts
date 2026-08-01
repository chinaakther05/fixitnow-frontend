import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000/api",
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      // localStorage থেকে accessToken রিড করা হচ্ছে
      const token = localStorage.getItem("accessToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;