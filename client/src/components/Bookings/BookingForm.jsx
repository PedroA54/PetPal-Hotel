import React, { useState } from 'react';

function CreateBooking() {
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [animalId, setAnimalId] = useState('');
    const [packageId, setPackageId] = useState('');

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
                <input
                    type="number"
                    value={animalId}
                    onChange={(e) => setAnimalId(e.target.value)}
                    required
                />
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
        </form>
    );
}

export default CreateBooking;
