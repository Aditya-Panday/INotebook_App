import React,{useContext, useState} from 'react'
import NoteContext from "../context/notes/NoteContext"


export default function AddNote(props) {
    const context = useContext(NoteContext);
    const {addNote } = context;

    const [note, setNote] = useState({title:"", description:""});
    // on submit krne pr note add ho jayga
    const submitNote = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description)
        setNote({title:"", description:""});
        props.showAlert("Note Added Successfully", "success")
    }

    // onchange ke liye banaya hain 
    const onChange = (e) => {
        setNote({...note,[e.target.name]: e.target.value});  //note mai jo value usme jo dal rhe hai wo value ke barabar ho jayega.

    }
    return (
        
            <div className='container log-c my-3'>

                <h2 className='logtxt mx-2 d-flex justify-content-center'>Add Notes </h2>
                <form className='mx-2 my-2'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" value={note.title} name="title" id="title" onChange={onChange} minLength={5} required />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" value={note.description} name="description" id="description" onChange={onChange} minLength={5} required/>
                    </div>
                    <button disabled={note.title.length<5 ||  note.description.length<5} type="submit" className="btn btn-primary " onClick={submitNote}>Add Note</button>
                </form>
            </div>
        
    )
}
