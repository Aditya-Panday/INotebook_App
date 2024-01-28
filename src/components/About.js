import React from 'react'

export default function About() {

  return (
    
     <div className=' container main-b' >
          <div className="left-box ">
          <img src="/images/About-image.jpg" className="img-fluid  ab-img rounded-start" alt="..." />
          </div>
        
        
          <div className="right-box container">
            <h2 className="card-title logtxt" style={{fontFamily:"Rockwell", fontSize:"2.3rem"}}>About us</h2>
            <br/>
            <p className="card-text" style={{fontSize:"1.3rem"}}>This is a Inotebook Application. where you can add and manage you notes. you can use this application in daily usess.</p>
            <ul className='ab-ul'>
              <li className='ab-li'>You can login and fetch your Notes. </li>
              <li className='ab-li'>You can add and delete your notes.</li>
              <li className='ab-li'>Here you can create your account.</li>
              <li className='ab-li'>You can also edit your notes.</li>
              <li className='ab-li'>Your notes will be secure here.</li>
            </ul>
          </div>
      </div>
    

  )
}
