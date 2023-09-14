import axios from 'axios';

const headers = {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*"
};

const Api = {
  post(data, username) {
    return axios.post('http://37.75.248.232:8080/users/validate/'+username, data, {headers: headers});
  },
};

export default {
    authorization(request, username){
        return Api.post(request, username)
    }
}