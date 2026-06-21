import { useState } from "react";
import joinApi from "../api/joinApi";
import { useNavigate } from "react-router-dom";
import Alert from "../../../components/Alert";
import Confirm from "../../../components/Confirm";

function JoinPage() {
    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userPassword2, setUserPassword2] = useState("");
    const [email, setEmail] = useState("");
    const [addr, setAddr] = useState("");

    const [checkUserId, setCheckUserId] = useState(false);

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmMessage, setconfirmMessage] = useState("");

    const [joinSuccess, setJoinSuccess] = useState(false);

    const addConfirm = () => {
        setconfirmMessage("회원가입하시겠습니까?");
        setConfirmOpen(true);
    }

    const navigate = useNavigate();
    
    const checkId = async () => {
        if(userId.trim()){
            const res = await joinApi.getIdCnt(userId);
            console.log(res.data);
            console.log(userId);
            if(res.data === 0) {
                setCheckUserId(true);
                setAlertMessage("가입할 수 있는 아이디입니다.");
                setAlertOpen(true);
            }else{
                setCheckUserId(false);
                setAlertMessage("이미 가입된 아이디가 존재합니다.");
                setAlertOpen(true);
                setUserId("");
            }
        }else{
            setAlertMessage("아이디를 입력하세요.");
            setAlertOpen(true);
            return;
        }
    }

    const handleAddMember = async () => {
        if(!userId.trim()) {
            setAlertMessage("아이디를 입력하세요.");
            setAlertOpen(true);
            return;
        }
        if(!userPassword.trim()) {
            setAlertMessage("비밀번호를 입력하세요.");
            setAlertOpen(true);
            return;
        }
        if(!userPassword2.trim()) {
            setAlertMessage("비밀번호 확인을 입력하세요.");
            setAlertOpen(true);
            return;
        }
        if(!email.trim()) {
            setAlertMessage("이메일을 입력하세요.");
            setAlertOpen(true);
            return;
        }
        if(!addr.trim()) {
            setAlertMessage("주소를 입력하세요.");
            setAlertOpen(true);
            return;
        }
        if(!checkUserId) {
            setAlertMessage("아이디 중복 확인을 해주세요.");
            setAlertOpen(true);
            return;
        }
        if(userPassword !== userPassword2) {
            setAlertMessage("비밀번호와 비밀번호 확인 값이 다릅니다.");
            setAlertOpen(true);
            return;
        }



        const member = {
            userId : userId
            , userPassword : userPassword
            , email : email
            , addr : addr
        }

        try{
            await joinApi.addMember(member);
            setAlertMessage("회원가입되었습니다.");
            setAlertOpen(true);
            setJoinSuccess(true);            
        }catch(error){
            console.log("회원가입 실패");
            console.error(error);
        }

    }

    return(
        <>
            {
                alertOpen && (
                    <Alert message={alertMessage}
                           onClose={() => {
                                setAlertOpen(false);
                                if(joinSuccess) navigate("/");
                           }}/>
                )
            }
            {
                confirmOpen && (
                    <Confirm message={confirmMessage}
                             onClose={(result) => {
                                setConfirmOpen(false);
                                if(!result) return;

                                handleAddMember();
                             }}
                    />
                )
            }
            <h1>회원가입</h1>
            <div>
                <label>아이디</label>
                <input type="text" name="userId" value={userId} onChange={(e) => {setUserId(e.target.value); setCheckUserId(false);}}/><button onClick={checkId}>중복확인</button><br/>
                <label>비밀번호</label>
                <input type="password" name="userPassword" onChange={(e) => {setUserPassword(e.target.value)}}/><br/>
                <label>비밀번호 확인</label>
                <input type="password" name="userPassword2" onChange={(e) => {setUserPassword2(e.target.value)}}/><br/>
                <label>이메일</label>
                <input type="text" name="email" onChange={(e) => {setEmail(e.target.value)}}/><br/>
                <label>주소</label>
                <input type="text" name="addr" onChange={(e) => {setAddr(e.target.value)}}/><br/>
            </div>
            <div>
                <button onClick={addConfirm}>가입</button>
            </div>
        </>
    )
}

export default JoinPage;