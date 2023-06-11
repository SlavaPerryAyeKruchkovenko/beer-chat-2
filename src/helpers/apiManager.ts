import axios from "axios";
import {apiUrl} from "@Helpers/constants";
import User from "@Models/User";

class ApiManager {
    getAllUsers() {
        return axios.get(apiUrl + "api/user/users")
    }

    login(login: string, password: string) {
        return axios.post(apiUrl + "api/Auth/login", {
            Login: login,
            Password: password
        })
    }
    register(user:User,password: string){
        return axios.post(apiUrl + "api/Auth/reg", {
            Name : user.Name,
            Login: user.Login,
            Password: password
        })
    }
    getAllChats(userId:string){
        return axios.get(apiUrl + `api/User/${userId}/chat`)
    }
}

export default new ApiManager()