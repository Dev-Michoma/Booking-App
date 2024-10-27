import { useState ,useEffect} from "react";
import axios from "axios";
import {Navigate ,Link ,useParams} from "react-router-dom";
import Perks from "./Perks";
import PhotosUploader from "./PhotosUploader";
export default function PlacesPage(){
    const {action ,id} = useParams();
    console.log({id});
    const[title ,setTitle] = useState('');
    const [address ,setAddress] = useState('');
    const [addedPhotos ,setAddedPhotos] = useState('');
    const [photoLink ,setPhotoLink] = useState('');
    const [description ,setDescription] =useState('');
    const [perks ,setPerks] = useState('');
    const [extraInfo ,setExtraInfo] = useState('');
    const [checkIn ,setCheckIn] = useState('');
    const [checkout ,setCheckOut] = useState('');
    const [maxGuests ,setMaxGuests] =useState(100);
    const [redirect ,setRedirect] = useState('');
    const [places ,setPlaces] = useState([]);

     useEffect(()=> {
     
        if(!id){
            return;
        }
        axios.get('/places/ '+ id).then(response => {
            const {data} =response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkout);
            setMaxGuests(data.maxGuests);
        })
     },[id]
     );

    useEffect(()=> {
       axios.get('/listplaces').then(({data})=>{
       setPlaces(data);
       });
    },[])

async function addNewPlace(ev){
  ev.preventDefault();
  await axios.post('/places ',
    {title ,address ,addedPhotos,
    description ,perks ,extraInfo,
    checkIn ,checkout ,maxGuests});

    setRedirect ('/account/places');
}


if(redirect){
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

///Preventing Default and refresh Behaviour

    
    // console.log(action);
    return (
        <div className="">

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
                    <form onSubmit={addNewPlace}>
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
                     <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
                    
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
          
            <div className="mt-6">
                {
                    places.length > 0 && places.map(place => (
                        <Link to={'/account/places/' + place._id} className="flex gap-4 bg-gray-200 p-2 cursor-pointer rounded-2xl" key={place._id}>

                            <div className="w-32 h-32 bg-gray-100 grow shrink-0">
                             {place.photos.length > 0 && (
                                <img src={place.photos[0]} alt=""/>
                             )}
                            </div>
                            <div className="grow-0 shrink">
                            <h2 className="text-xl ">{place.title}</h2>
                            <p className="text-sm mt-2">{place.description}</p>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}