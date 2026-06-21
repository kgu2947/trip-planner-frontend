import axios from "axios";
import type { login } from "../types/loginType";
import api from "../../../apis/api";

const loginApi = {
    async tryLogin(login : login) {
        const res = await api.post(`/tryLogin`, login);
        return res;
    },
    
    async getUserId() {
        const res = await api.get("/getUserId");
        return res;
    }
}

export default loginApi;