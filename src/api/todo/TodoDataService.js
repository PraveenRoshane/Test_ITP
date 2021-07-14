import axios from "axios"
import { API_URL, JPA_API_URL } from '../../Constants';

class TodoDataService {

    RerieveAllTodo(name){
        // return axios.get(`${API_URL}/users/${name}/todos`);
        return axios.get(`${JPA_API_URL}/users/${name}/todos`);
    }

    RerieveTodo(name, id){
        // return axios.get(`${API_URL}/users/${name}/todos/${id}`);
        return axios.get(`${JPA_API_URL }/users/${name}/todos/${id}`);
    }

    deleteTodo(name, id){
        return axios.delete(`${JPA_API_URL}/users/${name}/todos/${id}`);
    }

    updateTodo(name, id, todo){
        return axios.put(`${JPA_API_URL}/users/${name}/todos/${id}`, todo);
    }

    addTodo(name, todo){
        return axios.post(`${JPA_API_URL}/users/${name}/todos/`, todo);
    }

}

export default new TodoDataService()
