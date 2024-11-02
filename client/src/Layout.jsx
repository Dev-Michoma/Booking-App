import { Outlet } from "react-router-dom";
import HeaderPage from "./Header";

export default function Layout(){
    return (
        <div className="py-4 px-8 flex flex-col min-h-screen">
            <HeaderPage/>
            <Outlet/>
        </div>
    )
}