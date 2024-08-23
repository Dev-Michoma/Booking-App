import { Outlet } from "react-router-dom";
import HeaderPage from "./Header";

export default function Layout(){
    return (
        <div>
            <HeaderPage/>
            <Outlet/>
        </div>
    )
}