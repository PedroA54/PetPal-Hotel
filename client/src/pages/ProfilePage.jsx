import React from "react";
import { Redirect } from "react-router-dom";
import BookingDetail from "../components/Bookings/BookingDetail";
import AnimalsDetail from "../components/Animals/AnimalDetail";
import AddAnimal from '../components/Animals/AnimalForm';
import logo from '../photos/flamingo.png';
import './ProfilePage.css'; 


function ProfilePage({ user }) {
    if (user === null) {
        return <Redirect to="/login" />
    }
    return (
        <div className="profile-page-container">
            <div className="profile-header-container">
                <header>
                    <h1 className="profile-header">{user ? `${user.userName}'s Profile` : 'Profile'}</h1>
                    <img src={logo} alt="Logo" className="profile-logo" /> 
                </header>
            </div>
            <div className="details-row">
                <section>
                    <AnimalsDetail />
                </section>
                <section>
                    <BookingDetail />
                </section>
            </div>
            <section>
                <AddAnimal />
            </section>
        </div>
    );
}

export default ProfilePage;


