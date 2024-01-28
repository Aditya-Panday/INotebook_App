import React,{useContext} from 'react'
import NoteContext from "../context/notes/NoteContext" 

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const {deleteNote} = context; // delete note function jo humne notestate mai banaya hai usko yaha call kiya hai 
  const { note, updateNote } = props;
  return (
    <div className='col-md-3 my-2'>
      <div className="card noteitem" >
          <div className="card-body">
            <h5 className="card-title tit">{note.title}</h5>
            <p className="card-text des">{note.description}</p>
            <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id); props.showAlert(' Note Delete Succesfully','success');}} title='Delete Note'/>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}} title='Edit Note'></i>
          </div>
      </div>

    </div>
  )
}
export default NoteItem
