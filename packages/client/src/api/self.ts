import axios from 'axios'

export const selfApi = axios.create({
  baseURL: '/'
})
