import { Navigate } from 'react-router';
//if token + token valid redirect to dashboard  from Login or SignUp

const RedirectRoute = ({ isAuth, path, children  }) => {
   console.log("=====isAuth", isAuth)
    if (isAuth) {
        return <Navigate to={path} replace />;
    }
    return children;
};

export default RedirectRoute;