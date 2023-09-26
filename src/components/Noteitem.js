import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext'

export default function Noteitem(props) {
    const style = {
        
        border: "1px solid darkgoldenrod",
        "box-shadow": "2px 2px 3px 1px darkgoldenrod",
      };
    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (
        <>
        <div className="col-md-4 col-lg-3 my-3" >
            <div className="card" style={style}>
                <div className="card-body">
                    <h5 className="card-title">{props.note.title}</h5>
                    <p className="card-text">{props.note.description}</p>
                    <h6 className="card-subtitle mb-2 text-muted">{props.note.tag}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">{new Date(props.note.date).toLocaleString("en-US",{weekday:"short", month:"short",day:"2-digit",year:"numeric", hour:"2-digit", minute:"2-digit"})}</h6>

                    <i className="fad fa-trash text-danger me-2" onClick={()=>{
                        deleteNote(props.note._id)
                    }}></i>
                    <i className="fal fa-edit text-success" onClick={()=>{
                        props.updatenote(props.note);
                    }}></i>
                </div>
            </div>    
        </div>
        </>

    )
}
