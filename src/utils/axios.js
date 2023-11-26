import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://94.241.141.165:8080/api/menu',
  validateStatus: () => true,
})

export default instance
