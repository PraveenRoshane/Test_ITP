import axios from 'axios';
import { API_URL } from '../../Constants';

export const USER_NAME_SESSOIN_ATTRIBUTE_NAME = 'authenticationUser' 

class Authentication {

    executeBasicAuthenticationService(username, password){
        return axios.get(`${API_URL}/basicauth`,{headers: {Authorization: this.createBasicAuthToken(username, password)}})
    }

    executeJwtAuthenticationService(username, password){
        return axios.post(`${API_URL}/authenticate`,{username, password})
    }

    createBasicAuthToken(username, password){
        return 'Basic ' + window.btoa(username + ':' + password)        
    }

    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem(USER_NAME_SESSOIN_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem(USER_NAME_SESSOIN_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createJwtToken(token))
    }

    createJwtToken(token){
        return 'Bearer ' + token        
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSOIN_ATTRIBUTE_NAME)
    }

    isUserLoggedin() {
        let user = sessionStorage.getItem(USER_NAME_SESSOIN_ATTRIBUTE_NAME)
        if (user === null) {
            return false
        } else {
            return true
        }
    }

    getUserLoggedin() {
        let user = sessionStorage.getItem(USER_NAME_SESSOIN_ATTRIBUTE_NAME)
        if (user === null) {
            return ''
        } else {
            return user
        }
    }

    setupAxiosInterceptors(token) {

        axios.interceptors.request.use(

            (config) => {
                if (this.isUserLoggedin()) {
                    config.headers.Authorization = token
                }
                return config
            }

        )
    }

}

export default new Authentication();