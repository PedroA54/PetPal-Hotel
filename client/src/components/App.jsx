import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './HomePage';
import EntryPage from './EntryPage';
import AppointmentPage from './AppointmentPage';
import ProfilePage from './ProfilePage';
import PetPage from './PetPage';
import SignUp from '../components/Customers/SignUp';
import LogIn from '../components/Customers/LogIn';
import LogOut from '../components/Customers/LogOut';


function App() {
    return (
        <Router>
            <div>
                <NavBar />
                <Switch>
                    <Route exact path="/">
                        <EntryPage />
                    </Route>
                    <Route path="/home">
                        <HomePage />
                    </Route>
                    <Route path="/appointment">
                        <AppointmentPage />
                    </Route>
                    <Route path="/profile">
                        <ProfilePage />
                    </Route>
                    <Route path="/pets">
                        <PetPage />
                    </Route>
                    <Route path="/signup">
                        <SignUp />
                    </Route>
                    <Route path="/login">
                        <LogIn />
                    </Route>
                </Switch>
                <LogOut />
            </div>
        </Router>
    );
}

export default App;
