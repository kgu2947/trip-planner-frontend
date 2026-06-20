type alertProps = {
    message : string
    , onClose : () => void;
}

function Alert({message, onClose} : alertProps){
    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="w-80 rounded-xl bg-white p-6 shadow-xl">
                <p className="mb-4 text-center text-lg font-semibold">{message}</p>
                <button className="w-full rounded-lg bg-blue-500 py-2 text-white" onClick={onClose}>확인</button>
            </div>
        </div>
    )
}

export default Alert;