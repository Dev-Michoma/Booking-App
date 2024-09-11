import {createContext, useEffect} from "react";
import { useContext } from "react";
import {useState} from "react";
import axios from "axios";
export const UserContext = createContext({});

export function UserContextProvider({children}) {
//setting state and distributing it globally
    const [user ,setUser] = useState(null);
    const [ready ,setReady] = useState(false);
    useEffect(()=>{
    if(!user){
        axios.get('/profile').then(({data})=>{
            setUser(data);
            setReady(true);
        });
    }
    },[]);
   
    return (
        <UserContext.Provider value={{user ,setUser ,ready}}>
            {children}
        </UserContext.Provider>
        
        
    );
}