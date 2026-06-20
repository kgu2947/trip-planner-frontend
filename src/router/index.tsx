import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import MainLayout from "../layouts/MainLayout";
import NotFoundPage from "../pages/NotFoundPage";
import NoticePage from "../pages/NoticePage";
import NoticeAddPage from "../pages/NoticeAddPage";
import NoticeDetailPage from "../pages/NoticeDetailPage";
import JoinPage from "../pages/JoinPage";

function AppRouter() {
    return (
        <Routes>
            {/* / 혹은 /login으로 접속 시 MainLayout를 공통으로 보여준다. */}
            <Route element={<MainLayout/>}>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/join" element={<JoinPage/>}/>
                <Route path="/notice/listPage" element={<NoticePage/>}/>
                <Route path="/notice/addPage" element={<NoticeAddPage/>}/>
                <Route path="/notice/detailPage/:id" element={<NoticeDetailPage/>}/>
                
                {/* *는 등록된 Route의 path외 다른 주소로 접속 시 */}
                <Route path="*" element={<NotFoundPage/>}/>
            </Route>
            
        </Routes>
    )
}

export default AppRouter;