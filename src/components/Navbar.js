import React, { useEffect, useCallback } from 'react'
// import React, { useState, ,  } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";


export default function Navbar(props) {
    let location = useLocation();
    let Navigate = useNavigate();

    

    const handleLogout = useCallback(() => {
        localStorage.removeItem('token');
        Navigate('/login');
        props.showAlert('Logout Successfully', 'success');
    }, [Navigate, props]);

    useEffect(() => {
        let autoLogoutTimer;

        const handleAutoLogout = () => {
            handleLogout();
        };

        if (localStorage.getItem('token')) {
            // Set up a timeout for automatic logout after 30 seconds
            autoLogoutTimer = setTimeout(handleAutoLogout, 15*60*1000); // 30 seconds in milliseconds
        }

        // Cleanup: Clear the timeout when the component unmounts or when the user logs out manually
        return () => {
            clearTimeout(autoLogoutTimer);
        };
    }, [handleLogout]);


    //   const handleLogout = () => {
    //     localStorage.removeItem('token');
    //     Navigate("/login");
    //     props.showAlert("Logout Successfully","success");
    //     handleAutoLogout();
    // }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                <div className="container-fluid">
                    <Link className="navbar-brand text-light" to="/" ><span className='logo-text' >INotebook</span></Link>
                    {/* <img src='/images/logonav1.png' className='logonav' alt=''></img> */}

                    <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon "></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link  ${location.pathname === "/" ? "active" : ""}`} style={{ fontFamily: "cursive" }} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link  ${location.pathname === "/about" ? "active" : ""}`} style={{ fontFamily: "cursive" }} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ? <form className="d-flex" >
                            <Link className="btn  mx-1 l1" to="/login" role="button"><img src='/images/login1.png' className='li' alt='lo'></img> Login</Link>
                            <Link className="btn  mx-1 l1" to="/signup" role="button"><img src='/images/signup1.png ' className='li' alt='lo'></img>Signup</Link>
                        </form> : <button onClick={handleLogout} className="btn mx-1 l1" ><img src='/images/logout1.png' className='li' alt='lo'></img>Logout</button>}

                    </div>
                </div>
            </nav>
        </>
    )
}
