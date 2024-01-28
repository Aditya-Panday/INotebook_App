import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Signup(props) {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let Navigate = useNavigate();
    const [visible, setVisible] = useState(false)
    // password visible
    const handleToggle = () => {
        setVisible(!visible)

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = credentials;

        // Check if passwords match
        if (password !== cpassword) {
            alert("Passwords Should Be Same");
            return;
        }

        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json()
        // console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            Navigate("/");
            // console.log("signup successfully")
            props.showAlert(" Account created succesfully", "success")

        }
        else {
            props.showAlert(" Invalid Credintials", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container log-c  mt-3'>

            <h2 className='logtxt mx-2'>Create Account Using to Inotebook </h2>
            <form className='mx-2' onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Enter Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Enter Email</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Enter Password</label>
                    <input type={visible ? "text" : "password"} className="form-control" id="password" name="password" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type={visible ? "text" : "password"} className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required />
                    <label className="checkBox mt-2">
                        <input type="checkbox" onClick={handleToggle} id="ch1" />
                        <div className="transition"></div>
                    </label>
                </div>
                <div className='container bt mb-2'>
                    <button type="submit" className="btn  sub"><span className='sub1'>Submit</span></button>
                </div>
            </form>

        </div>
    )
}
