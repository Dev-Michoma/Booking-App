import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function PlacePage(){
     const {id} = useParams();
     const [place ,setPlace] = useState(null);

     useEffect (() => {

     if (!id) {
        return;
     }
    axios.get(`/places/${id}`).then(response => {
        setPlace(response.data);
    })

     },[id]);

     if(!place) return '';

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
            <button className="absolute bottom-o right-0">absolute</button>
          </div>
      </div>



   

  
  

      
      
    );
}