import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './HomePage';
import EntryPage from './EntryPage';
import AppointmentPage from './AppointmentPage';
import ProfilePage from './ProfilePage';
import PetPage from './PetPage';

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
                </Switch>
            </div>
        </Router>
    );
}

export default App;
