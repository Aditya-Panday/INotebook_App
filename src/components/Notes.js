import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from "../context/notes/NoteContext"
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom'

export default function Notes(props) {
    let Navigate = useNavigate();
    const {showAlert} = props  
    const context = useContext(NoteContext);
    const { notes, getnotes, editNote } = context;
    useEffect(() => {
        // agar user login hai toh..
        if(localStorage.getItem('token')){
            getnotes()
        }
        else{
            Navigate('/login')
            props.showAlert(" First You Have to Login ","danger")
        }
        
        //  eslint-disable-next-line 
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "" });

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description })

    }

    // copy from addnote

    const submitNote = (e) => {
        props.showAlert(" Note Update Succesfully", 'success' )
        editNote(note.id, note.etitle, note.edescription)
        refClose.current.click();
    }

    // onchange ke liye banaya hain 
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value});  //note mai jo value usme jo dal rhe hai wo value ke barabar ho jayega.
    }

    return (
        <>
            <AddNote showAlert={showAlert}/>
            {/* modal trigger ke liye hum js ka code likhenge*/}
            <button ref={ref} type="button" className="btn btn-primary md" data-bs-toggle="modal" data-bs-target="#exampleModal">

            </button> 

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* form copy from addnote */}
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" name="etitle" value={note.etitle} id="etitle" onChange={onChange} minLength={5} required/>

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" name="edescription" value={note.edescription} id="edescription" onChange={onChange} minLength={5} required/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" onClick={submitNote} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes </h2>
                <div className="container mx-2"> 
                {notes.length===0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} showAlert={showAlert} updateNote={updateNote} note={note} />;
                })}
            </div>
        </>

    )
}
