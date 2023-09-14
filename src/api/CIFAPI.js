import Api from '../common/fetch'

export default {
    getMaterialData(request) {
        return Api.post('/output_data_cif/', request)
    },
    uploadFile(request) {
        return Api.post('/upload_file/', request)
    }
}