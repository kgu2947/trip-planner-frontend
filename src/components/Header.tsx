import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../stores/loginSlice";

function Header() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginYn = useSelector(
            (state : any) => state.loginState.token
        );
    const userId = localStorage.getItem("userId");

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/")
    }

    return (
        <header className="border-b border-gray-200 bg-white">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                <h1 className="text-xl font-bold">Trip Planner</h1>

                <nav className="flex gap-4 text-sm text-gray-600">
                    <Link to="/" className="hover:text-black">Home</Link>
                    <Link to="/trips" className="hover:text-black">Trips</Link>
                    <Link to="/notice/listPage" className="hover:text-black">notice</Link>
                    {
                        loginYn?(
                            <>
                                <span>환영합니다. {userId}</span>
                                <Link to="" className="hover:text-black" onClick={handleLogout}>Logout</Link>
                            </>
                        )
                        :
                        <>
                            <Link to="/login" className="hover:text-black">Login</Link>
                            <Link to="/Join" className="hover:text-black">Join</Link>
                        </>                        
                    }                    
                </nav>
            </div>
        </header>
    )
}

export default Header;