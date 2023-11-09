/* eslint-disable react/prop-types */
import { Navigate } from 'react-router';

const ProtectedRoute = ({ clientToken, children }) => {
    if (!clientToken) {
        return <Navigate to="/user/login" replace />;
    }
    return children;
};

export default ProtectedRoute;