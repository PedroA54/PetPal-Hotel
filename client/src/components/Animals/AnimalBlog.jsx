
import React, { useState, useEffect } from 'react';

function AnimalList() {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/animals')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setAnimals(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Animal List</h1>
            <ul>
                {animals.map(animal => (
                    <li key={animal.id}>
                        {animal.name} ({animal.species}), Age: {animal.age}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AnimalList;






