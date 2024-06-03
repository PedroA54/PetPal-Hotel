import React from "react";
import { Redirect } from "react-router-dom";
import AnimalHome from "../components/Animals/AnimalListHome";
import AddAnimal from '../components/Animals/AnimalForm';
import logo from '../photos/Fox.png';
import './HomePage.css'; 


function HomePage({ user }) {
    if (user === null) {
        return <Redirect to="/login" />
    }
    return (
        <div className="home-page-container">
            <header>
            <h1>Hello{user ? `, ${user.userName}` : null}. Welcome to PetPal Hotel!</h1>
                <img src={logo} alt="Logo" className="home-logo" />
                <p className="welcome-paragraph">At PetPal Hotel, we are dedicated to providing the best care for your beloved pets. Whether it's a cozy stay, a playful day, or a grooming session, we ensure a tail-wagging experience for every furry friend. Explore our services and make your pet's stay memorable!</p>
            </header>
            <div className="animal-row">
                <section>
                    <AddAnimal />
                </section>
                <section>
                    <AnimalHome />
                </section>
            </div>
        </div>
    );
}

export default HomePage;