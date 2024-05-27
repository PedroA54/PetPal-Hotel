import React from "react";
import { NavLink } from "react-router-dom";

function PetPage() {
    return (
        <>
            <h1>Hello this is the pet page</h1>

            <nav>
            <NavLink to="/home" className="nav-link">
                Home
            </NavLink>
            </nav>
        </>
    );
}

export default PetPage;
