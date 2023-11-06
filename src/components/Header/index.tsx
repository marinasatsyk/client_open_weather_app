import React from 'react'
import PropTypes from 'prop-types'

interface someInfo {
    first: string
    second: string
}

function HeaderComponent(props: someInfo | null) {
  return (
    <div>HeaderComponent</div>
  )
}

HeaderComponent.propTypes = {}

export default HeaderComponent
