import React, { useState, useEffect } from 'react';

function AnimalHome() {
    const [animals, setAnimals] = useState([]);
    const [selectedAnimal, setSelectedAnimal] = useState(null);

    useEffect(() => {
        fetch('/animals')
            .then(response => response.json())
            .then(data => setAnimals(data))
            .catch(error => console.error('Error fetching animal data:', error));
    }, []);

    const handleAnimalClick = (animal) => {
        setSelectedAnimal(animal);
    };

    return (
<div className="package-container">
    <h2>Animals List</h2>
    {animals.length === 0 ? (
        <p>No animals available.</p>
    ) : (
        <ul>
            {animals.map(animal => (
                <li key={animal.id}>
                    <a href="#" onClick={() => handleAnimalClick(animal)}>{animal.name}</a>
                </li>
            ))}
        </ul>
    )}
</div>
);
}

export default AnimalHome;