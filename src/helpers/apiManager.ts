import axios from "axios";
import {apiUrl} from "@Helpers/constants";
import User from "@Models/User";

class ApiManager {
    getAllUsers() {
        return axios.get(apiUrl + "api/user/users")
    }

    login(login: string, password: string) {
        return axios.post(apiUrl + "api/login", {
            Login: login,
            Password: password
        })
    }
    register(user:User,password: string){
        return axios.post(apiUrl + "api/reg", {
            Name : user.Name,
            Login: user.Login,
            Password: password
        })
    }
}

export default new ApiManager()