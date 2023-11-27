import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://server.tg-delivery.ru/api/menu',
  validateStatus: () => true,
})

export default instance
