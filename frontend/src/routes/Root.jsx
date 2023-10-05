import Navbar from "../components/Navbar.jsx";
import {Outlet} from "react-router-dom";

export default function Root() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}