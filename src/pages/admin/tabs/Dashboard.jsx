import React from 'react';

const Dashboard = ({ products }) => {
  return (
    <div className="admin-stats-grid">
      <div className="stat-card">
        <span>total revenue</span>
        <h3>$0</h3>
      </div>
      <div className="stat-card">
        <span>total orders</span>
        <h3>0</h3>
      </div>
      <div className="stat-card">
        <span>total products</span>
        <h3>{products.length}</h3>
      </div>
    </div>
  );
};

export default Dashboard;
