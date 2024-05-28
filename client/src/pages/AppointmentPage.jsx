import React from "react";
import { NavLink } from "react-router-dom";

function AppointmentPage() {
    return (
        <>
            <h1>This is the Appointment Page</h1>
            <nav>
            <NavLink to="/home" className="nav-link">
                Home
            </NavLink>
            </nav>
        </>
    );
}

export default AppointmentPage;
