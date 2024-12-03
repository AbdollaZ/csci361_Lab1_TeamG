import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PendingFarmers() {
    const [farmers, setFarmers] = useState([]);

    useEffect(() => {
        fetchPendingFarmers();
    }, []);

    const fetchPendingFarmers = async () => {
        try {
            const response = await axios.get('/admin/pending-farmers');
            setFarmers(response.data);
        } catch (error) {
            console.error("Error fetching pending farmers:", error);
        }
    };

    const approveFarmer = async (farmerId) => {
        await axios.post(`/admin/approve-farmer/${farmerId}`);
        fetchPendingFarmers();
    };

    const rejectFarmer = async (farmerId) => {
        await axios.post(`/admin/reject-farmer/${farmerId}`);
        fetchPendingFarmers();
    };

    return (
        <div className="card mb-4">
            <div className="card-header">Pending Farmer Registrations</div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone Number</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {farmers.map(farmer => (
                                <tr key={farmer.farmer_id}>
                                    <td>{farmer.farmer_id}</td>
                                    <td>{farmer.first_name}</td>
                                    <td>{farmer.last_name}</td>
                                    <td>{farmer.phone_number}</td>
                                    <td>{farmer.email}</td>
                                    <td>
                                        <button onClick={() => approveFarmer(farmer.farmer_id)} className="btn btn-success btn-sm">Approve</button>
                                        <button onClick={() => rejectFarmer(farmer.farmer_id)} className="btn btn-danger btn-sm">Reject</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default PendingFarmers;
