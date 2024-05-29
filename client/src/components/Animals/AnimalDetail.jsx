import React, { useState, useEffect } from 'react';

function AnimalsList() {
    const [animals, setAnimals] = useState([]);
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedAnimal, setEditedAnimal] = useState(null);
    const [isSaving, setIsSaving] = useState(false); // State to track save operation
    const [isLoggedIn, setIsLoggedIn] = useState(true); // State to track login status

    useEffect(() => {
        fetch('/check_session')
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setIsLoggedIn(false);
                } else {
                    setIsLoggedIn(true);
                }
            })
            .catch(error => console.error('Error checking session:', error));
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            fetch('/animals')
                .then(response => response.json())
                .then(data => setAnimals(data))
                .catch(error => console.error('Error fetching animal data:', error));
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (isSaving && editedAnimal) {
            fetch(`/animals/${editedAnimal.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedAnimal),
            })
            .then(response => {
                if (response.ok) {
                    // Update the animal in the state
                    setAnimals(prevAnimals => prevAnimals.map(animal =>
                        animal.id === editedAnimal.id ? editedAnimal : animal
                    ));
                    setIsEditing(false); // Turn off editing mode
                } else {
                    console.error('Failed to update animal');
                }
                setIsSaving(false); // Reset isSaving state
            })
            .catch(error => {
                console.error('Error updating animal:', error);
                setIsSaving(false); // Reset isSaving state
            });
        }
    }, [isSaving, editedAnimal]);

    const handleAnimalClick = (animal) => {
        setSelectedAnimal(animal);
        setEditedAnimal({ ...animal }); // Clone the animal object for editing
        setIsEditing(false); // Ensure editing mode is turned off initially
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

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsSaving(true); // Set isSaving to true to trigger PATCH request
    };

    const handleCancelEdit = () => {
        setEditedAnimal(null);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedAnimal(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    if (!isLoggedIn) {
        return <p>You must be logged in to view this content.</p>;
    }

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
                    {isEditing ? (
                        <div>
                            <p><strong>Name:</strong> <input type="text" name="name" value={editedAnimal.name} onChange={handleChange} /></p>
                            <p><strong>Species:</strong> <input type="text" name="species" value={editedAnimal.species} onChange={handleChange} /></p>
                            <p><strong>Age:</strong> <input type="text" name="age" value={editedAnimal.age} onChange={handleChange} /></p>
                            <p><strong>Customer ID:</strong> <input type="text" name="customer_id" value={editedAnimal.customer_id} onChange={handleChange} /></p>
                            <button onClick={handleSave}>Save</button>
                            <button onClick={handleCancelEdit}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <p><strong>Name:</strong> {selectedAnimal.name}</p>
                            <p><strong>Species:</strong> {selectedAnimal.species}</p>
                            <p><strong>Age:</strong> {selectedAnimal.age}</p>
                            <p><strong>Customer ID:</strong> {selectedAnimal.customer_id}</p>
                            <button onClick={handleEdit}>Edit</button>
                            <button onClick={() => handleDelete(selectedAnimal.id)}>Delete</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default AnimalsList;

