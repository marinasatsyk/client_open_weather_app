import { Outlet,  Navigate} from 'react-router-dom';
import { useAuth } from 'utils/hook';


const ProtectedRoute = () => {
    const  auth =  useAuth();
   return(
    auth ? <Outlet />  : <Navigate to="/user/connection" replace />
    ) 
};

export default ProtectedRoute;