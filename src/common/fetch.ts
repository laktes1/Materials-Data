import axios from 'axios'

const service = axios.create({
    baseURL: window.location.origin,
})

export default service