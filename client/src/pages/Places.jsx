import { useState } from "react";
import axios from "axios";
import {Navigate ,Link ,useParams} from "react-router-dom";
import Perks from "./Perks";
export default function PlacesPage(){
    const {action} = useParams();

    const[title ,setTitle] = useState('');
    const [address ,setAddress] = useState('');
    const [addedPhotos ,setAddedPhotos] = useState('');
    const [photoLink ,setPhotoLink] = useState('');
    const [description ,setDescription] =useState('');
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

///Preventing Default and refresh Behaviour
async function addPhotoByLink(ev) {
    ev.preventDefault();

    const { data:filename } = await axios.post('/upload-by-link', { link: photoLink });
    // const filename = data.filename; // Extract the filename from the response
    setAddedPhotos(prev => {
        return [...prev, filename];
    });
    setPhotoLink('');
}

    
    
    // console.log(action);
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
                      <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title ,for example: My Lovely apartment"/> 
                      {preInput('Address' , 'Title for your Address should be short and catchy')}
                      {/* <h2 className="text-xl mt-4">Address</h2>
                      <p className="text-gray-500 text-sm">Title for your Address should be short and catchy</p> */}
                      <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address"/> 
                      <h2>Photos</h2>
                      <p className="text-gray-500 text-sm"> More=Better </p>
                      <div className="flex gap-2">
                        <input type = "text"   value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} placeholder={'Add using a Link ....jpg'}/>
                        <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl grow">Add&nbsp;Photo</button>
                      </div>

                      <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">

                        {
                            addedPhotos.length > 0 && addedPhotos.map(link => (
                                  <div>
                                   <img className=" rounded-2xl" src={'http://localhost:4000/uploads' + link} />
                            
                                  </div>
                            ))
                        }
                       <label className="border gap-1  justify-center bg-transparent rounded-2xl p-8 text-3xl text-gray-600"> 
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                        </svg>
                       Upload
                       <input type="file" className="hidden"/>
                        </label>
                      </div>
                    
                      <h2 className="text-2xl mt-4">Description</h2>
                     <p className="text-gray-500 text-sm">Description of the place</p>
                            <textarea  value={description} onChange={ev => setDescription(ev.target.value)}/>
                    
                     <h2 className="text-2xl mt-4">Perks</h2>
                     <p className="text-gray-500 text-sm"> Select all the parks from your place</p>
                     <div className="grid gap-3 mt-4 grid-cols-2 md:grid-cols-3">
                        <Perks selected={perks} onChange={setPerks}/>
                        
                     </div>
                     <h2 className="text-2xl mt-4">Extra Info</h2>
                     <p className="text-gray-500 text-sm"> These are the house Rules</p>
                       <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>
                       <h2 className="text-2xl mt-4">Check in & Check out times ,max guests</h2>
                       <p className="text-gray-500 text-sm"> Add check in and Checout times</p>

                      <div className="grid sm:grid-cols-3">
                      <div className="mt-4">
                        <h3>Check in times
                        </h3>
                        <input type ="text" placeholder="14:00hrs" value={checkIn} onChange={ev => setCheckIn(ev.target.value)}/>
                       </div>
                       <div className="mt-4">
                         <h3>Check out times</h3>
                       <input type ="text" placeholder="14:00hrs" value={checkout} onChange={ev => setCheckOut(ev.target.value)}/>
                       </div>
                       <div className="mt-4 -mb-1">
                        <h3>Max Guests</h3>
                       <input type ="text" placeholder="2"  value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)}/>
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