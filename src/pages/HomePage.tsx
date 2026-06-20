import { useSelector } from "react-redux";
import type { Notice } from "../types/types";

function HomePage() {
    const list = useSelector(
        (state : any) => state.viewNotice.list
    );
    
    const token = useSelector(
        (state : any) => state.loginState.token
    );

    return (
        <div>
            {
                token ? (
                    <>
                        <h1>최근 본 게시글</h1>
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
                                {
                                    list.length > 0 ? 
                                        list.map((notice : Notice) => {
                                            return(
                                                <tr key={notice.no}>
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
                                            <td colSpan={4}> 최근 본 게시글이 없습니다.</td>
                                        </tr>
                                    )
                                }                    
                            </tbody>
                        </table>
                    </>
                )
                :
                (
                    <div>Home Page</div>
                )
            }            
        </div>
    )
}

export default HomePage;