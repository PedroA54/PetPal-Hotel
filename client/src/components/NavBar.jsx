import React from "react";
import { NavLink} from "react-router-dom";


function NavBar({ user, onLogout }) {
    return (
        <nav className="navbar">

            {user ? (
                <>
                    <NavLink to="/home" className="nav-link">
                        Home Page
                    </NavLink>
                    <NavLink to="/appointment" className="nav-link">
                        Appointment
                    </NavLink>
                    <NavLink to="/profile" className="nav-link">
                        Profile
                    </NavLink>
                    <button onClick={onLogout} className="nav-link">
                        Log Out
                    </button>
                </>
            ) : (
                <>
                    <NavLink to="/login" className="nav-link">
                        Log In
                    </NavLink>
                    <NavLink to="/signup" className="nav-link">
                        Sign Up
                    </NavLink>
                </>
            )}
        </nav>
    );
}

export default NavBar;