import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

import "./index.scss";
import { useState } from 'react';
import { SearchCityComponent } from 'components/SearchCity';
import { Link } from 'react-router-dom';

interface iSideMenu{
  isShowSideMenu: boolean
}

export default function SideBarComponent({isShowSideMenu}: iSideMenu) {
  const [isShowSideSubMenu, setIsShowSideSubMenu] = useState(false);

  const toggleSubMenu = () => {
    console.log("click")
    setIsShowSideSubMenu(!isShowSideSubMenu)
  }


  return (
    <>    
        
        {
        !isShowSideSubMenu&&<div className={`wrap-side-menu ${isShowSideMenu ? 'side-menu-enter side-menu-enter-active' : 'side-menu-exit side-menu-exit-active'}`}>
            <nav>
                <ul className='side-bar-menu'>
                    <li onClick={()=>toggleSubMenu()}>
                      <span>Locations</span>
                      <FontAwesomeIcon  icon={icon({name:'sort-up', style:'solid'})} rotation={90} className="icon-rotation" />
                      </li>
                    <li><Link to={"current"}>Today</Link></li>
                    <li><Link to={"forecast"}>Forecast</Link></li>
                    <li><Link to={"history"}>History</Link></li>
                </ul>
            </nav>
          </div>
        }
        { 
          isShowSideSubMenu&&
          <div className={`wrap-side-menu ${isShowSideMenu ? 'side-menu-enter side-menu-enter-active' : 'side-menu-exit side-menu-exit-active'}`} title='back'>
                <div className='back-btn' onClick={()=>toggleSubMenu()}>
                  <span className='title-back'>Locations</span>
                  <FontAwesomeIcon  icon={icon({name:'sort-up', style:'solid'})} rotation={270} className="icon-rotation-back" />
                </div>
                <SearchCityComponent />
            </div>
          }
    </>
  )
}
