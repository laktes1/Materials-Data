import Api from '../common/fetch'

export default {
    getGroups(request) {
        return Api.post(`/get_columns/`, request)
    },
    downloadFile(id) {
        return Api.get(`/download_file/${id}`)
    }
}