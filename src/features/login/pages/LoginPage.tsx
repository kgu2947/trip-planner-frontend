import { useEffect, useState } from "react";
import loginApi from "../api/loginApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/loginSlice";
import Alert from "../../../components/Alert";

function LoginPage() {
    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const [loginState, setLoginState] = useState(false);

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.clear();
    }, [])

    const handleLogin = async () => {
        if(!userId.trim()) {
            console.log("아이디를 입력하세요.");
            return;
        }
        if(!userPassword.trim()) {
            console.log("비밀번호를 입력하세요.");
            return;
        }

        const loginInfo = {
            userId : userId
            , userPassword : userPassword
        }

        try{
            const res = await loginApi.tryLogin(loginInfo);

            if(!res.data) {                
                setAlertMessage("로그인 정보가 올바르지 않습니다.");
                setAlertOpen(true);
                setLoginState(false);
                return;
            }else{
                setAlertMessage("로그인되었습니다.");
                setAlertOpen(true);
                setLoginState(true);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userId", res.data.userId);

                dispatch(login(res.data.token));
            }
        }catch(error){
            setAlertMessage("로그인 실패");
                setAlertOpen(true);
                setLoginState(false);
                return;
        }

    }

    return (
        <>
            {
                alertOpen && (
                    <Alert message={alertMessage}
                           onClose={() => {
                                setAlertOpen(false);
                                if(loginState) navigate("/");
                           }}/>
                )
            }
            <div>
                <label>아이디</label>
                <input type="text" name="userId" onChange={(e) => {setUserId(e.target.value)}}/><br/>
                <label>비밀번호</label>
                <input type="password" name="userPassword" onChange={(e) => {setUserPassword(e.target.value)}}/><br/>
            </div>
            <div>
                <button onClick={handleLogin}>로그인</button>
            </div>
        </>
    )
}

export default LoginPage;