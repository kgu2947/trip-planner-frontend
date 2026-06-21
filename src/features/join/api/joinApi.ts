import type { Join } from "../types/joinType";
import api from "../../../apis/api";

const joinApi = {
    async getIdCnt(userId : string) {
        const res = await api.get(`/getIdCnt/${userId}`);
        return res;
    },

    async addMember(member : Join) {
        return await api.post("/addMember", member);
    },
}

export default joinApi;