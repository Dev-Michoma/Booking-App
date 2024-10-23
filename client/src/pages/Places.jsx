import { useState } from "react";
import {Navigate ,Link ,useParams} from "react-router-dom";
import Perks from "./Perks";
export default function PlacesPage(){
    const {action} = useParams();

    const[title ,setTitle] = useState('');
    const [address ,setAddress] = useState('');
    const [addedPhotos ,setAddedPhotos] = useState('');
    const [photoLink ,setPhotoLink] = useState('');
    const [Description ,setDescription] =useState('');
    const [perks ,setPerks] = useState('');
    const [extraInfo ,setExtraInfo] = useState('');
    const [checkIn ,setCheckIn] = useState('');
    const [checkout ,setCheckOut] = useState('');
    const [maxGuests ,setMaxGuests] =useState(2);

function inputHeader(text){
    return(
      <h2 className="text-2xl mt-4">{text}</h2>
    );
}

function inputDescription(text){
    return(
     <p className="text-gray-500">{text}</p>
    );
}

function preInput(header ,description){
    return (
      <>
      {inputHeader(header)}
      {inputDescription(description)}
      
      </>
    );
}

    
    
    console.log(action);
    return (
        <div>

            {action !== 'new' && (
                  <div className="text-center">
                  <Link className=" inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full" to={'/account/places/new'}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                   </svg>
      
                  Add a new Place</Link>
                  </div>
            )}

            {action === 'new' && (
                <div>
                    <form>
                        {preInput('Title' , 'Title for your place should be short and catchy')}
                     {/* <h2 className="text-2xl mt-4">Title</h2>
                     <p className="text-gray-500 text-sm">Title for your place should be short and catchy</p> */}
                      <input type="text" placeholder="title ,for example: My Lovely apartment"/> 
                      {preInput('Address' , 'Title for your Address should be short and catchy')}
                      {/* <h2 className="text-xl mt-4">Address</h2>
                      <p className="text-gray-500 text-sm">Title for your Address should be short and catchy</p> */}
                      <input type="text" placeholder="address"/> 
                      <h2>Photos</h2>
                      <p className="text-gray-500 text-sm"> More=Better </p>
                      <div className="flex gap-2">
                        <input type = "text" placeholder={'Add using a Link ....jpg'}/>
                        <button className="bg-gray-200 px-4 rounded-2xl grow">Add&nbsp;Photo</button>
                      </div>

                      <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                      <button className="border gap-1 flex justify-center bg-transparent rounded-2xl p-8 text-3xl text-gray-600"> 
                        
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
                       </svg>
                       upload
                        </button>
                      </div>
                    
                      <h2 className="text-2xl mt-4">Description</h2>
                     <p className="text-gray-500 text-sm">Description of the place</p>
                            <textarea/>
                    
                     <h2 className="text-2xl mt-4">Perks</h2>
                     <p className="text-gray-500 text-sm"> Select all the parks from your place</p>
                     <div className="grid gap-3 mt-4 grid-cols-2 md:grid-cols-3">
                        <Perks/>
                        <label className="border gap-2 flex rounded-2xl p-4">
                            <input type="checkbox"/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                         </svg>

                            <span>Entrance</span>
                        </label>
                     </div>
                     <h2 className="text-2xl mt-4">Extra Info</h2>
                     <p className="text-gray-500 text-sm"> These are the house Rules</p>
                       <textarea/>
                       <h2 className="text-2xl mt-4">Check in & Check out times ,max guests</h2>
                       <p className="text-gray-500 text-sm"> Add check in and Checout times</p>

                      <div className="grid sm:grid-cols-3">
                      <div className="mt-4">
                        <h3>Check in times
                        </h3>
                        <input type ="text" placeholder="14:00hrs"/>
                       </div>
                       <div className="mt-4">
                         <h3>Check out times</h3>
                       <input type ="text" placeholder="14:00hrs"/>
                       </div>
                       <div className="mt-4 -mb-1">
                        <h3>Max Guests</h3>
                       <input type ="text" placeholder="2"/>
                       </div>
                      </div>


                      <div >
                        <button className="primary my-4">Save</button>
                      </div>
                    </form>
                </div>
            )}
          
            my places
        </div>
    )
}