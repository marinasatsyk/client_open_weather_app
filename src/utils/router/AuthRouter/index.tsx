import {  Navigate,  Route, Routes} from 'react-router-dom';
import { useAdmin, useAuth } from 'utils/hook';
import {LayoutAdmin, 
        DashboardAdmin, 
        UserAdmin, 
        UserAdminEdit, 
        UserAdminAdd} from '../../../pages/admin';

import Error from 'components/Error';
import ProtectedRoute from '../ProtectedPublicRoute';
import ProtectedAdminRoute from '../ProtectedAdminRoute';
import RedirectRoute from '../RedirectRoute';
import LayoutConnection from 'pages/LayoutConnection';
import AuthComponent from 'components/AuthComponent';


function AuthRouter() {
  return (
    <Routes>
        <Route element = {<RedirectRoute />}>
              <Route element={<LayoutConnection />}>
                  <Route index element={<AuthComponent />} />
                  <Route 
                        path="/connection"  
                        element={<AuthComponent />} 
                  /> 
              </Route>
        </Route>

        <Route path="*" element={<Error codeError="404" />} />
    </Routes>
  )
}

export default AuthRouter