import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function LogIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5555/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName: username, password: password }),
            });
            if (!response.ok) {
                throw new Error('Login failed');
            }
            history.push('/home');
        } catch (error) {
            console.error('Login failed:', error);
            toast.error('Login failed. Please check your username and password.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Log In</h2>
            <div>
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