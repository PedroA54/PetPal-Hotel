import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function AddAnimal() {
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [age, setAge] = useState('');
    const [customerId, setCustomerId] = useState(''); // If needed
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5555/animals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    species: species,
                    age: age,
                    customer_id: customerId, // Include customerId if needed
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add animal');
            }

            const newAnimal = await response.json();
            console.log('Animal added:', newAnimal);

            // Navigate to the desired route after successful submission
            history.push('/home');
        } catch (error) {
            console.error('Failed to add animal:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Animal</h2>
            <div>
                <label>Name:</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Species:</label>
                <input 
                    type="text" 
                    value={species} 
                    onChange={(e) => setSpecies(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Age:</label>
                <input 
                    type="number" 
                    value={age} 
                    onChange={(e) => setAge(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Customer ID:</label>
                <input 
                    type="text" 
                    value={customerId} 
                    onChange={(e) => setCustomerId(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit">Add Animal</button>
        </form>
    );
}

export default AddAnimal;
