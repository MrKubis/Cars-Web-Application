import { NavLink } from "react-router-dom";
import "./Navbar.css"

//navbar
export default function Navbar(){
    return(
        <div className="navbar-container">
            <NavLink className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "active" : ""
                                    }
             to="/cars" style={{textDecoration:'none'}}>
                    <div className="navbar-link-container">
                        Cars list
                    </div>
                </NavLink>
                <NavLink className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "active" : ""
                                    }
                  style={ { textDecoration:"none"}} to="/cars/create">
                    <div className="navbar-link-container">
                        Create a car
                    </div>
                </NavLink> 

                <NavLink className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "active" : ""
                                    }
                            to="/login" style={{textDecoration:'none'}}>
                    <div className="navbar-link-container">
                        Login
                    </div>
                </NavLink>
                <NavLink className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "active" : ""
                                    }
                            to="/register" style={{textDecoration:'none'}}>
                    <div className="navbar-link-container">
                        Register
                    </div>
                </NavLink>
        </div>
    )
}