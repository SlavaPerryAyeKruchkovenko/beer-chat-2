import axios from "axios";
import {apiUrl} from "@Helpers/constants";
import User from "@Models/User";

class ApiManager {
    getAllUsers(token:string) {
        return axios.get(apiUrl + "api/User/users",this.getConfig(token))
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
    getAllChats(userId:string,token:string){
        return axios.get(apiUrl + `api/User/${userId}/chats`,this.getConfig(token))
    }
    getConfig(token:string) {
        return {
            headers: {
                Authorization: "Bearer " + token,
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
            }
        }
    }
}

export default new ApiManager()