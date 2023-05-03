import axios from 'axios'

const service = axios.create({
    baseURL: `${window.location.origin}/api`, // TODO maybe change
})

export default service