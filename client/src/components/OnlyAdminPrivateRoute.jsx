import { current } from '@reduxjs/toolkit';
import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate} from 'react-router-dom';
// outlet used to render nested routes or child routes
export default function PrivateRoute() {
    const { currentUser } = useSelector(state => state.user);
  return currentUser && currentUser.isAdmin ? <Outlet /> : <Navigate to="/sign-in" />;
}
