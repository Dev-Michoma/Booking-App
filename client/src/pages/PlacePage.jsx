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
      <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
        {/* place page: {id} */}
        <h1 className="text-2xl">{place.title}</h1>
        <a target="_blank "  href={'https://maps.google.com/?q=' +place.address }>{place.address}</a>
      </div>
    );
}