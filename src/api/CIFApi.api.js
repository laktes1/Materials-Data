import Api from '../common/fetch'

const routeUrl = '/api/cifs/' // TODO

export default {
    getMaterials(request) {
        return Api.get(`${routeUrl}`, request)
    },
}