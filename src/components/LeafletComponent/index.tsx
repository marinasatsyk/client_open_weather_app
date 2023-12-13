import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { UseAppSelector, UseBookmarks } from "utils/hook";
import "./index.scss";
import { createRef, useEffect, useState } from "react";

const { REACT_APP_STUDENT_API_key } = process.env;

const attributionMap = `http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?&opacity=0.6&fill_bound=true&appid=${REACT_APP_STUDENT_API_key}`;

interface IRadar {
  lat: number;
  lon: number;
}
const LeafletMapComponent = (props: IRadar) => {
  const { bookmarks } = UseAppSelector((state) => state.auth.user);
  // const bookmarks = UseBookmarks();
  const [activeBookmarkLocalState, setIsActiveBookmarkLocalState] = useState(
    {}
  );
  // const activeBookmark = bookmarks.find(bookmark => bookmark.isActive);
  // console.log("****************************", activeBookmark)

  // if(activeBookmark){
  //   setIsActiveBookmarkLocalState(activeBookmark)
  // }

  const getActiveBookmark = () => {
    console.log("useBookmarks", bookmarks);
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

  console.log("❗❗❗❗❗❗❗❗❗❗❗", activeBookmark);

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

  // const createCustomClusterIcon = (cluster) => {
  //    return new  divIcon({
  //     html: `<div class = "cluster-icon">${cluster.getChildCount()}</div>`,
  //     className: "custom-marker-cluster"
  //     iconSize: point(33, 33, true)
  //    });
  // }

  // useEffect(() => {

  // }, [activeBookmarkLocalState])

  console.log("lat long leaflet================>>>>>>>>>>>>>", markers);
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
