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


function AdminRouter() {
    const auth = useAuth();
    const admin = useAdmin();
  return (
    <Routes>
        <Route   element={<ProtectedAdminRoute />}>
            <Route  element={<LayoutAdmin/>}>
                <Route  index element={<DashboardAdmin />} />
                <Route  path= {`dashboard`} element={<DashboardAdmin /> }  />
                <Route  path= {`user`}  >
                    <Route  path= {``} element={<UserAdmin/> }  />
                    <Route  path= {`edit/:uid`} element={<UserAdminEdit /> }  />
                    <Route  path= {`new`} element={<UserAdminAdd /> }  />
                </Route>
            </Route>
        </Route>

        {/* <Route  
            path="/" 
            element={
            auth&&admin
            ? <Navigate to= {`/admin/dashboard`} replace={true} />
            : <Navigate to="/connection" replace={true} />
            } 
        /> */}
        <Route path="*" element={<Error codeError="404" />} />
    </Routes>
  )
}

export default AdminRouter