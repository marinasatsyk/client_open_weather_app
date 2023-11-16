import { Navigate } from 'react-router';
//if token + token valid redirect to dashboard  from Login or SignUp
import { useAuth } from 'utils/hook';
import {IRootProps} from 'common/interfaces/auth';


const RedirectRoute = ({path, children  }:IRootProps) => {
  const  auth = useAuth();
  console.log('isAuth from route', auth)
   return (auth ? children :  <Navigate to={path} replace />)
};

export default RedirectRoute;