import React from "react";
import { NavLink } from "react-router-dom";
import CreateBooking from "../components/Bookings/BookingForm";
import PackageDescription from "../components/Packages/PackageDetail";
import { Redirect } from "react-router-dom";


function AppointmentPage({ user }) {
    if (user == null) {
        return <Redirect to="/login" />
    }
    return (
        <>
            <h1>Make an Appointment</h1>
            <CreateBooking />
            <PackageDescription />
        </>
    );
}

export default AppointmentPage;
