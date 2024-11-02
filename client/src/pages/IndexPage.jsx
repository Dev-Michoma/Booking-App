import { Link } from "react-router-dom";
import HeaderPage from "../Header";
import { useEffect, useState } from "react";
import axios from "axios";
export  default function IndexPage(){
      const [landingpages,setLandingpages] = useState([]);
     useEffect (()=>{
          axios.get('/landingpages').then(response =>{
          setLandingpages(response.data);
          });
     },[]);
    return (
        <div>
          {
            landingpages.length > 0 && landingpages.map(landingpage => (
                <div key={landingpage.id}>
                    
                    {landingpage.photos?.[0] &&(
                        <img src={'http://localhost:4000/uploads/'+landingpage.photos?.[0]} alt=""/>
                    )}
                    
                    {landingpage.title}
                </div>
            ))
          }
        </div>
    );
}