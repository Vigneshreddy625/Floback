import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../authContext/useAuth"; 
import LoadingScreen from "../../components/Items/LoadingScreen";

const AdminProtectedRoute = ({ requiredRole }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;