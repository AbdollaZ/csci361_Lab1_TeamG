import React from 'react';
import './AdminDashboard.css';
import UsersList from './UsersList';
import PendingFarmers from './PendingFarmers';

function AdminDashboard() {
    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <h2>Admin Panel</h2>
                <nav>
                    <ul>
                        <li><a href="#users">All Users</a></li>
                        <li><a href="#pending-farmers">Pending Farmers</a></li>
                        <li><a href="/admin/logout">Logout</a></li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="dashboard-content">
                <section id="users">
                    <h2>Users</h2>
                    <UsersList />
                </section>
                {/* <section id="pending-farmers">
                    <h2>Pending Farmers</h2>
                    <PendingFarmers />
                </section> */}
            </main>
        </div>
    );
}

export default AdminDashboard;
