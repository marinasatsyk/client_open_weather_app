import { Route, Routes } from "react-router-dom";
import {
  LayoutAdmin,
  DashboardAdmin,
  UserAdmin,
  UserAdminEdit,
  UserAdminAdd,
} from "../../../pages/admin";

import Error from "components/Error";
import ProtectedAdminRoute from "../ProtectedAdminRoute";

function AdminRouter() {
  return (
    <Routes>
      <Route element={<ProtectedAdminRoute />}>
        <Route element={<LayoutAdmin />}>
          <Route index element={<DashboardAdmin />} />
          <Route path={`dashboard`} element={<DashboardAdmin />} />
          <Route path={`user`}>
            <Route path={`:uid`} element={<UserAdmin />} />
            <Route path={`:uid/edit`} element={<UserAdminEdit />} />
            <Route path={`new`} element={<UserAdminAdd />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Error codeError="404" />} />
    </Routes>
  );
}

export default AdminRouter;
