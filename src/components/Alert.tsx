import "../css/alert.css";

type alertProps = {
    message : string
    , onClose : () => void;
}

function Alert({message, onClose} : alertProps){
    return(
        <div className="alert-backdrop">
            <div className="alert-box">
                <p className="alert-message">{message}</p>
                <button className="alert-button" onClick={onClose}>확인</button>
            </div>
        </div>
    )
}

export default Alert;