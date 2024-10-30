
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

  function removePhoto(filename){

    onChange([...addedPhotos.filter(photo => photo !==filename)]);
  }



    return(      
        <>
         <div className="flex gap-2">
                        <input type = "text"   value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} placeholder={'Add using a Link ....jpg'}/>
                        <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl grow">Add&nbsp;Photo</button>
                      </div>

                      <div className="mt-3 mb-4 left-2 gap-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">

                        {
                            addedPhotos.length > 0 && addedPhotos.map(link => (
                                  <div className=" gap-3 flex items-center justify-center relative "  key={link}>
                                   <img className=" rounded-2xl" src={'http://localhost:4000/uploads/' + link} />
                                       
                                       {/* Button to delete the specified Images */}
                                       <button onClick={()=> removePhoto(link)} className="absolute bottom-1.5 right-1.5 cursor-pointer text-white rounded-xl bg-opacity-50 bg-black p-1 z-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                     </svg>
                                   </button>
                                    
                                    
                                   <button onClick={() =>selectAsMainPhoto(link)} className=" cursor-pointer absolute bottom-1.5 left-1.5 text-white  rounded-xl bg-opacity-50 bg-black p-0.5">
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                    </svg>
                                   </button>
                                   
                            
                                  </div>
                            ))
                        }
                       <label className="border gap-3 cursor-pointer justify-center bg-transparent rounded-2xl p-8 text-3xl text-gray-600"> 
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