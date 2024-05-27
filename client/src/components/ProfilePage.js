import React from "react";
import { NavLink } from "react-router-dom";


function ProfilePage() {
    return (
        <>
            <h1>This is the Profile Page</h1>
            <nav>
            <NavLink to="/home" className="nav-link">
                Home
            </NavLink>
            </nav>
        </>
    );
}

export default ProfilePage;
