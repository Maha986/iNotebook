import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react/cjs/react.development';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';

export default function Notes() {
    const context = useContext(noteContext);
    const navigate = useNavigate();
    const { notes,getnotes } = context;
    useEffect(() => {
        if(localStorage.getItem('authToken'))
        {
            getnotes();
        }
        else
        {
            navigate("/");
        }
    },[])

    const style = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        zIndex: 1,
        transform: 'translate(-50%, -50%)',
        width: "60%",
        background: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        display:"none",
        overflowY: "auto"
      };

      //jis bhe element ko target krna ho vahan use krte hain hain, it works as getElementById
      const ref= useRef(null);
      const [note, setNote] = useState({title: "",description:"",tag:"General"})
      const updatenote=(note)=>{
        ref.current.style.display="block";
        setNote(note);
      }
    return (
        <>
            <AddNote btn="add" note={note} setNote={setNote} title="Add a note"/>
            <div ref={ref} style={style}>
            <AddNote reference={ref} note={note} setNote={setNote} btn="update" title="Update a note"/>
            </div>
            <div className="row my-3">

                <h1>Your Notes</h1>
                {/* if no else part is present then instead of ? we use && */}
                <div className="container">    
                {notes.length===0 && "No notes to display"}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updatenote={updatenote} note={note} />;
                })}

            </div>
        </>
    )
}
