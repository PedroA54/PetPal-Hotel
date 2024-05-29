import React from "react";
import AddAnimal from '../components/Animals/AnimalForm';
import foxLogo from '/Users/kianeitzell/development/code/phase-4/p4-group-project/client/src/components/fox.png'; // Import the image
import AnimalsDetail from "../components/Animals/AnimalDetail";
import { Redirect } from "react-router-dom"

function HomePage({ user }) {

    if (user == null) {
        return <Redirect to="/login" />
    }

    function HomePage({ user }) {
        return (
            <div className="home-page-container">
                <header>
                    <h1>Hello{user ? `, ${user.userName}` : null}. Welcome to PetPal Hotel!</h1>
                    <img src={foxLogo} alt="Fox Logo" style={{ width: '100px', height: 'auto', position: 'absolute', top: '0', right: '30px' }} />
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
