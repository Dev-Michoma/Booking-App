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
                <div>
                    {landingpage.title}
                </div>
            ))
          }
        </div>
    );
}