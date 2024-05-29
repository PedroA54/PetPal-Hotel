import React, { useState, useEffect } from 'react';

function BookingDetail() {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedBooking, setEditedBooking] = useState(null);
    const [isSaving, setIsSaving] = useState(false); // State to track save operation

    useEffect(() => {
        fetch('/bookings')
            .then(response => response.json())
            .then(data => setBookings(data))
            .catch(error => console.error('Error fetching booking data:', error));
    }, []);

    useEffect(() => {
        if (isSaving && editedBooking) {
            fetch(`/bookings/${editedBooking.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedBooking),
            })
            .then(response => {
                if (response.ok) {
                    // Update the booking in the state
                    setBookings(prevBookings => prevBookings.map(booking =>
                        booking.id === editedBooking.id ? editedBooking : booking
                    ));
                    setIsEditing(false); // Turn off editing mode
                } else {
                    console.error('Failed to update booking');
                }
                setIsSaving(false); // Reset isSaving state
            })
            .catch(error => {
                console.error('Error updating booking:', error);
                setIsSaving(false); // Reset isSaving state
            });
        }
    }, [isSaving, editedBooking]);

    const handleBookingClick = (booking) => {
        setSelectedBooking(booking);
        setEditedBooking({ ...booking }); // Clone the booking object for editing
        setIsEditing(false); // Ensure editing mode is turned off initially
    };

    const handleDelete = (bookingId) => {
        fetch(`/bookings/${bookingId}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    // Remove the deleted booking from the state
                    setBookings(bookings.filter(booking => booking.id !== bookingId));
                    setSelectedBooking(null); // Clear selected booking
                } else {
                    console.error('Failed to delete booking');
                }
            })
            .catch(error => console.error('Error deleting booking:', error));
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsSaving(true); // Set isSaving to true to trigger PATCH request
    };

    const handleCancelEdit = () => {
        setEditedBooking(null);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedBooking(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div>
            <h2>Bookings List</h2>
            {bookings.length === 0 ? (
                <p>No bookings available.</p>
            ) : (
                <ul>
                    {bookings.map(booking => (
                        <li key={booking.id}>
                            <a href="#" onClick={() => handleBookingClick(booking)}>Booking ID: {booking.id}</a>
                        </li>
                    ))}
                </ul>
            )}
            {selectedBooking && (
                <div>
                    <h2>Booking Details</h2>
                    {isEditing ? (
                        <div>
                            <p><strong>Animal ID:</strong> <input type="text" name="animal_id" value={editedBooking.animal_id} onChange={handleChange} /></p>
                            <p><strong>Package ID:</strong> <input type="text" name="package_id" value={editedBooking.package_id} onChange={handleChange} /></p>
                            <p><strong>Check-in Date:</strong> <input type="text" name="check_in_date" value={editedBooking.check_in_date} onChange={handleChange} /></p>
                            <p><strong>Check-out Date:</strong> <input type="text" name="check_out_date" value={editedBooking.check_out_date} onChange={handleChange} /></p>
                            <button onClick={handleSave}>Save</button>
                            <button onClick={handleCancelEdit}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <p><strong>Animal ID:</strong> {selectedBooking.animal_id}</p>
                            <p><strong>Package ID:</strong> {selectedBooking.package_id}</p>
                            <p><strong>Check-in Date:</strong> {selectedBooking.check_in_date}</p>
                            <p><strong>Check-out Date:</strong> {selectedBooking.check_out_date}</p>
                            <button onClick={handleEdit}>Edit</button>
                            <button onClick={() => handleDelete(selectedBooking.id)}>Delete</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default BookingDetail;
