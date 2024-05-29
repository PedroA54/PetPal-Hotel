import React from "react";
import AnimalsDetail from "../components/Animals/AnimalDetail";

import AddAnimal from '../components/Animals/AnimalForm';
import { Redirect } from "react-router-dom";

function ProfilePage({user}) {

    if (user == null){
        return <Redirect to="/login" />
    }
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
