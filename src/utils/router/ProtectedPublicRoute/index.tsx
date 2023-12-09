import { Outlet,  Navigate, useLocation} from 'react-router-dom';
import { useAdmin, useAuth, useUserId } from 'utils/hook';


const ProtectedRoute = () => {
    console.log("coucou protected route")
    const  auth =  useAuth();
    const isAdmin = useAdmin();
    const location = useLocation();

    console.log('========================from protected Route', auth)
   return(
    auth&&!isAdmin ? <Outlet />  : <Navigate to="/connection" state={{from: location}} replace />
    ) 
};

export default ProtectedRoute;