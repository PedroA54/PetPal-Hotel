import React from "react";
import { NavLink } from "react-router-dom";
import AnimalsDetail from "../components/Animals/AnimalDetail";
import CreateBooking from "../components/Bookings/BookingForm";
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
