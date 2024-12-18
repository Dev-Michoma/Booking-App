
import { useState ,useEffect} from "react";
import axios from "axios";
import {Navigate ,Link ,useParams} from "react-router-dom";
import Perks from "./Perks";
import PhotosUploader from "./PhotosUploader";
import AccountNav from "./AccountNav";
export default function PlacesformPage(){
     const {id} = useParams('');
     console.log({id});
     const[title ,setTitle] = useState('');
     const[price ,setPrice] = useState('');
     const [address ,setAddress] = useState('');
     const [addedPhotos ,setAddedPhotos] = useState('');
     const [photoLink ,setPhotoLink] = useState('');
     const [description ,setDescription] =useState('');
     const [perks ,setPerks] = useState('');
     const [extraInfo ,setExtraInfo] = useState('');
     const [checkIn ,setCheckIn] = useState('');
     const [checkout ,setCheckOut] = useState('');
     const [maxGuests ,setMaxGuests] =useState(100);
     const [redirectToPlacesList ,setRedirectToPlacesList] = useState(false);


    useEffect(( ) =>{
     if(!id) {
        return;
     }
     axios.get('/places/' + id).then(response => {
           const {data} = response;
           setTitle(data.title || '');
           setAddress(data.address || '');
           setAddedPhotos(data.photos || []);
           setDescription(data.description || '');
           setPerks(data.perks || []);
           setExtraInfo(data.extraInfo || '');
           setCheckIn(data.checkIn) || '';
           setCheckOut(data.checkout || '');
           setMaxGuests(data.maxGuests || 100);
           setPrice(data.price);
     });
    },[id]);

    //function to add new places to the database:
async function addNewPlace(ev){
    ev.preventDefault();

    const placeData = {
    title ,address ,addedPhotos,
    description ,perks ,extraInfo,
    checkIn ,checkout ,maxGuests,price,
     };


   if (id) {
    await axios.put ('/places' ,{

        id, ...placeData });
        setRedirectToPlacesList (true);
    }
   
 else {

    await axios.post('/places ',
      {...placeData});
      setRedirectToPlacesList (true);
  }
}
  if(redirectToPlacesList){
    return <Navigate to={'/account/places'}/>
  }
  
  
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
  
    return(
    <div>
<form onSubmit={addNewPlace}>
    <AccountNav/>
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
  {/* //Here is the photos upload component */}
 <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>

  <h2 className="text-2xl mt-4">Description</h2>
 <p className="text-gray-500 text-sm">Description of the place</p>
        <textarea rows="4" cols="15" value={description} onChange={ev => setDescription(ev.target.value)}/>

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

   <div className="mt-4 -mb-1">
    <h3>Price Per Night</h3>
   <input type ="text" placeholder=""  value={price} onChange={ev => setPrice(ev.target.value)}/>
   </div>
  </div>


  <div >
    <button className="primary my-4">Save</button>
  </div>
</form>
</div>);
}
