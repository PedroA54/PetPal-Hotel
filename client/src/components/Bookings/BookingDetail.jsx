import React, { useState, useEffect } from 'react';

function BookingDetail() {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);

    useEffect(() => {
        fetch('/bookings')
            .then(response => response.json())
            .then(data => setBookings(data))
            .catch(error => console.error('Error fetching booking data:', error));
    }, []);

    const handleBookingClick = (booking) => {
        setSelectedBooking(booking);
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

    return (
        <div>
            <h2>Bookings List</h2>
            {bookings.length === 0 ? (
                <p>No bookings available.</p>
            ) : (
                <ul>
                    {bookings.map(booking => (
                        <li key={booking.id}>
                            <a href="#" onClick={() => handleBookingClick(booking)}>
                                Booking ID: {booking.id}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
            {selectedBooking && (
                <div>
                    <h2>Booking Details</h2>
                    <p><strong>Animal ID:</strong> {selectedBooking.animal_id}</p>
                    <p><strong>Package ID:</strong> {selectedBooking.package_id}</p>
                    <p><strong>Check-in Date:</strong> {selectedBooking.check_in_date}</p>
                    <p><strong>Check-out Date:</strong> {selectedBooking.check_out_date}</p>
                    <button onClick={() => handleDelete(selectedBooking.id)}>Delete</button>
                </div>
            )}
        </div>
    );
}

export default BookingDetail;
