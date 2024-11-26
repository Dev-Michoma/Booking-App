import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "./BookingWidget";
import axios from 'axios';
import AccountNav from "./AccountNav";
import Avator from "./Avator";

export default function ChatPage(){

   
    const [ws ,setWs] =useState(null);
    const [onlinePeople ,setOnlinePeople] = useState({});
    const [selectedUserId ,setSelectedUserId] = useState(null);
    useEffect(()=>{
       const ws =  new WebSocket('ws://localhost:4000')
       setWs(ws);
       ws.addEventListener('message' ,handleMessage)
    },[]);
    function showOnlinePeople(peopleArray){
      // console.log(people);
      const people = {};
      peopleArray.forEach(({userId ,username}) => {
        people[userId] = username;
      })
      // console.log(people);
      setOnlinePeople(people);
    }

   function selectContact(userId){

   }


    function handleMessage(ev){
        // console.log('new message' , e);
        // console.log(ev.data);

        const messageData  = JSON.parse(ev.data);
        // console.log(messageData)
        if ('online' in messageData) {
          showOnlinePeople(messageData.online)
        }
    }
    return (
     <div>
    <AccountNav/>
      
      <div className="flex h-screen border-2 rounded-lg h-[65vh] border-gray-300 mx-64">
      <div className="bg-blue-100 w-1/3 p-2">

      <div className="text-blue-800 font-bold">
        AfriChat
      </div>
      
       {Object.keys(onlinePeople).map(userId =>(
        <div key= {userId}onClick = {() => setSelectedUserId(userId)} className="border-b cursor-pointer border-gray-100 flex items-center gap-2  py-2"> 
          <Avator username={onlinePeople} userId={userId}/>
          <span>{onlinePeople[userId]}</span>
          </div>
       )) }
      </div>
      <div className="bg-blue-300    flex  flex-col w-2/3">
      <div className="flex-grow mt-4 mx-6">Messages With Selected Person</div>


      <div className="flex  bottom-28 left-0 w-full p-4 mx-2 "> 
       <input type="text" className="bg-white border bottom-0 p-2 w-4 " placeholder="Type Your Message Here"/>
         <button className="mx-4 bg-blue-300">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
         </button>
         
      </div>

      </div>
      </div>
     </div>
      
    )
}