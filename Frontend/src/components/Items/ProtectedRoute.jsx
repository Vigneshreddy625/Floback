import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../authContext/useAuth";
import LoadingScreen from "./LoadingScreen";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <LoadingScreen />;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;