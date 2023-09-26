import React,{useState, useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import userContext from '../context/user/userContext'
import alertContext from '../context/Alert/alertContext';
import signupimage from "../assets/signup.png"
function Signup() {

    const context = useContext(userContext);
    const {signup,userAuthres} = context;
    const a_Context = useContext(alertContext);
    const {showAlert} = a_Context;

    const navigate=useNavigate();
    const [user, setuser] = useState({ email:"", password:"", name:"",cpassword:""})

    const handleSubmit = async (e)=>{
        e.preventDefault();
        await signup(user.name, user.email, user.password);
    }
    useEffect(() => {
        if(userAuthres.success!==null)
        {
            
            if(userAuthres.success)
            {
                setuser({email:"", password:"", name:"",cpassword:""});
                showAlert("You have successfully signed in","success");
                userAuthres.success=null;
                navigate("/");
            }
            else
            {
                showAlert(userAuthres.message,"error");
            }
        }
    }, [userAuthres])
    const handleChange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
    }
  return (
    <>
    <div className='d-flex justify-content-between align-items-center flex-column-reverse flex-md-row'>
            <div className='col-10 col-md-5 mt-5'>
            <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">User Name</label>
          <input type="name" name="name" value={user.name} onChange={handleChange} className="form-control" id="name" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} className="form-control" id="email" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" name="password" value={user.password} onChange={handleChange} className="form-control" id="password" />
        </div>
        <div className="mb-3">
          <label htmlFor="c-password" className="form-label">Password</label>
          <input type="password" name="cpassword" value={user.cpassword} onChange={handleChange} className="form-control" id="cpassword" />
        </div>

        <button disabled={user.password.length<5 || user.name.length<3 || user.password !== user.cpassword} type="submit" className="btn btn-warning" onClick={handleSubmit}>Signup</button>
      </form>
            </div>
      
            <div className="col-10 col-md-5">

<img src={signupimage} alt="" className='w-100' />
</div>
    </div>
    </>
  )
}

export default Signup