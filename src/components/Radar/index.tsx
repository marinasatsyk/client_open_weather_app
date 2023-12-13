import LeafletMapComponent from "components/LeafletComponent";
import "./index.scss";

interface IRadar {
  lat: number;
  lon: number;
}
function RadarWeatherComponent(props: IRadar) {
  return (
    <div className="wrap-radar-component">
      <h2>Weather Map</h2>
      <LeafletMapComponent lat={props.lat} lon={props.lon} />
    </div>
  );
}

export default RadarWeatherComponent;
