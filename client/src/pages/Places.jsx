import { useState ,useEffect} from "react";
import axios from "axios";
import {Navigate ,Link ,useParams} from "react-router-dom";
import Perks from "./Perks";
import PhotosUploader from "./PhotosUploader";
import PlacesformPage from "./PlacesformPage";
import AccountNav from "./AccountNav";
export default function PlacesPage(){
    const {action ,id} = useParams();
    const [redirectToPlacesList ,setRedirectToPlacesList] = useState(false);
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

    if(redirectToPlacesList && action!== 'new'){
        return <Navigate to={'/account/places'}/>
    }

    return (
        <div className="">
                 <AccountNav/>
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
                
                  <PlacesformPage/>
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