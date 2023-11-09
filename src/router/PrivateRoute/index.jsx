import { Navigate } from 'react-router';
//if token + token valid redirect to dashboard  from Login or SignUp

const RedirectRoute = ({ clientToken, path, children  }) => {
    if (clientToken) {
        return <Navigate to={path} replace />;
    }
    return children;
};

export default RedirectRoute;