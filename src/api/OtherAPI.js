import Api from '../common/fetch'

export default {
    getGroups(request) {
        return Api.post('/get_columns/', request)
    },
    downloadFile(request) {
        return Api.post('/download_file/', request, {
            responseType: 'blob'
        })
    },
    uploadFile(request) {
        return Api.post('/upload_file/', request)
    },
}