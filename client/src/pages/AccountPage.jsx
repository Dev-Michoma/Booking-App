import {useContext} from "react";
import { useState } from "react";
import {UserContext} from "../UserContext.jsx";
import {Navigate ,Link ,useParams} from "react-router-dom";
import axios from "axios";
import PlacesPage from "./Places.jsx";


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
        let classes = 'py-7 px-6';
        if(type === subpage)
        {
        classes += "bg-red text-red rounded-full"
        }
       return classes;

       if (redirect){
        return <Navigate to={redirect}/>
       }

    }

    return(
        
      <div>
        <nav className="w-full flex mt-8 justify-center gap-2 mb-8">
        <Link  className={linkClasses('profile')} to={'/account/'}>Profile</Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}>My Bookings</Link>
        <Link className= {linkClasses('places')}  to={'/account/places'}>My accomodations</Link>
        </nav>
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