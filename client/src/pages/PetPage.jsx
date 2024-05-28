import React from "react";
import { NavLink } from "react-router-dom";
import AnimalsDetail from "../components/Animals/AnimalDetail";

function PetPage() {
    return (
        <>
            <h1>Hello this is the Pet Page</h1>

            <nav>
            <NavLink to="/home" className="nav-link">
                Home
            </NavLink>
            </nav>
            <AnimalsDetail />
        </>
    );
}

export default PetPage;
