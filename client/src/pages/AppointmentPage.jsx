import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import CreateBooking from "../components/Bookings/BookingForm";
import PackageDescription from "../components/Packages/PackageDetail";
import logo from '../photos/crocodile.png';
import './AppointmentPage.css'; // Import the CSS file

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
            <div className="booking-row">
                <section>
                    <CreateBooking />
                </section>
                <section>
                    <PackageDescription />
                </section>
            </div>
        </div>
    );
}

export default AppointmentPage;
