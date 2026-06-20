import { createSlice } from "@reduxjs/toolkit";

// 전역 변수 관리 함수
const loginSlice = createSlice({
    //slice 이름
    name : "loginState",

    // 초기값
    initialState : {
        token : null,
    },

    // 변수 변경 함수
    reducers : {
        login : (state, action) => {
            state.token = action.payload; //dispatch(login(token))로 받은 토큰값
        },
        
        logout : (state) => {
            state.token = null;
        }
    }
});

export const {login, logout} = loginSlice.actions;

export default loginSlice.reducer;