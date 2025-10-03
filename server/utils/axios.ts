import axios from 'axios'

const baseURL = 'https://8467.wu.elitepro.ltd/api'

export const api = axios.create({
  baseURL,
  timeout: 10000,
})

api.interceptors.response.use(
  (resp) => resp,
  (err) => {
    console.error('External API error:', {
      url: err.config?.url,
      status: err.response?.status,
      data: err.response?.data,
    })
    return Promise.reject(err)
  }
)
