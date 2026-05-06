import React from 'react';

const Orders = () => {
  return (
    <div className="admin-table-container">
      <div style={{ padding: '2rem', fontWeight: '800', borderBottom: '1px solid #eee' }}>Order History</div>
      <div style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>
        <p>No orders found yet. Start selling to see them here!</p>
      </div>
    </div>
  );
};

export default Orders;
