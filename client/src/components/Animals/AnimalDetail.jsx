import React, { useState, useEffect } from 'react';

function AnimalsDetail() {
    const [animals, setAnimals] = useState([]);

    useEffect(() => {
        // Fetch animal data from the server
        fetch('http://localhost:5555/animals')
            .then(response => response.json())
            .then(data => setAnimals(data))
            .catch(error => console.error('Error fetching animal data:', error));
    }, []);

    return (
        <div>
            <h2>Animals List</h2>
            {animals.length === 0 ? (
                <p>No animals available.</p>
            ) : (
                <ul>
                    {animals.map(animal => (
                        <li key={animal.id}>
                            <p><strong>Name:</strong> {animal.name}</p>
                            <p><strong>Species:</strong> {animal.species}</p>
                            <p><strong>Age:</strong> {animal.age}</p>
                            <p><strong>Customer ID:</strong> {animal.customer_id}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AnimalsDetail;
