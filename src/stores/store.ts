import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login/store/loginSlice";
import noticeReducer from "../features/notice/store/noticeSlice";

export const store = configureStore({
    reducer : {
        loginState : loginReducer,
        viewNotice : noticeReducer,
    }
})