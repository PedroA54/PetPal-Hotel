import React from "react";

import AddAnimal from '../components/Animals/AnimalForm';
import AnimalHome from "../components/Animals/AnimalListHome";

function HomePage({ user }) {
    return (
        <div className="home-page-container">
            <header>
                <h1>Hello{user ? `, ${user.userName}` : null}. Welcome to PetPal Hotel!</h1>
            </header>
            <section>
                <AddAnimal />
            </section>
            <section>
                <AnimalHome />
            </section>
        </div>
    );
}

export default HomePage;
