import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <nav className="navbar">
            <NavLink to="/" className="nav-link">
                Entry
            </NavLink>
            <NavLink to="/home" className="nav-link">
                Home Page
            </NavLink>
            <NavLink to="/appointment" className="nav-link">
                Appointment
            </NavLink> 
            <NavLink to="/profile" className="nav-link">
                Profile
            </NavLink> 
            
            <NavLink to="/signup" className="nav-link">
                Sign Up
            </NavLink>
            <NavLink to="/login" className="nav-link">
                Log In
            </NavLink>

        </nav>
    );
}
export default NavBar;