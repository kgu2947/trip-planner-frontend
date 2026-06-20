import axios from "axios"
import type { Join } from "../types/types";
import api from "./api";

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