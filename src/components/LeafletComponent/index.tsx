import  {MapContainer, 
    MapContainerProps,
     useMap, 
     useMapEvent,
     TileLayer,
     Marker,
     Popup
    } from 'react-leaflet' ;

import "leaflet/dist/leaflet.css"
import { Icon , divIcon, point} from 'leaflet';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import MarkerClusterGroup from 'react-leaflet-cluster';


const {REACT_APP_STUDENT_API_key} = process.env;  
      
const attributionMap = `http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?&opacity=0.9&fill_bound=true&appid=${REACT_APP_STUDENT_API_key}` 
const attributionMap2 = `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${REACT_APP_STUDENT_API_key}` 
const position = [51.505, -0.09]



interface IRadar {lat: number, 
    lon: number
  }
const LeafletMapComponent =  (props: IRadar) => {
   console.log("lat long leaflet", props)
    // const mapEvent = useMapEvent(key, ());
       const markers = [
        {
            geocode: [props.lat, props.lon],
            popUp: "Hello i'm a pop up"
        }
       ]

    const customIcon = new Icon({
        iconUrl: require('../../assets/icons/location.png'),
        iconSize: [35, 35]
    })
    
    // const createCustomClusterIcon = (cluster) => {
    //    return new  divIcon({
    //     html: `<div class = "cluster-icon">${cluster.getChildCount()}</div>`,
    //     className: "custom-marker-cluster"
    //     iconSize: point(33, 33, true)
    //    });
    // }
    return ( 
            
            <MapContainer 
            //@ts-ignore
            center={[props.lat, props.lon]} 
            zoom={3} 
            scrollWheelZoom={false} >
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles courtesy of <a href="http://www.openstreetmap.bzh/" target="_blank">Breton OpenStreetMap Team</a>'
                url= {attributionMap}
               />

              <MarkerClusterGroup
                chunkedLoading
                // iconCreateFunction={createCustomClusterIcon()}
              >
                {markers?.length&&markers.map((marker) => (
                    <Marker 
                    //@ts-ignore
                    position={marker.geocode}
                     //@ts-ignore
                    icon={customIcon}
                    >
                      <Popup><h2>Hello i'm popup</h2></Popup>
                        
                    </Marker>
                ))}
                </MarkerClusterGroup> 
            </MapContainer>
        )
}


export default LeafletMapComponent;