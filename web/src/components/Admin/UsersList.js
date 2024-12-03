import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import api from '../../services/api'; // Axios instance to make API calls

function UsersList() {
    const [farmers, setFarmers] = useState([]);
    const [buyers, setBuyers] = useState([]);

    useEffect(() => {
        fetchFarmers();
        fetchBuyers();
    }, []);

    const fetchFarmers = async () => {
        try {
            const response = await api.get('/farmers');
            setFarmers(response.data);
        } catch (error) {
            console.error('Error fetching farmers:', error);
        }
    };

    const fetchBuyers = async () => {
        try {
            const response = await api.get('/buyers');
            setBuyers(response.data);
        } catch (error) {
            console.error('Error fetching buyers:', error);
        }
    };

    // Approve a farmer (set is_approved to true)
    const approveFarmer = async (id) => {
        try {
            await api.put(`/farmers/approve/${id}`);
            fetchFarmers(); // Refresh the farmers list after approval
        } catch (error) {
            console.error('Error approving farmer:', error);
        }
    };

    // Reject a farmer (set is_approved to false)
    const rejectFarmer = async (id) => {
        try {
            await api.put(`/farmers/reject/${id}`);
            fetchFarmers(); // Refresh the farmers list after rejection
        } catch (error) {
            console.error('Error rejecting farmer:', error);
        }
    };

    // Delete a user (farmer or buyer)
    const deleteUser = async (id, userType) => {
        try {
            await api.delete(`/${userType}/${id}`);
            userType === 'farmers' ? fetchFarmers() : fetchBuyers(); // Refresh respective list
        } catch (error) {
            console.error(`Error deleting ${userType}:`, error);
        }
    };

    // Edit any user (farmer or buyer)
    const editUser = async (id, updatedUser, userType) => {
        try {
            await api.put(`/users/${id}`, updatedUser);
            fetchFarmers();
            fetchBuyers();
        } catch (error) {
            console.error('Error editing user:', error);
        }
    };

    // Columns for Farmers table (includes approval/rejection actions and edit/delete)
    const farmerColumns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'phone', headerName: 'Phone', width: 150 },
        {
            field: 'is_approved',
            headerName: 'Approved',
            width: 150,
            renderCell: (params) => (params.value ? 'Yes' : 'No'),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 300,
            renderCell: (params) => (
                <>
                    {!params.row.is_approved && (
                        <button
                            className="btn-approve"
                            onClick={() => approveFarmer(params.row.id)} // Approve farmer
                        >
                            Approve
                        </button>
                    )}
                    <button
                        className="btn-reject"
                        onClick={() => rejectFarmer(params.row.id)} // Reject the farmer
                    >
                        Reject
                    </button>
                    <button
                        className="btn-delete"
                        onClick={() => deleteUser(params.row.id, 'farmers')} // Delete the farmer
                    >
                        Delete
                    </button>
                    <button
                        className="btn-edit"
                        onClick={() => {
                            const updatedUser = {
                                name: prompt('Enter new name:', params.row.name),
                                email: prompt('Enter new email:', params.row.email),
                                phone: prompt('Enter new phone:', params.row.phone),
                            };
                            if (updatedUser.name && updatedUser.email && updatedUser.phone) {
                                editUser(params.row.id, updatedUser, 'farmers');
                            }
                        }}
                    >
                        Edit
                    </button>
                </>
            ),
        },
    ];

    // Columns for Buyers table (includes edit and delete actions)
    const buyerColumns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'phone', headerName: 'Phone', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <>
                    <button
                        className="btn-edit"
                        onClick={() => {
                            const updatedUser = {
                                name: prompt('Enter new name:', params.row.name),
                                email: prompt('Enter new email:', params.row.email),
                                phone: prompt('Enter new phone:', params.row.phone),
                            };
                            if (updatedUser.name && updatedUser.email && updatedUser.phone) {
                                editUser(params.row.id, updatedUser, 'buyers');
                            }
                        }}
                    >
                        Edit
                    </button>
                    <button
                        className="btn-delete"
                        onClick={() => deleteUser(params.row.id, 'buyers')} // Delete the buyer
                    >
                        Delete
                    </button>
                </>
            ),
        },
    ];

    return (
        <div style={{ height: 500, width: '100%' }}>
            <h2>Pending farmers</h2>
            <div style={{ marginBottom: '20px' }}>
                <DataGrid
                    rows={farmers}
                    columns={farmerColumns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    disableSelectionOnClick
                />
            </div>
            <h2>Buyers</h2>
            <DataGrid
                rows={buyers}
                columns={buyerColumns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                disableSelectionOnClick
            />
        </div>
    );
}

export default UsersList;
