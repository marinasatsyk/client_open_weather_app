import LeafletMapComponent from "components/LeafletComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import "./index.scss";
import { useMediaQuery } from "react-responsive";

interface IRadar {
  lat: number;
  lon: number;
}
function RadarWeatherComponent(props: IRadar) {
  const isDesktop = useMediaQuery({ minWidth: 768 });

  if (isDesktop) {
    return (
      <div className="wrap-radar-component">
        <div className="side-menu-radar"></div>
        <div className="wrap-leaflet-part">
          <h2>Weather Map</h2>
          <LeafletMapComponent lat={props.lat} lon={props.lon} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="wrap-radar-component">
        <div className="wrap-leaflet-part">
          <div>Precipitations</div>
          <LeafletMapComponent lat={props.lat} lon={props.lon} />
        </div>
      </div>
    );
  }
}

export default RadarWeatherComponent;
