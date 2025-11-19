import { NavLink } from "react-router-dom";
import "./Navbar.css"

//navbar
export default function Navbar(){
    return(
        <div className="navbar-container">
            <NavLink to="/cars" style={{textDecoration:'none'}}>
                <button className="navbar-button">
                    Cars
                </button>
            </NavLink>
        </div>
    )
}