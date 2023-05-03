import Api from '../common/fetch'

export default {
    getOUTData(request) {
        return Api.post(`/output_data_out/`, request)
    },
    // uploadCIFFile(request) {
    //     return Api.post(`/upload_cif_file/`, request)
    // }
}