import { useEffect, useState } from "react";
import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";
import L from "leaflet";

import airplaneIcon from "./soldier.png";
import { Polyline } from "react-leaflet";

const icon = L.icon({
  iconSize: [60, 50],
  popupAnchor: [20, 0],
  iconUrl: airplaneIcon,
});

export default function AirplaneMarker({ data }) {
  const { lat, lng } = data;
  const [prevPos, setPrevPos] = useState([lat, lng]);

  useEffect(() => {
    if (prevPos[1] !== lng && prevPos[0] !== lat) setPrevPos([lat, lng]);
  }, [lat, lng, prevPos]);

  return (
    <>
      {lat && lng && (
        <>
          <LeafletTrackingMarker
            icon={icon}
            position={[lat, lng]}
            previousPosition={prevPos}
            duration={10}
          />
        </>
      )}
    </>
  );
}
