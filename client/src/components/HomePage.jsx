import React from "react";
import { NavLink } from "react-router-dom";

function HomePage() {
    return (
        <>
            <h1>Hello, Welcome to PetPal Hotel</h1>

            <nav>
            <NavLink to="/appointment" className="nav-link">
                Appointment
            </NavLink>
            <NavLink to="/profile" className="nav-link">
                Profile
            </NavLink>
            <NavLink to="/pets" className="nav-link">
                View Pets
            </NavLink>
            </nav>
        </>
    );
}

export default HomePage;
