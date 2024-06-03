import React, { useState, useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import AppointmentPage from '../pages/AppointmentPage';
import SignUp from '../components/Customers/SignUp';
import LogIn from '../components/Customers/LogIn';
import ProfilePage from '../pages/ProfilePage';
import EntryPage from '../pages/EntryPage';
import HomePage from '../pages/HomePage';
import NavBar from './NavBar';
import './NavBar.css';
import './App.css';
import Footer from '../components/Footer'

function App() {
    const [user, setUser] = useState();

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
                        <HomePage user={user} />
                    </Route>
                    <Route path="/appointment">
                        <AppointmentPage user={user} />
                    </Route>
                    <Route path="/profile">
                        <ProfilePage user={user} />
                    </Route>
                    <Route path="/signup">
                        <SignUp onLogin={handleLogin} user={user} setUser={setUser} />
                    </Route>
                    <Route path="/login">
                        <LogIn onLogin={handleLogin} user={user} setUser={setUser} />
                    </Route>
                </Switch>
                <Footer />
            </div>
        </Router>
        
    );
}

export default App;


