import React, { useState, useEffect } from 'react';
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
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('/check_session', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    setUser(data);
                }
            })
            .catch(error => {
                console.error('Error checking session:', error);
            });
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        fetch('/logout', {
            method: 'DELETE',
            credentials: 'include'
        })
            .then(response => {
                if (response.ok) {
                    setUser(null);
                }
            });
    };

    return (
        <Router>
            <div>
                <NavBar user={user} onLogout={handleLogout} />
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
                        <SignUp onLogin={handleLogin} />
                    </Route>
                    <Route path="/login">
                        <LogIn onLogin={handleLogin} user={user} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;

