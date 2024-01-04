import { FC } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import PublicRouter from "utils/router/PublicRouter";

import AdminRouter from "utils/router/AdminRouter";
import Error from "components/Error";
import LayoutConnection from "pages/LayoutConnection";
import AuthRouter from "utils/router/AuthRouter";
import { useAdmin, useAuth } from "utils/hook";
import ForgotPasswordComponent from "pages/public/Forgot-Password";
import ResetPasswordComponent from "pages/public/Reset-Password";

const App: FC = () => {
  const auth = useAuth();
  const isAdmin = useAdmin();

  return (
    <Router>
      <Routes>
        <Route path="/connection/*" element={<AuthRouter />} />
        <Route path="/user/*" element={<PublicRouter />} />
        <Route path="/admin/*" element={<AdminRouter />} />

        <Route element={<LayoutConnection />}>
          <Route path="/forgot/*" element={<ForgotPasswordComponent />} />
          <Route
            path="/reset/password/:passwordResetToken"
            element={<ResetPasswordComponent />}
          />
        </Route>

        <Route
          path="/*"
          element={
            auth && !isAdmin ? (
              <Navigate to={`/user/current`} replace={true} />
            ) : (
              <Navigate to="/connection" replace={true} />
            )
          }
        />
        <Route
          path="/*"
          element={
            auth && isAdmin ? (
              <Navigate to={`/admin/dashboard`} replace={true} />
            ) : (
              <Navigate to="/connection" replace={true} />
            )
          }
        />

        <Route path="*" element={<Error codeError="404" />} />
      </Routes>
    </Router>
  );
};
export default App;
