import {useState} from "react"
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import {useContext} from "react";
import {UserContext} from "../UserContext.jsx";
import axios from "axios";
export default function LoginPage(){

    const [email ,setEmail] = useState('');
    const [password ,setPassword] =useState('');
    const [redirect ,setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);


    //when we are sending cookies between different hosts or patterns they should be accepted
    async function handleLogin(ev){
        ev.preventDefault();
        try{
           const {data }= await axios.post('/login' ,{email ,password} );
           setUser(data);
            alert("Login successful")  
            setRedirect(true);
            
        }
         catch(e){
            alert("Login Failed");
         }
    }

    if(redirect){
        return <Navigate to={'/'}/>
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
           
            <div className="mb-32">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form className="max-w-md mx-auto" onSubmit={handleLogin}>
                <input type="email" 
                placeholder="youremail.com"
                 value = {email}
                 onChange={ev => setEmail(ev.target.value)}
                />
                <input type="password" 
                placeholder="password"
                value = {password}
                onChange={ev => setPassword(ev.target.value)}
                
                />
                <button  className="primary">Login</button>
                <div className="text-center py-2 text-gray-500">
                    Dont have an account yet? 
                    <Link  className="underline text-black" to={'/register'}>
                    Register now
                    </Link>

                </div>
            </form>
                
            </div>

        </div>
    )
}