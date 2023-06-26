import axios from 'axios'
const instance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken')!)}`
  }
})
export default instance
