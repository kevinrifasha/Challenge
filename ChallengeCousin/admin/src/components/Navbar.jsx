import Nav from "react-bootstrap/Nav"
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function Navbar() {

    const navigate = useNavigate()
    function handleLogout() {
        localStorage.clear()
        navigate("/login")
    }
    return (
        <Nav className="bg-primary px-5 py-3 mb-5 d-flex" variant="underline">
            <Nav.Item>
                <NavLink to="/" className="text-white fs-4 me-3 text-decoration-none"> HOME</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to="/" className="text-white fs-4 me-3 text-decoration-none"> PRODUCTS</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to="/categories" className="text-white fs-4 me-3 text-decoration-none"> CATEGORIES</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to="/admin" className="text-white fs-4 me-3 text-decoration-none">ADD ADMIN</NavLink>
            </Nav.Item>
            <button 
            onClick={handleLogout}
            className="btn btn-danger ms-auto">Logout</button>
        </Nav>
    )
}

export default Navbar
