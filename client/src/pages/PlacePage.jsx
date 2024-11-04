import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function PlacePage(){
     const {id} = useParams();
     const [place ,setPlace] = useState(null);
     const [showAllPhotos ,setShowAllPhotos] = useState(false);

     useEffect (() => {

     if (!id) {
        return;
     }
    axios.get(`/places/${id}`).then(response => {
        setPlace(response.data);
    })

     },[id]);

     if(!place) return '';

     if(showAllPhotos){
     return(
     <div className=""> 
     show photos
     </div>);
     }
 //Research between the difference of Relative and absolute
    return(
      <div className="mt-4 bg-gray-100 -mx-4 px-8 py-2">
        {/* place page: {id} */}
        <h1 className="text-2xl">{place.title}</h1>
        <a className="block my-2 font-semifold underline" target="_blank "  href={'https://maps.google.com/?q=' +place.address }>{place.address}</a>
          
          <div className="relative">
          <div className="grid gap-2 grid-cols-[2fr_1fr]">
            <div> {
                           place.photos.length > 0 && (
                          <div >  <img
                                className="object-cover aspect-square"
                                src={`http://localhost:4000/uploads/${place.photos[0]}`}
                                alt="Image not Showing"
                            /> </div>
                        )
                          
                        }
            </div>
            <div  className=" grid gap-2">
            {
                           place.photos.length > 0 && (
                            <img
                                className="object-cover aspect-square"
                                src={`http://localhost:4000/uploads/${place.photos[0]}`}
                                alt="Image not Showing"
                            />
                        )
                          
                        }
                        
                         <div className="overflow-hidden">
                        {
                           place.photos.length > 0 && (
                            <img
                                className="object-cover aspect-square"
                                src={`http://localhost:4000/uploads/${place.photos[0]}`}
                                alt="Image not Showing"
                            />
                        )
                          
                        }
                        </div>
            </div>
          </div>
            <button onClick={() => setShowAllPhotos(true)}className=" flex gap-1 absolute bottom-2 bg-2 rounded-2xl shadow-md shadow-gray-500 right-2 py-2 px-4">
                
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
             </svg>

                Show more Photos</button>
          </div>
      </div>



   

  
  

      
      
    );
}