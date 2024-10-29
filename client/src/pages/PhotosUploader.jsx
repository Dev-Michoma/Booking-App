
import { useState } from "react";
import axios from "axios";
import {Navigate ,Link ,useParams} from "react-router-dom";
import Perks from "./Perks";
export default function PhotosUploader({addedPhotos ,onChange}){
       
    // const [addedPhotos ,setAddedPhotos] = useState('');
    const [photoLink ,setPhotoLink] = useState('');

    ///Preventing Default and refresh Behaviour
async function addPhotoByLink(ev) {
    ev.preventDefault();

    const { data:filename } = await axios.post('/upload-by-link', { link: photoLink });
    // const filename = data.filename; // Extract the filename from the response
    onChange(prev => {
        return [...prev, filename];
    });
    setPhotoLink('');
}

function uploadPhoto(ev){
    const files = ev.target.files;
    const data = new FormData();

    for (let i=0 ; i < files.length ; i++){
        data.append('photos' ,files[i])
    }
    // data.set('photos[]'  ,files);
    axios.post('/upload' ,data ,{
        headers: {"Content-Type" : 'multipart/form-data'}

    }). then(response => {
        const {data:filename} = response;
        onChange(prev =>{
         return [...prev ,filename];
        })
    })
    console.log({files});
}  
    return(      
        <>
         <div className="flex gap-2">
                        <input type = "text"   value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} placeholder={'Add using a Link ....jpg'}/>
                        <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl grow">Add&nbsp;Photo</button>
                      </div>

                      <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">

                        {
                            addedPhotos.length > 0 && addedPhotos.map(link => (
                                  <div className="h-32 flex" key={link}>
                                   <img className=" rounded-2xl" src={'http://localhost:4000/uploads/' + link} />
                            
                                  </div>
                            ))
                        }
                       <label className="border gap-1 cursor-pointer justify-center bg-transparent rounded-2xl p-8 text-3xl text-gray-600"> 
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                        </svg>
                       Upload
                       <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
                        </label>
                      </div>
        
        </>
    )
}