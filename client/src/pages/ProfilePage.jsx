import React from "react";
import AnimalsDetail from "../components/Animals/AnimalDetail";
import AddAnimal from '../components/Animals/AnimalForm';
import { Redirect } from "react-router-dom";
import BookingDetail from "../components/Bookings/BookingDetail";

function ProfilePage({user}) {
    if (user === null){
        return <Redirect to="/login" />
    }
    return (
        <>
            <h1>This is the Profile Page</h1>
            <div className="profile-page-container">
            <section >
                <AnimalsDetail />
            </section>
            <section >
                <BookingDetail />
            </section>
            <section >
                <AddAnimal />
            </section>
            </div>
            
            
            
            
        </>
    );
}

export default ProfilePage;
