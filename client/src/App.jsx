
import './App.css'
import {Route ,Routes}  from "react-router-dom";
import IndexPage  from './pages/IndexPage';
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage';
import {useEffect } from "react"
import Layout from './Layout';
import axios from "axios";
import {createContext} from "react";
import { UserContextProvider } from './UserContext';



axios.defaults.baseURL = 'http://localhost:4000';
//To send cookies with Axios, you must set the withCredentials 
//property to true. This tells Axios to send cookies along with 
//the request to the server. Axios will not send cookies /
//automatically without this setting, and your server
// will not receive the necessary data for cookie-based authentication or session management.
axios.defaults.withCredentials = true;
function App() {

  return (
    <UserContextProvider>
    <Routes>
    <Route path="/" element={<Layout/>}> 
    <Route index element={<IndexPage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/register" element={<RegisterPage/>}/>
    </Route>
  </Routes>
 </UserContextProvider>
  )
}

export default App
