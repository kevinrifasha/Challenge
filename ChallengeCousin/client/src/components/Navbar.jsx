import "./Navbar.css"
import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <nav>
            <div className="nav-item">
                <NavLink to={"/"}>Home</NavLink>
            </div>
            <div className="nav-item">
                <a href="#categories">Categories</a>
            </div>
            <div className="nav-item">
                <span>Cart</span>
            </div>
        </nav>
    )
}