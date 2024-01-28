import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Login(props) {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let Navigate = useNavigate();
    const [visible, setVisible] = useState(false)
    // password visible
    const handleToggle = () => {
        setVisible(!visible)

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        // console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            props.showAlert(" Login succesfully", "success")
            Navigate("/");


        }
        else {
            props.showAlert(" Invalid Credentials", "danger")

        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (

        <div className='mt-3 container log-c '>
            <h2 className='logtxt mx-2'>Login to continue to Inotebook</h2>
            <form className="mx-2" onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3 ">
                    {/* <div className="d-inline-flex mx"> */}

                    <label htmlFor="password" className="form-label">Password</label>
                    <input type={visible ? "text" : "password"} className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                    <label className="checkBox mt-2">
                        <input type="checkbox" onClick={handleToggle} id="ch1" />
                        <div className="transition"></div>
                    </label>
                   
                    {/* </div> */}

                </div>
                <div className='container bt mb-2'>
                    <button type="submit" className="btn  sub"><span className='sub1'>Submit</span></button>
                </div>
            </form>
        </div>

    )
}
