import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://proyecto10enero.onrender.com' // URL del backend en producción
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
