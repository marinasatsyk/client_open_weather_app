import { Route, Routes, redirect, Navigate } from "react-router-dom";
import { useAdmin, useAuth } from "utils/hook";

import ProtectedRoute from "utils/router/ProtectedPublicRoute";
import RedirectRoute from "utils/router/RedirectRoute";
import { LayoutPublicComponent } from "../../../pages/public/LayoutPublicComponent";
import LayoutConnection from "../../../pages/LayoutConnection";

import {
  ForecastWeatherComponent,
  DetailsCurrentWeatherComponent,
  HistoryWeatherComponent,
  CurrentWeatherComponent,
  ProfileComponent,
} from "../../../pages/public";
import Error from "components/Error";
import AuthComponent from "../../../components/AuthComponent";
import UserEditComponent from "pages/public/Profil-Edit";

function PublicRouter() {
  const auth = useAuth();
  const isAdmin = useAdmin();

  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<LayoutPublicComponent />}>
          <Route index element={<CurrentWeatherComponent />} />
          <Route path={`current`} element={<CurrentWeatherComponent />} />
          <Route path={`forecast`} element={<ForecastWeatherComponent />} />
          <Route
            path={`details-current-weather`}
            element={<DetailsCurrentWeatherComponent />}
          />
          <Route path={`history`} element={<HistoryWeatherComponent />} />

          <Route path={`profile`}>
            <Route path={`show`} element={<ProfileComponent />} />
            <Route path={`edit`} element={<UserEditComponent />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Error codeError="404" />} />
    </Routes>
  );
}

export default PublicRouter;
