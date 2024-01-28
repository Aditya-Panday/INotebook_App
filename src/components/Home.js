
import React from 'react'
import Notes from './Notes';


export default function Home(props) {
  const {showAlert} = props     //destructing kiya haii props mai se showAlert ko nikala hai
  return (
    <>
    
    <Notes showAlert={showAlert}/>

    </>
  )
}
