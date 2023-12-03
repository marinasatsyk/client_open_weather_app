import React from 'react'
import "./index.scss";

interface iSideMenu{
  isShowSideMenu: boolean
}

export default function SideBarComponent({isShowSideMenu}: iSideMenu) {

  return (

    <div className={`wrap-side-menu ${isShowSideMenu ? 'side-menu-enter side-menu-enter-active' : 'side-menu-exit side-menu-exit-active'}`}>
      <nav>
          <ul className='side-bar-menu'>
              <li>Locations</li>
              <li>Today</li>
              <li>Forecast</li>
              <li>History</li>
          </ul>
      </nav>
    </div>
  )
}
