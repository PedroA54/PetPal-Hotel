import React from "react";
import { Redirect } from "react-router-dom";
import PackageDescription from "../components/Packages/PackageDetail";
import CreateBooking from "../components/Bookings/BookingForm";
import logo from '../photos/crocodile.png';
import './AppointmentPage.css';


function AppointmentPage({ user }) {
    if (user === null) {
        return <Redirect to="/login" />
    }
    return (
        <div className="appointment-page-container">
            <div className="header-container">
                <header>
                    <img src={logo} alt="Logo" className="appointment-logo" /> 
                    <h1 className="appointment-header">Make an Appointment</h1>
                </header>
            </div>
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
