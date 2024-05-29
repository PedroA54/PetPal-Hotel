import React from "react";
import CreateBooking from "../components/Bookings/BookingForm";
import PackageDescription from "../components/Packages/PackageDetail";


function AppointmentPage() {
    return (
        <>
            <h1>Make an Appointment</h1>
            <CreateBooking />
            <PackageDescription />
        </>
    );
}

export default AppointmentPage;
