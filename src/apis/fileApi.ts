import api from "./api";

const fileApi = {
    async fileDownload(no : number) {
        const res = await api.get(`/file/download/${no}`, {
            // 파일 데이터 응답 받기
            responseType : "blob"
        });
        return res;
    },

}

export default fileApi;