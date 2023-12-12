import LeafletMapComponent from 'components/LeafletComponent'
import React from 'react'

interface IRadar {lat: number, 
  lon: number
}
function RadarWeatherComponent(props: IRadar) {
  return (
    <div className="wrap-radar-component">
      <div>RadarWeatherComponent</div>
        <LeafletMapComponent lat={props.lat} lon = {props.lon} />
    </div>
  )
}

export default RadarWeatherComponent