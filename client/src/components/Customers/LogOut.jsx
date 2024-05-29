// import React from 'react';
// import { useHistory } from 'react-router-dom';
// import { toast } from 'react-hot-toast';

// function LogOut({ setUser, user }) {
//     const history = useHistory();

//     const handleLogout = async () => {
//         try {
//             const response = await fetch('/logout', {
//                 method: 'DELETE',
//             });
//             if (!response.ok) {
//                 throw new Error('Logout failed');
//             }
//             history.push('/');
//         } catch (error) {
//             console.error('Logout failed:', error);
//             toast.error('Logout failed. Please try again later.');
//         }
//     };

//     return (
//         <button onClick={handleLogout}>Log Out</button>
//     );
// }

// export default LogOut;

import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function LogOut({ setUser }) {
    const [loggedOut, setLoggedOut] = useState(false);

    const handleLogout = async () => {
        try {
            const response = await fetch('/logout', {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Logout failed');
            }
            setUser(null); // Clear the user state
            setLoggedOut(true); // Trigger redirect
        } catch (error) {
            console.error('Logout failed:', error);
            toast.error('Logout failed. Please try again later.');
        }
    };

    if (loggedOut) {
        return <Redirect to="/entry" />;
    }

    return (
        <button onClick={handleLogout}>Log Out</button>
    );
}

export default LogOut;