import Api from '../common/fetch'

export default {
    getGroups(request) {
        return Api.post('/get_columns/', request)
    },
    downloadFile(id) {
        return Api.get(`/download_file/${id}`)
    },
    uploadFile(request) {
        return Api.post('/upload_file/', request)
    }
}