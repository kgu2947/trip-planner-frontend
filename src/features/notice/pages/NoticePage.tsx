import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import noticeApi from "../api/noticeApi";
import type { Notice } from "../types/noticeType";
import { useDispatch } from "react-redux";
import { addViewNotice } from "../store/noticeSlice";
import Alert from "../../../components/Alert";
import "../css/NoticePage.css";

function NoticePage() {

    const [list, setList] = useState<Notice[]>([]);
    const [noticeCnt, setNoticeCnt] = useState(1);
    const [page, setPage] = useState(1);

    const [searchType, setSearchType] = useState("searchTitle");
    const [searchKeyword, setSearchKeyword] = useState("");

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loadPage = async(page : number) => {
        try{
            const res = await noticeApi.getNotice({searchType : searchType
                                                   , searchKeyword : searchKeyword
                                                   , page : page
        });
            setList(res.data.noticeList);
            setNoticeCnt(Math.ceil(res.data.cnt/10)); // 소숫점을 올림해서 반환     
        }catch(error){
            setAlertMessage("공지사항 조회에 실패했습니다.");
            setAlertOpen(true);
        }                               
    }

    const paging = new Array(noticeCnt).fill(0).map((_, i) => i + 1);
    const currentGroup = Math.floor((page - 1) / 10); // 소수점 버림

    const startPage = currentGroup * 10;
    const endPage = startPage + 10;

    const visiblePaging = paging.slice(startPage, endPage);

    const prevPage = startPage > 0;
    const nextPage = endPage < paging.length;

    useEffect(() => {             
        loadPage(page);
    }, [page]);    

    const handleSearchNotice = () => {
        if(page === 1) {
            loadPage(1);
        }else{
            setPage(1);
        }        
    }

    const viewAddNotice = (notice : Notice) => {
        dispatch(addViewNotice(notice));
        navigate(`/notice/detailPage/${notice.no}`);
    }

    return(
        <>
            {
                alertOpen && (
                    <Alert message={alertMessage}
                           onClose={() => {
                                setAlertOpen(false);
                                return;
                           }}/>
                )
            }
            <div className="notice-container">
                <div className="notice-header">
                    <h1>공지사항</h1>
                    <Link className="write-btn" to="/notice/addPage">등록</Link>
                </div>

                <div className="search-box">
                    <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                        <option value="searchTitle">제목</option>
                        <option value="searchWriter">작성자</option>
                    </select>
                    <input type="text" name="searchNotice" value={searchKeyword} placeholder="검색어를 입력하세요." onChange={(e) => setSearchKeyword(e.target.value)} />
                    <button onClick={handleSearchNotice}>검색</button>
                </div>

                <div className="table-wrapper">
                    <table className="notice-table">
                        <thead>
                            <tr>
                                <th className="col-no">No</th>
                                <th className="col-title">제목</th>
                                <th className="col-writer">글쓴이</th>
                                <th className="col-date">등록일</th>
                            </tr>
                        </thead>
                        <tbody>                        
                                { list.length > 0 ? 
                                    list.map((notice) => {
                                        return(                                        
                                            <tr className="notice-row" key={notice.no} onClick={() => viewAddNotice(notice)}>
                                                <td>{notice.no}</td>
                                                <td className="title-cell">{notice.title}</td>
                                                <td>{notice.writer}</td>
                                                <td>{notice.reg_date}</td>
                                            </tr>                                        
                                        )
                                    })
                                    :
                                    (
                                        <tr>
                                            <td colSpan={4} className="empty-row"> 등록된 공지사항이 없습니다.</td>
                                        </tr>
                                    )
                                }                    
                        </tbody>
                    </table>
                </div> 

                <div className="pagination">
                    {
                        prevPage && (<button onClick={() => setPage(startPage)}>이전</button>)
                    }
                    
                    {
                        visiblePaging.map((pageNo) => {
                            return (
                                <button className={page === pageNo ? "active" : ""} key={pageNo} onClick={() => setPage(pageNo)}>{pageNo}</button>
                            )
                        })
                    }

                    {
                        nextPage && (<button onClick={() => setPage(endPage + 1)}>다음</button>)
                    }                
                </div>
            </div>            
        </>
    )
}

export default NoticePage;