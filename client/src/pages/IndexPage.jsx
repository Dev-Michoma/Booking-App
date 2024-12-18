import { Link } from "react-router-dom";
import HeaderPage from "../Header";
import { useEffect, useState } from "react";
import axios from "axios";
export  default function IndexPage(){
      const [landingpages,setLandingpages] = useState([]);
     useEffect (()=>{
          axios.get('/landingpages').then(response =>{
          setLandingpages([...response.data,...response.data ,...response.data ,...response.data]);
          });
     },[]);
    return (
        <div className="grid grid-cols-4 gap-4 md:grid-cols-3 lg:grid-cols-6 mt-8 " >
          {
            landingpages.length > 0 && landingpages.map(landingpage => (
                <Link to={`/landingpage/${landingpage._id}`}>

                    
                    <div className="bg-gray-500 rounded-2xl flex">
                    {landingpage.photos?.[0] &&(
                        <div>
                        <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/'+landingpage.photos?.[0]} alt=""/>
                        </div>
                    )}
                    </div>
                    <div className="mt-2">
                    <h2 className="font-bold">{landingpage.address}</h2>
                        <h3 className="text-sm text-gray-500">{landingpage.title}</h3>
                        
                        <div className="mt-1">
                            <span className="font-bold">
                            ${landingpage.price}   per Safari Visit
                            </span>
                              
                        </div>
                    
                    </div>
                </Link>
            ))
          }
        </div>
    );
}