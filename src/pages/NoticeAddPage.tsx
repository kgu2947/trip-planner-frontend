import { useState } from "react";
import noticeApi from "../apis/noticeApi";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import Confirm from "../components/Confirm";

function NoticeAddPage() {
    const [no, setNo] = useState(0);
    const [title, setTitle] = useState("");
    const [writer, setWriter] = useState("");
    const [date, setDate] = useState("");

    const navigate = useNavigate();

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmMessage, setconfirmMessage] = useState("");

    const addConfirm = () => {
        setconfirmMessage("등록하시겠습니까?");
        setConfirmOpen(true);
    }

    const handleAddNotice = async() => {
        const notice = {
            no : no
            , title : title
            , writer : writer
            , reg_date : date
        }

            try{
                await noticeApi.addNotice(notice);
                setAlertMessage("등록되었습니다.");
                setAlertOpen(true);
            }catch(error){
                setAlertMessage("등록에 실패하였습니다.");
                setAlertOpen(true);
            }   

    }
    return(
        <>
            {
                alertOpen && (
                    <Alert message={alertMessage}
                           onClose={() => {
                                setAlertOpen(false);
                                navigate("/notice/listPage");
                           }}/>
                )
            }
            {
                confirmOpen && (
                    <Confirm message={confirmMessage}
                             onClose={(result) => {
                                setConfirmOpen(false);
                                if(!result) return;

                                handleAddNotice();
                             }}
                    />
                )
            }
            <div>
                <label>번호</label>
                <input type="text" name="no" placeholder="번호" onChange={(e) => setNo(Number(e.target.value))}/><br/>
                <label>제목</label>
                <input type="text" name="title" placeholder="제목" onChange={(e) => setTitle(e.target.value)}/><br/>
                <label>글쓴이</label>
                <input type="text" name="writer" placeholder="글쓴이" onChange={(e) => setWriter(e.target.value)}/><br/>
                <label>등록일</label>
                <input type="text" name="date" placeholder="등록일" onChange={(e) => setDate(e.target.value)}/>
            </div>
            <div>
                <button onClick={addConfirm}>등록</button>
                <button onClick={() => navigate("/notice/listPage")}>취소</button>
            </div>
        </>
    )
}

export default NoticeAddPage;
