import { useState } from "react";
import noticeApi from "../api/noticeApi";
import { useNavigate } from "react-router-dom";
import Alert from "../../../components/Alert";
import Confirm from "../../../components/Confirm";
import "../css/NoticeForm.css";

function NoticeAddPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmMessage, setconfirmMessage] = useState("");

    const loginId = String(localStorage.getItem("userId"));

    const addConfirm = () => {
        setconfirmMessage("등록하시겠습니까?");
        setConfirmOpen(true);
    }

    const handleAddNotice = async() => {
        const notice = {
            title : title
            , content : content
            , writer : loginId
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
            <div className="notice-container">
                <div className="notice-form-header">
                    <h1>공지사항 등록</h1>
                </div>
                
                <div className="notice-form-card">
                    <div className="form-row">
                        <label>제목</label>
                        <input type="text" name="title" placeholder="제목을 입력하세요." onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className="form-row">
                        <label>내용</label>
                        <textarea name="content" placeholder="내용을 입력하세요." onChange={(e) => setContent(e.target.value)}/>
                    </div>                                      
                </div>

                <div className="form-actions">
                    <button className="submit-btn" onClick={addConfirm}>등록</button>
                    <button className="cancel-btn" onClick={() => navigate("/notice/listPage")}>목록</button>
                </div>
            </div>            
        </>
    )
}

export default NoticeAddPage;
