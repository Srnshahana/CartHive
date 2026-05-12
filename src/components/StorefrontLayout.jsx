import React from 'react';
import { Outlet } from 'react-router-dom';
import { StoreProvider } from '../context/StoreContext';

const StorefrontLayout = () => {
  return (
    <StoreProvider>
      <Outlet />
    </StoreProvider>
  );
};

export default StorefrontLayout;
