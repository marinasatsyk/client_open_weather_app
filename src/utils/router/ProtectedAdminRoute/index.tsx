import { Outlet,  Navigate, useLocation} from 'react-router-dom';
import { useAdmin, useAuth } from 'utils/hook';


const ProtectedAdminRoute = () => {
    const  auth =  useAuth();
    const isAdmin = useAdmin();
    const location = useLocation();

    console.log('========================from protected Admin Route', auth)
   return(
        auth&&isAdmin ? <Outlet />  : <Navigate to="/connection" state={{from: location}} replace />
    ) 
};

export default ProtectedAdminRoute;