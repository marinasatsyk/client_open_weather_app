import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

import "./index.scss";

interface iHeaderScrin {
  isShowSideMenu: boolean;
  toggleSideMenu: () => void;
}


export default function HeaderScreen({isShowSideMenu, toggleSideMenu}: iHeaderScrin) {
 
  return (
    <header className='header-screen'>
       <div className="wrap-icons-screen-header">
          <FontAwesomeIcon  icon={icon({name:'bars', style:'solid'})} className="icon" onClick={toggleSideMenu}/>
          <FontAwesomeIcon  icon={icon({name:'house', style:'solid'})} className="icon"/>
       </div>

      <div className="wrap-header">
        <div className='header-block-one'>
            <span>Weather</span>
            <span>Forecast</span>
        </div>
        <div className='header-block-two'>
          <div className='empty flex'></div>
          <div className='third-logo flex'>& history </div>
        </div>
      </div>
      <FontAwesomeIcon  icon={icon({name:'circle-user', style:'solid'})} className="icon"/>
    </header>
  )
}
