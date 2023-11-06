import React from 'react'
import PropTypes from 'prop-types'
import HeaderComponent from '../Header'
import FooterComponent from '../Footer'

interface someInfo {
    first: string
    second: string
}


function MainComponent(props: someInfo | null) {
  return (
    <>
    <HeaderComponent/>
    <div>MainComponent</div>
    <FooterComponent/>
    </>
  )
}

MainComponent.propTypes = {}

export default MainComponent
