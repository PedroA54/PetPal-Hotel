import React from "react";

import CreateBooking from "../components/Bookings/BookingForm";
import PackageDescription from "../components/Packages/PackageDetail";
import { Redirect } from "react-router-dom";


function AppointmentPage({ user }) {
    if (user === null) {
        return <Redirect to="/login" />
    }
    return (
        <>
        <h1>Make an Appointment</h1>
        <div className="appointment-page-container">
            
            <section className="create-booking-section">
            <CreateBooking />
            </section>
            <section className="package-detail-section">
            <PackageDescription />
            </section>
            </div>
        </>
    );
}

export default AppointmentPage;
