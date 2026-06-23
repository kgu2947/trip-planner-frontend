import { useEffect, useState } from "react";
import noticeApi from "../api/noticeApi";
import { useNavigate } from "react-router-dom";
import Alert from "../../../components/Alert";
import Confirm from "../../../components/Confirm";
import "../css/NoticeForm.css";

function NoticeAddPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // <File | null> -> 파일이 있을 수도 없을 수도 있다.
    // 단일 파일
    // const [file, setFile] = useState<File | null>(null);

    // 다중 파일
    const [file, setFile] = useState<File[]>([]);

    const navigate = useNavigate();

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmMessage, setconfirmMessage] = useState("");

    const loginId = String(localStorage.getItem("userId"));

    useEffect(() => {
        console.log(file);
    }, [file])

    const fileArray = (e : React.ChangeEvent<HTMLInputElement>) => { // input의 onChange 이벤트 가져오기
        const files = e.target.files;

        if(!files) return;

        setFile(prev => {
            // 기존 파일 배열 가져와서 newFiles로 만들기
            const newFiles = Array.from(files);

            // file state의 가장 최신 값을 복사본으로 만들기
            let merged = [...prev];

            // newFiles 요소만큼 반복
            newFiles.forEach(nf => {
                // some -> 배열 내 값으로 조건문
                const isDuplicate = merged.some(
                    // newFiles 요소와 merged 요소의 이름과 크기 비교
                    pf => pf.name === nf.name && pf.size === nf.size
                );

                // 이름과 크기가 다르면 merged에 push
                if(!isDuplicate) merged = [...merged, nf];
            });

            return merged;
        })
    }

    const addConfirm = () => {
        setconfirmMessage("등록하시겠습니까?");
        setConfirmOpen(true);
    }

    const handleAddNotice = async() => {
        const formData = new FormData();

        formData.append("title", title);
        formData.append("content", content);
        formData.append("writer", loginId);
        file.forEach((f) => {
            // formData의 files에 배열로 하나씩 집어넣음
            formData.append("files", f);
        });

        try{
            await noticeApi.addNotice(formData);
            navigate("/notice/listPage");
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

                    <div className="form-row">
                        <label>첨부파일</label>

                        <div className="file-box">
                            {/* 단일 파일  */}
                            {/* <input type="file" name="file" onChange={(e) => setFile(e.target.files?.[0] || null)}/> */}
                            {/* 다중 파일 */}
                            {/* onChange={(e) => {fileArray(e)}} -> onChange={fileArray} 똑같다. */}
                            <input type="file" multiple name="file" onChange={(e) => {fileArray(e)}} />
                            
                            <div className="file-list">
                                {
                                    file.map((f, i) => (
                                        <div className="file-item" key={i}>
                                            {f.name}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>                                       
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
