import axios from 'axios'

const API_URL = process.env.API_URL || 'http://localhost:1337'
const WEB_URL = process.env.WEB_URL || 'http://localhost:3000'

const api = axios.create({ baseURL: API_URL })

export { api, API_URL, WEB_URL }
