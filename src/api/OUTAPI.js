import Api from '../common/fetch'

export default {
    getMaterialData(request) {
        return Api.post(`/output_data_out/`, request)
    },
    uploadFile(request) {
        return Api.post(`/upload_out_file/`, request)
    }
}