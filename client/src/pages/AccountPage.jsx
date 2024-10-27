import {useContext} from "react";
import { useState } from "react";
import {UserContext} from "../UserContext.jsx";
import {Navigate ,Link ,useParams} from "react-router-dom";
import axios from "axios";
import PlacesPage from "./Places.jsx";
import AccountNav from "./AccountNav.jsx";


export default function AccountPage(){

    const [redirect , setRedirect] = useState(null);
    const {ready ,user ,setUser} = useContext(UserContext);


    async function logout(){
      await axios.post('/logout');
      setUser(null);
      setRedirect('/');
    }


    let {subpage}  = useParams();
       console.log(subpage);
       if(subpage ===undefined){
        subpage = 'profile';
       }

     if (!subpage) {
        subpage = 'profile';
      }
    if(!ready){
    }

     if (ready && !user){
         return <Navigate to={'/login'}/>
     }
       

       function linkClasses(type = null){
        let classes = 'inline-flex gap-1  py-7 px-6';
        if(type === subpage)
        {
        classes += "bg-red text-red rounded-full"
        }
        else {
          classes += 'bg-gray-200';
        }
       return classes;

       if (redirect){
        return <Navigate to={redirect}/>
       }

    }

    return(
        
      <div>
       <AccountNav/>
        {
          subpage === 'profile' && (
            <div className="text-center max-w-lg mx-auto">
              Logged in as {user.name}  ({user.email}) <br/>
             <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>

            </div>
          )
        }
          {
          subpage === 'places' && (
            <div>
              
              <PlacesPage/>
            </div>
          )
        }
      </div>

    );
}