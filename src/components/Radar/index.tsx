import LeafletMapComponent from "components/LeafletComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import "./index.scss";

interface IRadar {
  lat: number;
  lon: number;
}
function RadarWeatherComponent(props: IRadar) {
  return (
    <div className="wrap-radar-component">
      <div className="side-menu-radar"></div>
      <div className="wrap-leaflet-part">
        <h2>Weather Map</h2>
        <LeafletMapComponent lat={props.lat} lon={props.lon} />
      </div>
    </div>
  );
}

export default RadarWeatherComponent;
