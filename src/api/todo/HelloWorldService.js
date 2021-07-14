import axios from "axios"

class HelloWorldService {

    executeHelloWorldService() {
        return axios.get('http://localhost:8080/hello')
    }

    executeHelloWorldBeanService() {
        return axios.get('http://localhost:8080/hello-bean')
    }

    executeHelloWorldPathVariableService(name) {
        // let username = 'user'
        // let password = 'password'

        // let basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password);

        return axios.get(`http://localhost:8080/hello-bean/path-variable/${name}`
        // ,
        //     {
        //         headers: {
        //             Authorization: basicAuthHeader
        //         }
        //     }
        )

    }

}

export default new HelloWorldService()
