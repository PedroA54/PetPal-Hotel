import React, { useState, useEffect } from 'react';

function AnimalsList() {
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

    const handleDelete = (animalId) => {
        fetch(`/animals/${animalId}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    // Remove the deleted animal from the state
                    setAnimals(animals.filter(animal => animal.id !== animalId));
                    setSelectedAnimal(null); // Clear selected animal
                } else {
                    console.error('Failed to delete animal');
                }
            })
            .catch(error => console.error('Error deleting animal:', error));
    };

    return (
        <div>
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
            {selectedAnimal && (
                <div>
                    <h2>Animal Details</h2>
                    <p><strong>Name:</strong> {selectedAnimal.name}</p>
                    <p><strong>Species:</strong> {selectedAnimal.species}</p>
                    <p><strong>Age:</strong> {selectedAnimal.age}</p>
                    <p><strong>Customer ID:</strong> {selectedAnimal.customer_id}</p>
                    <button onClick={() => handleDelete(selectedAnimal.id)}>Delete</button>
                </div>
            )}
        </div>
    );
}

export default AnimalsList;
