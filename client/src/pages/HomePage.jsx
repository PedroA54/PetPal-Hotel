import React from "react";
import { NavLink } from "react-router-dom";
import AddAnimal from '../components/Animals/AnimalForm';

function HomePage({ user }) {
    return (
        <>
            <header>
                <h1>Hello{user ? `, ${user.userName}` : null}. Welcome to PetPal Hotel</h1>
            </header>

            <nav>
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
