/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Outlet,  Navigate} from 'react-router-dom';
import { ProtectedRouteProps } from 'common/interfaces/route';

//types protected routes props

const ProtectedRoute = ({ clientToken,  isRemeberme = false, children }: ProtectedRouteProps) => {
    const  isAuth =  useSelector((state: RootState) => state.auth.isAuth);
    
    if (!isAuth) {
        return <Navigate to="/user/connection" replace />;
    }
    //return <>{children}</>;
     return <Outlet />
    
};

export default ProtectedRoute;