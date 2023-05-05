import Api from '../common/fetch'

export default {
    getCIFData(request) {
        return Api.post(`/output_data_cif/`, request)
    },
    uploadCIFFile(formData) {
        return Api.post(`/upload_cif_file/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}