import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "./BookingWidget";
import axios from 'axios';
import AccountNav from "./AccountNav";
import Avator from "./Avator";
import { UserContext } from "../UserContext";


export default function ChatPage(){

   
    const [ws ,setWs] =useState(null);
    const [onlinePeople ,setOnlinePeople] = useState({});
    const [selectedUserId ,setSelectedUserId] = useState(null);
    const [newMessageText , setNewMessageText] = useState("null")
    const {name ,userId } = useContext(UserContext);
    
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

    // const onlinePeopleExclOurUser = {...onlinePeople};
    // delete onlinePeopleExclOurUser[id];
     function sendMessage(ev){
              ev.preventDefault();
              console.log('sending')
              ws.send(JSON.stringify(
               {
                  recipient: selectedUserId,
                  text: newMessageText,
                }
               
              )
              // ws.send('test');
             );
     }

    return (
     <div>
    <AccountNav/>
      
      <div className="flex h-screen border-2rounded-lg h-[60vh] border-gray-300 mx-64">
      <div className="bg-blue-100  pl-4  w-1/3 p-2">

      <div className="text-blue-800 font-bold">
       
        AfriChat
      </div>
      
       {Object.keys(onlinePeople).map(userId =>(
        <div key= {userId}  onClick = {() => setSelectedUserId(userId)} 
       // Instead of using string concatenation (+), 
       // it's more common and reliable to use template literals for conditional classes in JSX.
       //  This ensures that the classes are correctly concatenated and more readable.
      className={`border-b mt-2 cursor-pointer border-gray-100 flex items-center gap-2 py-2 ${userId === selectedUserId ? 'bg-blue-200' : ''}`}
> 
          <div>
          {userId ===selectedUserId &&(
            <div className="w-1 bg-blue-500 h-12 rounded-r-md"> </div>
           )}
          </div>

          <Avator username={onlinePeople[userId]} userId={userId}/>
          <span>{onlinePeople[userId]}</span>
          </div>
       )) }
      </div>
      <div className="bg-blue-300    flex  flex-col w-2/3">
      <div className="flex-grow mt-4 mx-6">
        {
          !selectedUserId && (
            <div>No Selected Person</div>
          )
        }
        </div>

        {!!selectedUserId && (
           <form className="flex  bottom-28 left-0 w-full p-4 mx-2 " onSubmit={sendMessage}> 
           <input type="text" 
           value ={newMessageText}
           onChange={ev => setNewMessageText(ev.target.value)}
           className="bg-white border bottom-0 p-2 w-4 "
            placeholder="Type Your Message Here"/>
             <button type="submit" className="mx-4 bg-blue-300">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
             </button>
             
          </form>
        )}
     

      </div>
      </div>
     </div>
      
    )
}