import React from "react";
import AnimalsDetail from "../components/Animals/AnimalDetail";
import AddAnimal from '../components/Animals/AnimalForm';
import { Redirect } from "react-router-dom";
import BookingDetail from "../components/Bookings/BookingDetail";
import logo from '../components/flamingo.png';

function ProfilePage({user}) {
    if (user === null){
        return <Redirect to="/login" />
    }
    return (
        <div className="profile-page-container">
            <header>
                <h1>Your Profile</h1>
                <img src={logo} alt="Logo" className="profile-logo" /> 
            </header>
            <section>
                <AnimalsDetail />
            </section>
            <section>
                <BookingDetail />
            </section>
            <section>
                <AddAnimal />
            </section>
        </div>
    );
}

export default ProfilePage;


