import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000',
})

// Automatically attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth
export const register = (email, password) =>
  api.post('/auth/register', { email, password })

export const login = async (email, password) => {
  const form = new URLSearchParams()
  form.append('username', email)
  form.append('password', password)
  return api.post('/auth/login', form)
}

// Jobs
export const getJobs = () => api.get('/jobs/')
export const createJob = (data) => api.post('/jobs/', data)
export const updateJob = (id, data) => api.patch(`/jobs/${id}`, data)
export const deleteJob = (id) => api.delete(`/jobs/${id}`)

export default api