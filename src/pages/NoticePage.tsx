import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import noticeApi from "../apis/noticeApi";
import type { Notice } from "../types/types";
import { useDispatch } from "react-redux";
import { addViewNotice } from "../stores/noticeSlice";
import Alert from "../components/Alert";

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
            const res = await noticeApi.getNotice({
        searchType : searchType
        , searchKeyword : searchKeyword
        , page : page
    });
            setList(res.data.noticeList);
            setNoticeCnt(Math.ceil(res.data.cnt/10)); // 소숫점을 올림해서 반환                        
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

    const handleSeachNotice = () => {
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
            <div>
                <h1>공지사항</h1>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>제목</th>
                            <th>글쓴이</th>
                            <th>등록일</th>
                        </tr>
                    </thead>
                    <tbody>                        
                            { list.length > 0 ? 
                                list.map((notice) => {
                                    return(                                        
                                        <tr key={notice.no} onClick={() => viewAddNotice(notice)}>
                                            <td>{notice.no}</td>
                                            <td>{notice.title}</td>
                                            <td>{notice.writer}</td>
                                            <td>{notice.reg_date}</td>
                                        </tr>                                        
                                    )
                                })
                                :
                                (
                                    <tr>
                                        <td colSpan={4}> 등록된 공지사항이 없습니다.</td>
                                    </tr>
                                )
                            }                    
                    </tbody>
                </table>
            </div>
            <div>
                {
                    prevPage && (<button onClick={() => setPage(startPage)}>이전</button>)
                }
                
                {
                    visiblePaging.map((pageNo) => {
                        return (
                            <button key={pageNo} onClick={() => setPage(pageNo)}>{pageNo}</button>
                        )
                    })
                }

                {
                    nextPage && (<button onClick={() => setPage(endPage + 1)}>다음</button>)
                }                
            </div>
            <div>
                <label>검색어</label>
                <select onChange={(e) => setSearchType(e.target.value)}>
                    <option value="searchTitle">제목</option>
                    <option value="searchWriter">작성자</option>
                </select>
                <input type="text" name="searchNotice" placeholder="검색어를 입력하세요." onChange={(e) => setSearchKeyword(e.target.value)} />
                <button onClick={handleSeachNotice}>검색</button>
            </div>
            <div>
                <Link to="/notice/addPage">등록</Link>
            </div>
        </>
    )
}

export default NoticePage;