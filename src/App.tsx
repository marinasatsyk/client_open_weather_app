import   {FC } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import PublicRouter from 'utils/router/PublicRouter';
import './App.css';
import AdminRouter from 'utils/router/AdminRouter';
import Error from 'components/Error';
import RedirectRoute from 'utils/router/RedirectRoute';
import LayoutConnection from 'pages/LayoutConnection';
import AuthComponent from 'components/AuthComponent';
import AuthRouter from 'utils/router/AuthRouter';
import { useAdmin, useAuth } from 'utils/hook';

const  App : FC  = () =>  {
  document.title = "OpenWeahter App";
  const auth = useAuth();
  const isAdmin = useAdmin();

  return(
    <Router>
      <Routes>
        {/**connection part */}
        {/* <Route element = {<RedirectRoute />}>
              <Route element={<LayoutConnection />}>
                  <Route path="/connection"  
                      element={<AuthComponent />} 
                  /> 
              </Route>
        </Route> */}
        <Route path='/connection/*' element={<AuthRouter />}/>
        <Route path='/user/*' element={<PublicRouter />}/>
        <Route path='/admin/*' element={<AdminRouter />}/>
       
        <Route  
            path="/*" 
            element={
            auth&&!isAdmin
            ? <Navigate to= {`/user/current`} replace={true} />
            : <Navigate to="/connection" replace={true} />
            } 
        />
        <Route  
            path="/*" 
            element={
            auth&&isAdmin
            ? <Navigate to= {`/admin/dashboard`} replace={true} />
            : <Navigate to="/connection" replace={true} />
            } 
          />

        <Route path="*" element={<Error codeError="404" />} />
      </Routes>
    </Router>
  )
}
export default App ;
 




