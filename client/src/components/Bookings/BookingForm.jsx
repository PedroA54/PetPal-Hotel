import React, { useState, useEffect } from 'react';

function CreateBooking() {
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [animalId, setAnimalId] = useState('');
    const [packageId, setPackageId] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [animals, setAnimals] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('/check_session');
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const fetchAnimals = async () => {
            if (user && user.id) {
                try {
                    const response = await fetch('/animals');
                    if (response.ok) {
                        const data = await response.json();
                        setAnimals(data);
                    }
                } catch (error) {
                    console.error('Error fetching animals:', error);
                }
            }
        };

        fetchAnimals();
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    check_in_date: checkInDate,
                    check_out_date: checkOutDate,
                    animal_id: animalId,
                    package_id: packageId,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create booking');
            }

            const newBooking = await response.json();
            console.log('Booking created:', newBooking);

            // Set the success message
            setSuccessMessage('Booking Successfully Created');

            // Reset the form fields
            setCheckInDate('');
            setCheckOutDate('');
            setAnimalId('');
            setPackageId('');
        } catch (error) {
            console.error('Failed to create booking:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Booking</h2>
            <div>
                <label>Animal Name:</label>
                <select
                    value={animalId}
                    onChange={(e) => setAnimalId(e.target.value)}
                    required
                >
                    <option value="">Select an animal</option>
                    {animals.map((animal) => (
                        <option key={animal.id} value={animal.id}>
                            {animal.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Package Type:</label>
                <select
                    value={packageId}
                    onChange={(e) => setPackageId(e.target.value)}
                    required
                >
                    <option value="">Select Package Type</option>
                    <option value="1">Ultra Package</option>
                    <option value="2">Deluxe Package</option>
                    <option value="3">Diamond Package</option>
                </select>
            </div>
            <div>
                <label>Check-in Date:</label>
                <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Check-out Date:</label>
                <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Create Booking</button>
            {successMessage && <p>{successMessage}</p>}
        </form>
    );
}

export default CreateBooking;