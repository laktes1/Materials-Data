import Api from '../common/fetch'

export default {
    getCIFData(request) {
        return Api.post(`/output_data_cif/`, request)
    },
    // uploadCIFFile(request) {
    //     return Api.post(`/upload_cif_file/`, request)
    // }
}