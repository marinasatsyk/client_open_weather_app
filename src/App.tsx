import   {FC, useContext, useEffect, useState} from 'react';
import { BrowserRouter as Router,  Route, Routes, Navigate } from 'react-router-dom';
import AuthComponent from './pages/Auth-Page';
import Error from './components/Error';
import RedirectRoute from './router/PrivateRoute';
import ProtectedRoute from './router/ProtectedRoute';
import MainCurrentWeatherComponent from './pages/Main-Current-Weather-Page';
import ForecastWeatherComponent from './pages/Forecast-Page';
import DetailsCurrentWeatherComponent from './pages/Details-Current-Weather-Page';
import HistoryWeatherComponent from './pages/History-Page';
import ProfileComponent from './pages/Profile-Page';
import './App.css';

const  App : FC  = () =>  {
  document.title = "OpenWeahter App";

  const sessionClientTokenRaw = window.sessionStorage.getItem('token');
  const localClientTokenRaw = window.localStorage.getItem('token');
  const sessionClientToken: string | null =  sessionClientTokenRaw !== null ? JSON.parse(sessionClientTokenRaw) : null; ;
  const localclientToken: string | null = localClientTokenRaw !== null ?  JSON.parse(localClientTokenRaw): null;
  const clientToken = sessionClientToken ? sessionClientToken : localclientToken;

  return(
    <Router>
        <Routes>
              <Route path="/user/connection"  
                  element={
                      <RedirectRoute clientToken={clientToken} path={'/user/:id'}>
                          <AuthComponent />
                      </RedirectRoute>
                  } 
              /> 
              <Route path="/user/:id/current"  
                  element={
                    <ProtectedRoute clientToken={clientToken}>
                        <MainCurrentWeatherComponent />
                    </ProtectedRoute>
                  } 
              /> 
              <Route path="/user/:id/forecast"  
                  element={
                    <ProtectedRoute clientToken={clientToken}>
                        <ForecastWeatherComponent />
                    </ProtectedRoute>
                  } 
              /> 
              <Route path="/user/:id/details-current-weather"  
                  element={
                    <ProtectedRoute clientToken={clientToken}>
                        <DetailsCurrentWeatherComponent />
                    </ProtectedRoute>
                  } 
              /> 
              <Route path="/user/:id/history"  
                  element={
                    <ProtectedRoute clientToken={clientToken}>
                        <HistoryWeatherComponent />
                    </ProtectedRoute>
                  } 
              /> 
                <Route  path="/user/:id/profile/show" element={
                      <ProtectedRoute clientToken={clientToken}>
                          <ProfileComponent />
                      </ProtectedRoute>
                 }/>
                <Route  path="/user/:id/profile/edit" element={
                      <ProtectedRoute clientToken={clientToken}>
                          <ProfileComponent />
                      </ProtectedRoute>
                 }/>

                <Route  path="/" element={
                  clientToken 
                  ? <Navigate to="/user/:id/current" replace={true} />
                  : <Navigate to="/user/connection" replace={true} />
                } />
           <Route path="*" element={<Error codeError="404" />} />
        </Routes>
    </Router>
  )
}
export default App ;
 




