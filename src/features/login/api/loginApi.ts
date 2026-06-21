import type { login } from "../types/loginType";
import api from "../../../apis/api";

const loginApi = {
    async tryLogin(login : login) {
        const res = await api.post(`/tryLogin`, login);
        return res;
    },
}

export default loginApi;