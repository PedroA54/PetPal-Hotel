import React from "react";
import { NavLink } from "react-router-dom";
import AddAnimal from '../components/Animals/AnimalForm';

function HomePage() {
    return (
        <>
            <header>
                <h1>Hello, Welcome to PetPal Hotel</h1>
            </header>
            
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

            <section>
                <AddAnimal />
            </section>
        </>
    );
}

export default HomePage;
