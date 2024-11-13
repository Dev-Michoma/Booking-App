import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function BookingWidget({place}){

     const [checkIn ,setCheckIn] = useState('');
     const [checkOut ,setCheckout] = useState('');
     const [numberOfGuests ,setNumberOfGuests] = useState(1);

    

    return(
        <div className="grid mt-8 gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                <div className="my-4">
               <h2 className="font-semibold text-1.5xl">Description</h2>
               {place.description}
               </div>
                  Check-in :{place.checkIn} <br/>
                  Check-out : {place.checkOut} <br/>
                  Max number of Guests: {place.maxGuests}
                  
                </div>
                <div>
                  <div className="bg-white shadow p-4 rounded-2xl">
                 <div className="text-2xl  text-center">     Price : {place.price} /per night</div>

                   <div className="border rounded-2xl mt-4">
                   <div className="flex">
                   <div className=" bg-gray-200 py-3 px-4">
                      <label>Check In:</label>
                      <input type="date" value={checkIn} onChange={ev => setCheckIn(ev.target.value)}/>
                    </div>

                    <div className=" bg-gray-200 py-3 px-4 border-l">
                      <label>Check In:</label>
                      <input type="date" value={checkOut} onChange={ev => setCheckout(ev.target.value)}/>
                    </div>

                   </div>


                   <div className=" bg-gray-200 py-3 px-4 border-t ">
                      <label>Number of Guests:</label>
                      <input type="number" value={numberOfGuests}  onChange={ev => setNumberOfGuests(ev.target.value)}/>
                    </div>


                   </div>
                     <button className="primary mt-4">Book these Place</button>
                  </div>
                  
                </div>
     
            </div>
            
    )
}