import type { NoticeReq, putNotice } from "../types/noticeType";
import api from "../../../apis/api";

const noticeApi = {
    async getNotice(noticeReq : NoticeReq) {
        const res = await api.get("/notice", {
            params : noticeReq
        });
        return res;
    },

    // FormData 타입으로 받음
    async addNotice(notice : FormData) {
        return await api.post("/notice", notice, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },

    async getDetailNotice(id : number) {
        const res = await api.get(`/notice/${id}`);
        return res;
    },

    async updateNotice(notice : putNotice) {
        return await api.put("/notice", notice);
    },

    async deleteNotice(id : number) {
        return await api.delete(`/notice/${id}`);
    }
}


export default noticeApi;