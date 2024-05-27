import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './HomePage';
import EntryPage from './EntryPage';
import AppointmentPage from './AppointmentPage';

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
                </Switch>
            </div>
        </Router>
    );
}

export default App;
