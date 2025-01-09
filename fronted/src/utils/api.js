import axios from 'axios'

const baseURL = 'https://proyecto10-noviembre-1.onrender.com/api' // URL en producción

export const fetchAPI = async (method, url, data = null) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios({
      method,
      url: `${baseURL}${url}`,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      data
    })
    return response.data
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message)
    throw error
  }
}
