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
import { useSelector } from 'react-redux';
import  { RootState } from "./store";

import './App.css';
import { UseAppSelector, useAuth } from 'utils/hook';

const  App : FC  = () =>  {
  document.title = "OpenWeahter App";
  const sessionClientTokenRaw = JSON.stringify(window.sessionStorage.getItem('token'));
  
  const localClientTokenRaw = JSON.stringify(window.localStorage.getItem('token'));
  let sessionClientToken = "";
  let localClientToken = "";
  try{
    sessionClientToken = sessionClientTokenRaw !== null ? JSON.parse(sessionClientTokenRaw) : null;
    localClientToken = localClientTokenRaw !== null ?  JSON.parse(localClientTokenRaw): null;
  }catch(err){
    console.error('err parsing', err)
  }
  const clientToken = sessionClientToken ? sessionClientToken : localClientToken;
  console.log("clientToken",clientToken)

  // const  user =  useSelector((state: RootState) => state.auth.user);
  const { user } = UseAppSelector((state) => state.auth);
  const auth = useAuth();

  return(
    <Router>
        <Routes>
            {/**redirect route for connection in the case user  connected with remember me */}
               {/* <Route path="/connection"  
                  element={
                      <RedirectRoute  path={`/user/${user.id}/current`}>
                          <AuthComponent />
                      </RedirectRoute>
                  } 
              />   */}
              <Route element = {<RedirectRoute />}>
                  <Route path="/connection"  
                      element={<AuthComponent />} 
                  /> 
              </Route>

              <Route   element={<ProtectedRoute />}> 
                <Route  path= {`/user/${user.id}/current`} element={<MainCurrentWeatherComponent /> }  />
              </Route>

              <Route   element={<ProtectedRoute />}> 
                <Route  path= {`/user/${user.id}/forecast`} element={<ForecastWeatherComponent /> }  />
              </Route>

              <Route   element={<ProtectedRoute />}> 
                <Route  path= {`/user/${user.id}/details-current-weather`} element={<DetailsCurrentWeatherComponent /> }  />
              </Route>


              <Route   element={<ProtectedRoute />}> 
                <Route  path= {`/user/${user.id}/history`} element={<HistoryWeatherComponent /> }  />
              </Route>

              <Route   element={<ProtectedRoute />}> 
                <Route  path= {`/user/${user.id}/profile/show`} element={<ProfileComponent /> }  />
              </Route>

              <Route   element={<ProtectedRoute />}> 
                <Route  path= {`/user/${user.id}/profile/edit`} element={<ProfileComponent /> }  />
              </Route>

              {/* <Route path="/" 
                  element={
                      <RedirectRoute  path={`/connection`}>
                <Route  path= {`/user/${user.id}/current`} element={<MainCurrentWeatherComponent /> }  />
                      </RedirectRoute>
                  } 
              />   */}
              <Route  
                  path="/" 
                  element={
                    auth
                    ? <Navigate to= {`/user/${user.id}/current`} replace={true} />
                    : <Navigate to="/connection" replace={true} />
                    } 
              />

           <Route path="*" element={<Error codeError="404" />} />
        </Routes>
    </Router>
  )
}
export default App ;
 




