import React from "react";
import { NavLink } from "react-router-dom";
import AddAnimal from '../components/Animals/AnimalForm';
import foxLogo from '/Users/kianeitzell/development/code/phase-4/p4-group-project/client/src/components/fox.png'; // Import the image

function HomePage({ user }) {


    return (
        <>
            <header>
                <h1>Hello{user ? `, ${user.userName}` : null}. Welcome to PetPal Hotel!</h1>
                <img src={foxLogo} alt="Fox Logo" style={{ width: '100px', height: 'auto', position: 'absolute', top: '0', right:  '30px' }} />
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
