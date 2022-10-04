import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    // const s1={
    //     "name":"maha",
    //     "class":"5b"
    // }
    // const [state, setstate] = useState(s1);
    // const update=()=>{
    //     setTimeout(() => {
    //         setstate({
    //             "name":"kaha",
    //             "class":"taga"
    //         })
    //     }, 3000);
    // }
    const initialnote = []
    const [notes, setNotes] = useState(initialnote)

    //Get all notes
    const getnotes = async () => {
        //api call
        const response = await fetch(`${host}/api/notes/fetchnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('authToken')
            }
        });
        const json = await response.json();
        setNotes(json);
    }





    //Add a note
    const addNote = async (title, description, tag) => {
        //api call
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('authToken')
            },
            body: JSON.stringify({ title, description, tag })
        });

        const note= await response.json();
        setNotes(notes.concat(note));
        // setNotes(initialnote);
        // getnotes();
    }

    //Delete a note
    const deleteNote = async (id) => {
        //api call
        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('authToken')
            }
        });
        setNotes(initialnote);
        getnotes();
        // let newNotes= notes.filter((note)=>{return note._id!==id});
        // setNotes(newNotes);
    }

    //Edit a note
    const editNote = async (id, title, description, tag) => {
        //api call
        await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('authToken')
            },
            body: JSON.stringify({ title, description, tag })
        });

        
        let newNotes= notes;
        //editing
        for (let index = 0; index < notes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
                break;
            }

        }
        setNotes(newNotes);
        // getnotes();
    }


    return (
        // <NoteContext.Provider value={{state,update}}>
        <NoteContext.Provider value={{ notes, getnotes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
