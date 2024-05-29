import React from "react";
//import { NavLink } from "react-router-dom";
import AddAnimal from '../components/Animals/AnimalForm';

import AnimalsDetail from "../components/Animals/AnimalDetail";function HomePage({ user }) {


    return (
        <>
            <header>
                <h1>Hello{user ? `, ${user.userName}` : null}. Welcome to PetPal Hotel!</h1>
                
            </header>
            <section>
                <AddAnimal />
            </section>
            <section>
                <AnimalsDetail />
            </section>



        </>
    );
}

export default HomePage;
