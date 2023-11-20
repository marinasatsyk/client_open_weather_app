import { Outlet,  Navigate} from 'react-router-dom';
import { useAuth, useUserId } from 'utils/hook';


const ProtectedRoute = () => {
    console.log("coucou protected route")
    const  auth =  useAuth();
    console.log('========================from protected Route', auth)
   return(
    auth ? <Outlet />  : <Navigate to="/connection" replace />
    ) 
};

export default ProtectedRoute;