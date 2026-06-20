import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import loginReducer from "./loginSlice";
import noticeReducer from "./noticeSlice";

export const store = configureStore({
    reducer : {
        counter : counterReducer,
        loginState : loginReducer,
        viewNotice : noticeReducer,
    }
})