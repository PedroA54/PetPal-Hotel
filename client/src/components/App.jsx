import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from '../pages/HomePage';
import EntryPage from '../pages/EntryPage';
import AppointmentPage from '../pages/AppointmentPage';
import ProfilePage from '../pages/ProfilePage';
import PetPage from '../pages/PetPage';
import AddAnimal from '../components/Animals/AnimalForm';
import SignUp from '../components/Customers/SignUp';
import LogIn from '../components/Customers/LogIn';

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
                    <Route path="/add-animal">
                        <AddAnimal />
                    </Route>
                    <Route path="/signup">
                        <SignUp />
                    </Route>
                    <Route path="/login">
                        <LogIn />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
