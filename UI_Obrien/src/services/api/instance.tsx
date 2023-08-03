import axios from 'axios'
const instance = axios.create({
  // baseURL: 'http://localhost:8000/api/',
  baseURL: 'https://cx3crx-8000.csb.app/api/',
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken')!)}`
  }
})
export default instance
