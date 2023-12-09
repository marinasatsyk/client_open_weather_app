// import { DashboardCurrentComponent } from 'components/Current'
import {useEffect} from 'react';
import { useAdmin } from 'utils/hook';

//page
 const CurrentWeatherComponent = () => {
  const isAdmin = useAdmin();
 
  if(isAdmin){
    return (<div>Admin component</div>)
  }else{
    return (
      // <DashboardCurrentComponent />
      <div>main current</div>
    )
  }
}



export default CurrentWeatherComponent