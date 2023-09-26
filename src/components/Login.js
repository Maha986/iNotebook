import React, { useContext, useState, useEffect } from 'react'
import userContext from '../context/user/userContext'
// import alertContext from '../context/Alert/alertContext';
import {useNavigate} from 'react-router';
import alertContext from '../context/Alert/alertContext';
import loginimage from "../assets/Notes.png"
import "../style/_custom.css"

function Login() {
    const context = useContext(userContext);
    const {login,userAuthres} = context;
    const a_Context = useContext(alertContext);
    const {showAlert} = a_Context;
    const navigate = useNavigate();
    const [user, setuser] = useState({ email:"", password:""})

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(user.email, user.password);
    }
    useEffect(() => {
        if(userAuthres.success!==null)
        {
            if(userAuthres.success)
            {
                localStorage.setItem('authToken',userAuthres.authToken);
                navigate("/notes");
                userAuthres.success=null;
                showAlert("You have successfully logged in","success");
            }
            else
            {
                showAlert("Invalid Credentials","error");;
            }
        }
        
        
    }, [userAuthres.success])
    

    const handleChange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <div className='d-flex justify-content-between align-items-center flex-column-reverse flex-md-row'>
            <div className='col-10 col-md-5 mt-5'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name="email" value={user.email} onChange={handleChange} className="form-control" id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" value={user.password} onChange={handleChange} className="form-control" id="password" />
                </div>

                <button disabled={user.password<5} type="submit" className="btn btn-warning">Login</button>
            </form>
            <p className='my-3'>Don't have an account? <a href='/signup'>Register Now</a></p>
            </div>
            <div className="col-10 col-md-5">

            <img src={loginimage} alt="" className='w-100' />
            </div>
        </div>
    )
}

export default Login