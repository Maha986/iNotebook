import { useState } from "react";
import AlertContext from "./alertContext";

function AlertState(props) {

    const [alert, setAlert] = useState(null)
    const showAlert = (message, type) => {
        setAlert({
            message: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 3500);
    }
    
    return (
        // <NoteContext.Provider value={{state,update}}>
        <AlertContext.Provider value={{ alert, showAlert }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState