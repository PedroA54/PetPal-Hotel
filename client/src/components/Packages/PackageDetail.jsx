import React, { useState, useEffect } from 'react';

function PackageDetails() {
    const [packages, setPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(null);

    useEffect(() => {
        // Fetch package data from the server
        fetch('http://localhost:5555/packages')
            .then(response => response.json())
            .then(data => setPackages(data))
            .catch(error => console.error('Error fetching package data:', error));
    }, []);

    const handlePackageClick = (pkg) => {
        setSelectedPackage(pkg);
    };

    return (
        <div>
            <h2>Available Packages</h2>
            {packages.length === 0 ? (
                <p>No packages available.</p>
            ) : (
                <ul>
                    {packages.map(pkg => (
                        <li key={pkg.id}>
                            <a href="#" onClick={() => handlePackageClick(pkg)}>{pkg.name}</a>
                        </li>
                    ))}
                </ul>
            )}
            {selectedPackage && (
                <div>
                    <h2>Package Details</h2>
                    <p><strong>Name:</strong> {selectedPackage.name}</p>
                    <p><strong>Description:</strong> {selectedPackage.description}</p>
                    <p><strong>Price per Night:</strong> {selectedPackage.price_per_night}</p>
                </div>
            )}
        </div>
    );
}

export default PackageDetails;
