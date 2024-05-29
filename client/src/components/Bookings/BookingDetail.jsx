import React, { useState, useEffect } from 'react';

function BookingDetail() {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedBooking, setEditedBooking] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/bookings')
            .then(response => response.json())
            .then(data => {
                setBookings(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching booking data:', error);
                setError('Failed to fetch bookings.');
                setLoading(false);
            });
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
            .then(response => response.ok ? response.json() : Promise.reject('Failed to update booking'))
            .then(updatedBooking => {
                setBookings(prevBookings => prevBookings.map(booking =>
                    booking.id === updatedBooking.id ? updatedBooking : booking
                ));
                setIsEditing(false);
                setIsSaving(false);
            })
            .catch(error => {
                console.error('Error updating booking:', error);
                setError('Failed to update booking.');
                setIsSaving(false);
            });
        }
    }, [isSaving, editedBooking]);

    const handleBookingClick = (booking) => {
        setSelectedBooking(booking);
        setEditedBooking({ ...booking });
        setIsEditing(false);
    };

    const handleDelete = (bookingId) => {
        fetch(`/bookings/${bookingId}`, { method: 'DELETE' })
            .then(response => response.ok ? bookingId : Promise.reject('Failed to delete booking'))
            .then(deletedBookingId => {
                setBookings(bookings.filter(booking => booking.id !== deletedBookingId));
                setSelectedBooking(null);
            })
            .catch(error => {
                console.error('Error deleting booking:', error);
                setError('Failed to delete booking.');
            });
    };

    const handleEdit = () => setIsEditing(true);
    const handleSave = () => setIsSaving(true);
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Bookings List</h2>
            {bookings.length === 0 ? (
                <p>No bookings available.</p>
            ) : (
                <ul>
                    {bookings.map(booking => (
                        <li key={booking.id}>
                            <a href="#" onClick={() => handleBookingClick(booking)}>Booking {booking.id}</a>
                        </li>
                    ))}
                </ul>
            )}
            {selectedBooking && (
                <div>
                    <h2>Booking Details</h2>
                    {isEditing ? (
                        <div>
                            <p>
                                <strong>Animal ID:</strong>
                                <input type="text" name="animal_id" value={editedBooking.animal_id} onChange={handleChange} />
                            </p>
                            <p>
                                <strong>Package ID:</strong>
                                <input type="text" name="package_id" value={editedBooking.package_id} onChange={handleChange} />
                            </p>
                            <p>
                                <strong>Check-in Date:</strong>
                                <input type="date" name="check_in_date" value={editedBooking.check_in_date} onChange={handleChange} />
                            </p>
                            <p>
                                <strong>Check-out Date:</strong>
                                <input type="date" name="check_out_date" value={editedBooking.check_out_date} onChange={handleChange} />
                            </p>
                            <button onClick={handleSave} disabled={isSaving}>{isSaving ? 'Saving...' : 'Save'}</button>
                            <button onClick={handleCancelEdit} disabled={isSaving}>Cancel</button>
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
