import { DashboardCurrentComponent } from 'components/Current'
import {useEffect} from 'react';
import { useAdmin } from 'utils/hook';

//page
 const MainCurrentWeatherComponent = () => {
  const isAdmin = useAdmin();
 
  if(isAdmin){
    return (<div>Admin component</div>)
  }else{
    return (
      <DashboardCurrentComponent />
    )
  }
}



export default MainCurrentWeatherComponent