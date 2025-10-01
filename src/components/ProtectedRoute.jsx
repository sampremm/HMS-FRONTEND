import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roles = [] }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length && !roles.includes(role)) {
    return <div className="p-8 text-red-600 font-bold">Access Denied: You do not have permission</div>;
  }

  return children;
};

export default ProtectedRoute;
