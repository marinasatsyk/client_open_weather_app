// import { Navigate } from 'react-router';
//if token + token valid redirect to dashboard  from Login or SignUp
// import { useAuth } from 'utils/hook';
// import {IRootProps} from 'common/interfaces/auth';


// const RedirectRoute = ({path, children  }:IRootProps) => {
//   const  auth = useAuth();
//   console.log('isAuth from route', auth)
//    return (auth ? children :  <Navigate to={path} replace />)
// };

// export default RedirectRoute;



import { Outlet,  Navigate} from 'react-router-dom';
import { useAdmin, useAuth, useUserId } from 'utils/hook';

const RedirectRoute = () => {
    const  auth =  useAuth();
//     const id = useUserId();
    const admin = useAdmin();
    console.log("❤️admin", admin)
  
    if(auth&&!admin){
     console.log("coucou user")
    return (<Navigate to={`/user/current`} replace />)
   }else if(auth&&admin){
     console.log("coucou admin")
     return (<Navigate to={`/admin/dashboard`} replace />)
   }else{
     return (<Outlet /> )
   }
};

export default RedirectRoute;