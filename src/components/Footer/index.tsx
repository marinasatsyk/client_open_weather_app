import React from 'react'
interface someInfo {
    first: string
    second: string
}

function FooterComponent(props:someInfo | null) {
  return (
    <div>FooterComponent</div>
  )
}

FooterComponent.propTypes = {}
export default FooterComponent;