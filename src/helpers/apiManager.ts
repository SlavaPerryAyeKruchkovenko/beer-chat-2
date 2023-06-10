import axios from "axios";
import {apiUrl} from "@Helpers/constants";

class ApiManager{
    getAllUsers(){
        return axios.get(apiUrl+"api/user/users")
    }
}
export default new ApiManager()