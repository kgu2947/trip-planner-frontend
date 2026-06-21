import type { Notice, NoticeReq } from "../types/noticeType";
import api from "../../../apis/api";

const noticeApi = {
    async getNotice(noticeReq : NoticeReq) {
        const res = await api.get("/getNotice", {
            params : noticeReq
        });
        return res;
    },

    async addNotice(notice : Notice) {
        return await api.post("/addNotice", notice);
    },

    async getDetailNotice(id : number) {
        const res = await api.get(`/getDetailNotice/${id}`);
        return res;
    },

    async updateNotice(notice : Notice) {
        return await api.put("/updateNotice", notice);
    },

    async deleteNotice(id : number) {
        return await api.delete(`/deleteNotice/${id}`);
    }
}



export default noticeApi;