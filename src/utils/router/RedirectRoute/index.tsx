import { Outlet, Navigate } from "react-router-dom";
import { useAdmin, useAuth, useUserId } from "utils/hook";

const RedirectRoute = () => {
  const auth = useAuth();
  const admin = useAdmin();
  if (auth && !admin) {
    return <Navigate to={`/user/current`} />;
  } else if (auth && admin) {
    return <Navigate to={`/admin/dashboard`} />;
  } else {
    return <Outlet />;
  }
};

export default RedirectRoute;
