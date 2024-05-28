import React from "react";
import { NavLink } from "react-router-dom";
import CreateBooking from "../components/Bookings/BookingForm";
import PackageDescription from "../components/Packages/PackageDetail";


function AppointmentPage() {
    return (
        <>
            <h1>This is the Appointment Page</h1>
            <nav>
            <NavLink to="/home" className="nav-link">
                Home
            </NavLink>
            </nav>
            <CreateBooking />
            <PackageDescription />
        </>
    );
}

export default AppointmentPage;
