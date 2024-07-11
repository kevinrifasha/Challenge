import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';


export default function Layout() {
    return (
        <>
        <Navbar />
        <Outlet />
        <ToastContainer />
        </>
    )
}