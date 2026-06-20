import { createSlice } from "@reduxjs/toolkit";

// 전역 변수 관리 함수
const counterSlice = createSlice({
    //slice 이름
    name : "counter",

    // 초기값
    initialState : {
        count : 0,
    },

    // 변수 변경 함수
    reducers : {
        // 해당 slice 호출 시 state 값을 받아서 함수 실행
        increase : (state) => {
            state.count += 1;
        },

        decrease : (state) => {
            state.count -= 1;
        },
    }
});

export const {increase, decrease} = counterSlice.actions;

export default counterSlice.reducer;