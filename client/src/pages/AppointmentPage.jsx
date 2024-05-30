import React from "react";
import { NavLink } from "react-router-dom";
import CreateBooking from "../components/Bookings/BookingForm";
import PackageDescription from "../components/Packages/PackageDetail";
import { Redirect } from "react-router-dom";
import logo from '../photos/crocodile.png';  


function AppointmentPage({ user }) {
    if (user === null) {
        return <Redirect to="/login" />
    }
    return (
        <div className="appointment-page-container">
            <header>
                <img src={logo} alt="Logo" className="appointment-logo" /> 
                <h1>Make an Appointment</h1>
            </header>
            <section>
                <CreateBooking />
            </section>
            <section>
                <PackageDescription />
            </section>
        </div>
    );
}

export default AppointmentPage;