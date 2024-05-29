import React, { useState } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function LogIn({ setUser, user }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName: username, password: password }),
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    setUser(data)
                } else {
                    console.error('Login failed:', data.errors);
                }
            })
            .catch(error => {
                console.error('Error logging in:', error);
            });
    };

    if (user) {
        return <Redirect to="/home" />
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
            <h2>Log In</h2>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Log In</button>
        </form>
    );
}

export default LogIn;

