import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/login/store/loginSlice";
import "../css/Header.css";

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
        <header className="header">
            <div className="header-inner">
                <h1 className="header-logo">Trip Planner</h1>

                <nav className="header-nav">
                    <Link to="/">Home</Link>
                    <Link to="/trips">Trips</Link>
                    <Link to="/notice/listPage">notice</Link>
                    {
                        loginYn?(
                            <>
                                <span className="welcome-text">환영합니다. {userId}</span>
                                <Link to="" className="logout-btn" onClick={handleLogout}>Logout</Link>
                            </>
                        )
                        :
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/Join" className="join-btn">Join</Link>
                        </>                        
                    }                    
                </nav>
            </div>
        </header>
    )
}

export default Header;