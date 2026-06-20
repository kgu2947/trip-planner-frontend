import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function MainLayout() {
    return (
        <div>
            <Header/>                

            <main className="min-h-screen bg-gray-50">
                <div className="mx-auto max-w-5xl px-6 py-8">
                    {/* 앞의 Route에 맞춰 보여줌 */}
                <Outlet/>
                </div>                
            </main>
        </div>
    )
}

export default MainLayout;