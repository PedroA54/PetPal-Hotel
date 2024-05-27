import React from "react";
import { NavLink } from "react-router-dom";
import AddAnimal from '../components/Animals/AnimalForm';

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
            <AddAnimal />
        </>
    );
}

export default HomePage;
