import {useContext} from "react";
import {UserContext} from "../UserContext.jsx";
import {Navigate ,Link ,useParams} from "react-router-dom";


export default function AccountPage(){
    const {ready ,user} = useContext(UserContext);

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
    }

    return(
        
      <div>
        <nav className="w-full flex mt-8 justify-center gap-2">
        <Link  className={linkClasses('profile')} to={'/account/'}>Profile</Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}>My Bookings</Link>
        <Link className= {linkClasses('places')}  to={'/account/places'}>My accomodations</Link>
        </nav>
        {
          subpage === 'profile' && (
            <div className="text-center">
              Logged in as {user.name}  ({user.email}) <br/>
             <button className="primary">Logout</button>

            </div>
          )
        }
      </div>

    );
}