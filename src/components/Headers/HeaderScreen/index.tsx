

import React from 'react'
import "./index.scss";


export default function HeaderScreen() {
  return (
    <header className='header-screen'>
      <div className="wrap-header">
        <div className='header-block-one'>
            <span>Weather</span>
            <span>Forecast</span></div>
        <div className='header-block-two'>
          <div className='empty flex'></div>
          <div className='third-logo flex'>& history </div>
        </div>
      </div>
    </header>
  )
}
