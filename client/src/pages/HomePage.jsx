import React from "react";
import logo from '../components/Fox.png';
import AddAnimal from '../components/Animals/AnimalForm';
import AnimalHome from "../components/Animals/AnimalListHome";
import { Redirect } from "react-router-dom";

function HomePage({ user }) {
    if (user === null) {
        return <Redirect to="/login" />
    }
    return (
        <div className="home-page-container">
            <header>
                <h1>Hello{user ? `, ${user.userName}` : null}. Welcome to PetPal Hotel!</h1>
                <img src={logo} alt="Logo" className="home-logo" />
            </header>
            <div className="animal-sections-container">
                <section className="add-animal-section">
                    <AddAnimal />
                </section>
                <section className="animal-home-section">
                    <AnimalHome />
                </section>
            </div>
        </div>
    );
}

export default HomePage;
