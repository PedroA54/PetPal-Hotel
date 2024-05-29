import React from "react";
import { NavLink, Link } from "react-router-dom";

function NavBar({ user, onLogout }) {
    return (
        <nav className="navbar">
            <NavLink to="/home" className="nav-link">
                Home Page
            </NavLink>
            <NavLink to="/pets" className="nav-link">
                Pets
            </NavLink>
            <NavLink to="/appointment" className="nav-link">
                Appointment
            </NavLink>
            {user ? (
                <>
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