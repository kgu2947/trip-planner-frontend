import "../css/confirm.css";

type confirmProps = {
    message : string
    , onClose : (result : boolean) => void;
}

function Confirm({message, onClose} : confirmProps){
    return(
        <div className="confirm-backdrop">
            <div className="confirm-box">
                <p className="confirm-message">{message}</p>
                <button className="confirm-btn confirm-ok" onClick={() => onClose(true)}>확인</button>
                <button className="confirm-btn confirm-cancel" onClick={() => onClose(false)}>취소</button>
            </div>
        </div>
    )
}

export default Confirm;