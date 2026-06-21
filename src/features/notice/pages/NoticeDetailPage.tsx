import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import noticeApi from "../api/noticeApi";
import Alert from "../../../components/Alert";
import Confirm from "../../../components/Confirm";
import "../css/NoticeForm.css";

function NoticeDetailPage() {
    const [no, setNo] = useState(0);
    const [title, setTitle] = useState("");
    const [writer, setWriter] = useState("");
    const [date, setDate] = useState("");

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmMessage, setconfirmMessage] = useState(""); 
    const [kindConfirm, setKindConfirm] = useState("");  

    const {id} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const loadPage = async() => {            
            try{
                const res = await noticeApi.getDetailNotice(Number(id!)); // id값이 무조건 존재
                setNo(res.data.no);
                setTitle(res.data.title);
                setWriter(res.data.writer);
                setDate(res.data.reg_date);
            }catch(error){
                setAlertMessage("조회에 실패하였습니다.");
                setAlertOpen(true);
            }            
        }

        loadPage();
    }, []);

    const updateConfirm = () => {
        setconfirmMessage("수정하시겠습니까?");
        setConfirmOpen(true);
        setKindConfirm("put");
    }

    const deleteConfirm = () => {
        setconfirmMessage("삭제하시겠습니까?");
        setConfirmOpen(true);
        setKindConfirm("del");
    }

    const handleUpdateNotice = async() => {
        const notice = {
            no : no
            , title : title
            , writer : writer
            , reg_date : date
        }        

        try{
            await noticeApi.updateNotice(notice);
            setAlertMessage("수정되었습니다.");
            setAlertOpen(true);
        }catch(error){
            setAlertMessage("수정에 실패하였습니다.");
            setAlertOpen(true);
        }
                
    }

    const handleDeleteNotice = async() => {
            try{
                await noticeApi.deleteNotice(Number(id!));
                setAlertMessage("삭제되었습니다.");
                setAlertOpen(true);
            }catch(error){
                setAlertMessage("삭제에 실패하였습니다.");
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

                                if(kindConfirm === "put"){
                                    handleUpdateNotice();
                                }else if(kindConfirm === "del"){
                                    handleDeleteNotice();
                                }                                
                             }}
                    />
                )
            }

            <div className="notice-container">
                <div className="notice-form-header">
                    <h1>공지사항 상세</h1>
                </div>
                
                <div className="notice-form-card">
                    <div className="form-row">
                        <label>번호</label>
                        <input type="text" name="no" placeholder="번호" readOnly value={no} onChange={(e) => setNo(Number(e.target.value))}/>
                    </div>

                    <div className="form-row">
                        <label>제목</label>
                        <input type="text" name="title" placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>

                    <div className="form-row">
                        <label>글쓴이</label>
                        <input type="text" name="writer" placeholder="글쓴이" value={writer} onChange={(e) => setWriter(e.target.value)}/>
                    </div>

                    <div className="form-row">
                        <label>등록일</label>
                        <input type="text" name="date" placeholder="등록일" value={date} onChange={(e) => setDate(e.target.value)}/>
                    </div>                    
                </div>

                <div className="form-actions">
                    <button className="submit-btn" onClick={updateConfirm}>수정</button>
                    <button className="delete-btn" onClick={deleteConfirm}>삭제</button>
                    <button className="cancel-btn" onClick={() => navigate("/notice/listPage")}>목록</button>
                </div>
            </div>            
        </>
    )
}

export default NoticeDetailPage;