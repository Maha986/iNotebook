import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext'

export default function Noteitem(props) {
    
    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (
        <>
        <div className="col-md-3 my-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props.note.title}</h5>
                    <p className="card-text">{props.note.description}</p>
                    <h6 className="card-subtitle mb-2 text-muted">{props.note.tag}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">{props.note.date}</h6>

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
