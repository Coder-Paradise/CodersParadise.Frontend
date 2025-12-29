import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  let roles = [];
  
  const decoded = auth?.accessToken 
    ? jwtDecode(auth.accessToken)
    : undefined;
    
  if (decoded !== undefined) {
    // Check for the standard .NET ClaimTypes.Role URI
    roles = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].map(Number);
  }
  //Simple check if user is logged in
  //   return auth?.user ? (
  //     <Outlet />
  //   ) : (
  //     <Navigate to="/login" state={{ from: location }} replace />
  //   );

  //Check if user is logged in and if role is found
  return (
    roles.find((role) => allowedRoles?.includes(role)) ? (
      <Outlet />
    ) : auth?.user ? (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    )
  );
};

export default RequireAuth;
