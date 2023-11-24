import   {FC } from 'react';
import { BrowserRouter as Router,  Route, Routes, redirect, Navigate } from 'react-router-dom';
import AuthComponent from './pages/Auth-Page';
import Error from './components/Error';
import RedirectRoute from './utils/router/RedirectRoute';
import ProtectedRoute from './utils/router/ProtectedRoute';
import MainCurrentWeatherComponent from './pages/Main-Current-Weather-Page';
import ForecastWeatherComponent from './pages/Forecast-Page';
import DetailsCurrentWeatherComponent from './pages/Details-Current-Weather-Page';
import HistoryWeatherComponent from './pages/History-Page';
import ProfileComponent from './pages/Profile-Page';
import {  useAuth } from 'utils/hook';
import './App.css';
import { SearchCityComponent } from 'components/SearchCity';

const  App : FC  = () =>  {
  document.title = "OpenWeahter App";
  const auth = useAuth();
  return(
    <Router>
        <Routes>
              <Route element = {<RedirectRoute />}>
                  <Route path="/connection"  
                      element={<AuthComponent />} 
                  /> 
              </Route>

              <Route   element={<ProtectedRoute />}> 
                <Route  path= {`/user/current`} element={<MainCurrentWeatherComponent /> }  />
                {/* <Route  path= {`/user/:userId/search`} element={<MainCurrentWeatherComponent /> }  />
                <Route  path= {`/user/:userId/forecast`} element={<SearchCityComponent/> }  /> */}
              </Route>

              <Route   element={<ProtectedRoute />}> 
                <Route  path= {`/user/search-city`} element={<SearchCityComponent /> }  />
              </Route>

              <Route   element={<ProtectedRoute />}> 
                <Route  path= {`/user/forecast`} element={<ForecastWeatherComponent /> }  />
              </Route>

              <Route   element={<ProtectedRoute />}> 
                <Route  path= {`/user/details-current-weather`} element={<DetailsCurrentWeatherComponent /> }  />
              </Route>


              <Route   element={<ProtectedRoute />}> 
                <Route  path= {`/user/history`} element={<HistoryWeatherComponent /> }  />
              </Route>

              <Route   element={<ProtectedRoute />}> 
                <Route  path= {`/user/profile/show`} element={<ProfileComponent /> }  />
              </Route>

              <Route   element={<ProtectedRoute />}> 
                <Route  path= {`/user/profile/edit`} element={<ProfileComponent /> }  />
              </Route>

              <Route  
                  path="/" 
                  element={
                    auth
                    ? <Navigate to= {`/user/current`} replace={true} />
                    : <Navigate to="/connection" replace={true} />
                    } 
              />

           <Route path="*" element={<Error codeError="404" />} />
        </Routes>
    </Router>
  )
}
export default App ;
 




