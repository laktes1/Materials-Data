import Api from '../common/fetch'

export default {
    getOUTData(request) {
        return Api.post(`/output_data_out/`, request)
    },
    // uploadOUTFile(request) {
    //     return Api.post(`/upload_out_file/`, request)
    // }
}