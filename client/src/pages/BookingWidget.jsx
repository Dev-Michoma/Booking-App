import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { differenceInCalendarDays } from 'date-fns';
import {Navigate ,Link } from "react-router-dom";
import axios from 'axios';

export default function BookingWidget({place }){

     const [checkIn ,setCheckIn] = useState('');
     const [checkOut ,setCheckout] = useState('');
     const [numberOfGuests ,setNumberOfGuests] = useState(1);
     const [name ,setName] = useState ('');
     const [phone ,setPhone] = useState('');
     const [redirect ,setRedirect] = useState('');


     let numberOfDays = 0;
     if (checkIn && checkOut) {
         numberOfDays = differenceInCalendarDays(new Date(checkOut) , new Date(checkIn));
     }


     async function bookThisPlace(){
      //Calculating the total Price in the  booking section
      const response  = await axios.post('/bookings' , {checkIn ,checkOut ,numberOfGuests ,name ,phone ,
            place: place._id, 
            price: numberOfDays * place.price,
         }) 
         const bookingId = response.data._id;
         setRedirect (`/account/bookings/${bookingId}`);
     }

     if(redirect) {
      return <Navigate to= {redirect}/>
     }

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

                                 {
                                    numberOfDays > 0 && (
                                        <div className="mt-2">
                                            <label>Your Full Name</label>
                                            <input type="text" value={name} onChange={ev => setName(ev.target.value)} placeholder="John Doe"/>

                                            <label>Your Phone number</label>
                                            <input type="tel" value={phone} onChange={ev => setPhone(ev.target.value)} placeholder="+254******"/>
                                        </div>
                                    )
                                 }
                   </div>
                     <button onClick={bookThisPlace} className="primary mt-4">Book these Place

                        {numberOfDays >0  && (
                           <span>
                            ${numberOfDays * place.price}
                           </span>
                        )}
                     </button>
                  </div>
                  
                </div>
     
            </div>
            
    )
}