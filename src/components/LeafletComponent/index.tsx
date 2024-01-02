import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { UseAppSelector } from "utils/hook";
import "./index.scss";

const { REACT_APP_STUDENT_API_FREE_key } = process.env;
//the payd version:
//const attributionMap = `http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?&opacity=0.6&fill_bound=true&appid=${REACT_APP_STUDENT_API_key}`;
//the free version:
const attributionMap = `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${REACT_APP_STUDENT_API_FREE_key}`;
interface IRadar {
  lat: number;
  lon: number;
}
const LeafletMapComponent = (props: IRadar) => {
  const { bookmarks } = UseAppSelector((state) => state.auth.user);

  const getActiveBookmark = () => {
    if (
      bookmarks?.length > 0 &&
      bookmarks.some((bookmark) => bookmark.isActive)
    ) {
      return bookmarks.filter((bookmark) => bookmark.isActive)[0];
    } else {
      return null;
    }
  };

  const activeBookmark = getActiveBookmark();

  const markers = [
    {
      geocode: activeBookmark
        ? [activeBookmark.city.lat, activeBookmark.city.lon]
        : [props.lat, props.lon],
      popUp: activeBookmark ? activeBookmark.city.name : "City",
    },
  ];
  const customIcon = new Icon({
    iconUrl: require("../../assets/icons/location.png"),
    iconSize: [35, 35],
  });

  return (
    <MapContainer
      //@ts-ignore
      center={
        activeBookmark
          ? [activeBookmark.city.lat, activeBookmark.city.lon]
          : [props.lat, props.lon]
      }
      zoom={3}
      scrollWheelZoom={false}
    >
      <CenterMap
        coords={
          activeBookmark
            ? [activeBookmark.city.lat, activeBookmark.city.lon]
            : [props.lat, props.lon]
        }
      />
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <TileLayer attribution="© OpenStreetMap" url={attributionMap} />
      <MarkerClusterGroup
        chunkedLoading
        // iconCreateFunction={createCustomClusterIcon()}
      >
        {markers?.length &&
          markers.map((marker, index) => (
            <Marker
              //@ts-ignore
              position={marker.geocode}
              //@ts-ignore
              icon={customIcon}
              key={index}
            >
              <Popup>
                <h2>{marker.popUp}</h2>
              </Popup>
            </Marker>
          ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

const CenterMap = ({ coords }: any) => {
  const map = useMap();
  map.setView(coords);
  return null;
};

export default LeafletMapComponent;
