import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import noticeApi from "../api/noticeApi";
import Alert from "../../../components/Alert";
import Confirm from "../../../components/Confirm";
import "../css/NoticeForm.css";
import type { file } from "../../../types/types";
import fileApi from "../../../apis/fileApi";

function NoticeDetailPage() {
    const [no, setNo] = useState(0);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [writer, setWriter] = useState("");
    const [date, setDate] = useState("");

    const [fileList, setFileList] = useState<file[]>([]);
    const [fileCnt, setFileCnt] = useState(0);

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmMessage, setconfirmMessage] = useState(""); 
    const [kindConfirm, setKindConfirm] = useState("");

    const [isLoadSuccess, setIsLoadSuccess] = useState(true);

    const {id} = useParams();

    const navigate = useNavigate();

    const checkLogin = localStorage.getItem("userId");

    useEffect(() => {
        const loadPage = async() => {            
            try{
                const res = await noticeApi.getDetailNotice(Number(id!)); // id값이 무조건 존재
                setNo(res.data.no);
                setTitle(res.data.title);
                setContent(res.data.content);
                setWriter(res.data.writer);
                setDate(res.data.reg_date);

                setFileCnt(res.data.fileCnt);
                setFileList(res.data.fileList);
            }catch(error){
                setAlertMessage("조회에 실패하였습니다.");
                setAlertOpen(true);
                setIsLoadSuccess(false);
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
            , content : content
        }        

        try{
            await noticeApi.updateNotice(notice);
            navigate("/notice/listPage");
        }catch(error){
            setAlertMessage("수정에 실패하였습니다.");
            setAlertOpen(true);
        }
                
    }

    const handleDeleteNotice = async() => {
            try{
                await noticeApi.deleteNotice(Number(id!));
                navigate("/notice/listPage");
            }catch(error){
                setAlertMessage("삭제에 실패하였습니다.");
                setAlertOpen(true);
            }
        
    }

    const download = async(no : number, fileName : string) => {
        const res = await fileApi.fileDownload(no);

        

        // 파일에 접근할 수 있는 임시 url 생성
        const url = window.URL.createObjectURL(res.data);

        console.log(url);

        // a태그 만들어서 클릭하여 파일 다운로드 시작
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();

        // 파일 다운로드 임시 url 제거(메모리 정리)
        window.URL.revokeObjectURL(url);
    }

    return(
        <>
            {
                alertOpen && (
                    <Alert message={alertMessage}
                           onClose={() => {
                                setAlertOpen(false);
                                
                                if(!isLoadSuccess){
                                    navigate("/notice/listPage");
                                }
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
                        <label>제목</label>
                        <input type="text" name="title" placeholder="제목을 입력하세요." value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className="form-row">
                        <label>내용</label>
                        <textarea name="content" placeholder="내용을 입력하세요." value={content} onChange={(e) => setContent(e.target.value)}/>
                    </div>

                    <div className="form-row">
                        <label>글쓴이</label>
                        <input type="text" name="writer" readOnly value={writer}/>
                    </div>

                    <div className="form-row">
                        <label>등록일</label>
                        <input type="text" name="date" readOnly value={date}/>
                    </div>

                    <div className="form-row">
                        <label>첨부파일</label>

                        <div className="file-box">
                            {
                                fileCnt > 0 ? (
                                    <div className="file-list">
                                        {
                                            fileList.map((f, i) => (
                                                <div key={i} className="file-item download-item" onClick={() => download(f.file_no, f.originName)}>
                                                    {f.originName}
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                                :
                                (
                                    <div className="empty-file">
                                        첨부파일이 없습니다.
                                    </div>
                                )
                            }
                        </div>
                    </div>                                     
                </div>

                <div className="form-actions">
                    {
                        checkLogin === writer ? (
                            <>
                                <button className="submit-btn" onClick={updateConfirm}>수정</button>
                                <button className="delete-btn" onClick={deleteConfirm}>삭제</button>
                            </>
                        )
                        :
                        null
                    }
                    
                    <button className="cancel-btn" onClick={() => navigate("/notice/listPage")}>목록</button>
                </div>
            </div>            
        </>
    )
}

export default NoticeDetailPage;