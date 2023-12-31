import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "utils/router/ProtectedPublicRoute";
import { LayoutPublicComponent } from "../../../pages/public/LayoutPublicComponent";

import {
  ForecastWeatherComponent,
  DetailsCurrentWeatherComponent,
  HistoryWeatherComponent,
  CurrentWeatherComponent,
  ProfileComponent,
} from "../../../pages/public";
import Error from "components/Error";
import UserEditComponent from "pages/public/Profil-Edit";

function PublicRouter() {
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
