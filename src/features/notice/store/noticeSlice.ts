import { createSlice } from "@reduxjs/toolkit";
import type { Notice } from "../types/noticeType";

const noticeSlice = createSlice({
    name : "notice",

    initialState : {
        list : [] as Notice[]
    },

    reducers : {
        addViewNotice : (state, action) => {
            //some(함수) -> 해당되는 값이 있는지 true false 리턴
            const exists = state.list.some((notice) => {
                return notice.no === action.payload.no
            });

            if(exists) return;

            state.list.unshift(action.payload);

            if(state.list.length > 5) state.list.pop();
        }
    }
});

export const {addViewNotice} = noticeSlice.actions;
export default noticeSlice.reducer;