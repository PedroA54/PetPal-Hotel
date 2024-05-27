import React from 'react';
import { useHistory } from 'react-router-dom';

function LogOut() {
    const history = useHistory();

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:5555/logout', {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Logout failed');
            }
            history.push('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <button onClick={handleLogout}>Log Out</button>
    );
}

export default LogOut;