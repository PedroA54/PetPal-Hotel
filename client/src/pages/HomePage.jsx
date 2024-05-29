import React from "react";
import AddAnimal from '../components/Animals/AnimalForm';
//import foxLogo from '/Users/kianeitzell/development/code/phase-4/p4-group-project/client/src/components/fox.png'; // Import the image
//import AnimalsDetail from "../components/Animals/AnimalDetail";function HomePage({ user }) {
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
