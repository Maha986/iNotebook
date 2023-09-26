import {useState} from "react";
import UserContext from "./userContext";

function UserState(props) {
    const host = "http://localhost:5000";
    const [userAuthres, setUserAuthres] = useState({success:null,message:null});
    let authToken;
    //user login
    const login = async (email,password) =>{
        try {
            const response = await fetch (`${host}/api/auth/login`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email,password})
            })
            const res= await response.json();
            authToken=res.message;
            setUserAuthres(await res);
        } catch (error) {
            console.log(error)
        }
       
    }

    const signup= async (name,email,password)=>{
        try {
            const response = await fetch(`${host}/api/auth/createuser`,{
                method:'POST',
                headers:{
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({name,email,password})
            })
            setUserAuthres(await response.json());
            // const res=await response.json();
        } catch (error) {
            console.log(error)
        }
       
    }

    return (
        // <NoteContext.Provider value={{state,update}}>
        <UserContext.Provider value={{login,userAuthres,signup,authToken}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState