import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';
import alertContext from '../context/Alert/alertContext';

export default function AddNote(props) {
    const {btn,title,note,setNote} =props;
    const context = useContext(noteContext);
    const { addNote,editNote } = context;
    const a_Context = useContext(alertContext);
    const {showAlert} = a_Context;
    
    const handleClick = async (e)=>{
        e.preventDefault();
        await addNote(note.title, note.description, note.tag);
        setNote({title: "",description:"",tag:"Default"});
        showAlert("Your note has been successfully added","success");
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    const updateNote= async (e)=>{
        e.preventDefault();
        await editNote(note._id,note.title,note.description,note.tag);
        props.reference.current.style.display="none";
        showAlert("Your note has been successfully updated","success");
        setNote({title: "",description:"",tag:"Default"});
    }

    return (
        <div>
             <div className="container">
                <h1>{title}</h1>
                <form action="">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-Label">Title:</label>
                        <input type="text" value={note.title} className="form-control" id="title" name="title" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label" id="tag">Tag:</label>
                        <input type="text" value={note.tag} className="form-control" id="tag" name="tag" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label" id="description">Description:</label>
                        <textarea name="description" id="description" cols="30" rows="6"  value={note.description} className="form-control" onChange={onChange}></textarea>
                    </div>
                    {btn==="add"?<button disabled={note.title.length<5 || note.description.length<5} className="btn btn-warning mb-4" type="submit" onClick={handleClick}>Save Note</button>:<button disabled={note.title.length<5 || note.description.length<5} className="btn btn-warning mb-4" type="submit" onClick={updateNote}>Update Note</button>}
                    
                    
                </form>
            </div>
        </div>
    )
}
