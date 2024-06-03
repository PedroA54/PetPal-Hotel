import React from "react";
import { NavLink } from "react-router-dom";
import LogIn from '../components/Customers/LogIn';
import LogOut from '../components/Customers/LogOut';


function EntryPage() {
    return (
        <>
            <h1>This is the entry page</h1>
            
            <section>
                <LogIn />
                <LogOut />
            </section>
            
            <NavLink to="/signup" className="nav-link">
                Sign Up
            </NavLink>
            
            
        </>
    );
}

export default EntryPage;
