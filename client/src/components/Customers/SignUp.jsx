import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function SignUp() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errors ? errorData.errors.join(', ') : 'Sign Up failed');
            }

            await response.json();
            history.push('/home');
        } catch (error) {
            console.error('Sign Up failed:', error);
            toast.error(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignUp;