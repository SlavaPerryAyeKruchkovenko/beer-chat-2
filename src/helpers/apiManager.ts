import axios from "axios";
import {apiUrl} from "@Helpers/constants";
import User from "@Models/User";
import Message from "@Models/Message";
import Chat from "@Models/Chat";

class ApiManager {
    getAllUsers(token: string) {
        return axios.get(apiUrl + "api/User/users", this.getConfig(token))
    }

    login(login: string, password: string) {
        return axios.post(apiUrl + "api/Auth/login", {
            login: login,
            password: password
        }, this.getDefaultConfig())
    }

    register(user: User, password: string) {
        return axios.post(apiUrl + "api/Auth/reg", {
            name: user.name,
            login: user.login,
            password: password
        }, this.getDefaultConfig())
    }

    sendMessage(token: string, message: Message) {
        console.log(message.text, message.userId, message.chatroomId)
        return axios.post(apiUrl + "api/Message", {
            text: message.text,
            userId: message.userId,
            chatId: message.chatroomId
        }, this.getConfig(token))
    }

    createChat(token: string, title: string, users: User[]) {
        return axios.post(apiUrl + `api/Chat/`, {
            title: title,
            users: users.map(x => x.id)
        }, this.getConfig(token))
    }

    getAllChatMessage(token: string, chatId: string) {
        return axios.get(apiUrl + `api/Chat/${chatId}/messages`, this.getConfig(token))
    }

    getAllChats(userId: string, token: string) {
        return axios.get(apiUrl + `api/User/${userId}/chats`, this.getConfig(token))
    }
    logout(token:string){
        return axios.post(apiUrl + `api/Auth/logout`, token, this.getConfig(token))
    }
    getConfig(token: string) {
        return {
            headers: {
                Authorization: "Bearer " + token,
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
            }
        }
    }

    getDefaultConfig() {
        return {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
            }
        }
    }
}

export default new ApiManager()