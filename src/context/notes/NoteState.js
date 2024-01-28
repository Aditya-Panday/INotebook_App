import React, { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  //  Get all notes
  const getnotes = async () => {
    // Api call   --you can get code on fetch with headers website
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      }
    });

    const json = await response.json();
    setNotes(json)

  }

  //  Add a note
  const addNote = async (title, description, tag) => {
    // Api call   --you can get code on fetch with headers website
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      },
      body: JSON.stringify({ title, description })

    });

    const note = await response.json();
    setNotes(notes.concat(note));
    console.log("Note Added Successfully")

  }

  // Delete a note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = response.json();
    console.log(json)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }


  // Edit a note
  const editNote = async (id, title, description) => {

    // Api call   --you can get code on fetch with headers website
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      },
      body: JSON.stringify({ title, description }),
    });
    const json = await response.json();
    console.log(json)
    let newNotes = JSON.parse(JSON.stringify(notes))

    // logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        break;
      }
    }
    setNotes(newNotes);
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getnotes, }} >
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;