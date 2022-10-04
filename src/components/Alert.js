import React,{useContext} from 'react'
import alertContext from '../context/Alert/alertContext';

export default function Alert() {
    const context= useContext(alertContext);
    const {alert} = context;
    alert&&console.log(alert.type,alert.message)
    const capitilize = (word)=>{
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div>
            
            {alert && <div style={{position:"fixed", top:0, width:"100%"}} className={`alert alert-${alert.type} alert-dismissible fade show`}  role="alert">
                <strong>{capitilize(alert.type)}</strong>: {alert.message}
            </div>}
        </div>
    )
}
