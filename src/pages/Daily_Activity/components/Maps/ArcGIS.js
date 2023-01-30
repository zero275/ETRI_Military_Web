import React, { useRef } from "react";
import { WebMap, WebScene } from "@esri/react-arcgis";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import esriConfig from "@arcgis/core/config";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import TileLayer from "@arcgis/core/layers/TileLayer";
import { useEffect } from "react";

esriConfig.apiKey =
  "AAPKb5d65c3cf98f4f0189156a015c073acbH4vAGvJPI69E3jkNutCuZDgA3YylPic7Dq2qUM4W3aSQrI7l0c1RqLWxTTgZ6RnB";

const ArcGIS = ({ data }) => {
  const mapRef = useRef(null);
  useEffect(() => {
    const map = new Map({
      basemap: "hybrid",
    });

    new MapView({
      container: mapRef.current,
      map: map,
      center: [127.366367833333, 36.3818203333333],
      zoom: 16,
    });

    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    // const point = {
    //   //Create a point
    //   type: "point",
    //   longitude: 127.366367833333,
    //   latitude: 36.3818203333333,
    // };
    // const simpleMarkerSymbol = {
    //   type: "simple-marker",
    //   color: [226, 119, 40], // Orange
    //   outline: {
    //     color: [255, 255, 255], // White
    //     width: 0.5,
    //   },
    // };

    // const pointGraphic = new Graphic({
    //   geometry: point,
    //   symbol: simpleMarkerSymbol,
    // });
    // graphicsLayer.add(pointGraphic);

    const lines = [];

    data?.map((list) => {
      lines.push([list.lng, list.lat]);
    });

    const polyline = {
      type: "polyline",
      paths: [
        // [127.366367833333, 36.3818203333333], //Longitude, latitude
        // [127.366359833333, 36.3817968333333], //Longitude, latitude
        // [127.366371, 36.3817943333333], //Longitude, latitude
        lines,
      ],
    };
    const simpleLineSymbol = {
      type: "simple-line",
      color: [226, 119, 40], // Orange
      width: 3,
    };

    const polylineGraphic = new Graphic({
      geometry: polyline,
      symbol: simpleLineSymbol,
    });
    graphicsLayer.add(polylineGraphic);
  }, []);

  return (
    <div style={{ width: "100%", height: "300px" }} ref={mapRef}>
      {/* <Map /> */}
    </div>
  );
};

export default ArcGIS;
