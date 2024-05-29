import React from "react";
import AnimalsDetail from "../components/Animals/AnimalDetail";

import AddAnimal from '../components/Animals/AnimalForm';

function ProfilePage() {
    return (
        <>
            <h1>This is the Profile Page</h1>
            <section>
                <AnimalsDetail />
            </section>
            <section>
                <AddAnimal />
            </section>
            
            
            
            
        </>
    );
}

export default ProfilePage;
