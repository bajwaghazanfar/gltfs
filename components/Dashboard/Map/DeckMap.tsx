/// app.js
import React, { useEffect, useState } from "react";
import DeckGL from "@deck.gl/react/typed";
import { TripsLayer } from "@deck.gl/geo-layers/typed";
import { ScenegraphLayer } from "@deck.gl/mesh-layers/typed";
import { Map } from "react-map-gl";
import { COORDINATE_SYSTEM } from "@deck.gl/core/typed";
import { getGeoLocation } from "@/hooks/GeoLocation/getGeoLocation";
import { MAPBOX_ACCESS_TOKEN } from "@/constants/MapBoxAccessToken";
import * as style from "../../styles/Map/Map.module.scss";
import { PolyTruck } from "@/constants/PolyTruck";

import { useWebSocket } from "@/hooks/Websocket/useWebsocket";
// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -1.8607920255706445,
  latitude: 52.45411656838058,
  zoom: 13,
  pitch: 0,
  bearing: 0,
};
type Coordinate = {
  x: number;
  y: number;
};
type Position = {
  coordinates: [Coordinate];
  timestamp: number;
};
type Props = {
  data: any;
};

export default function DeckMap({ data }: Props) {
  // console.log([{ waypoints: data }], "DECKMAP");?
  // const { error, position } = getGeoLocation();

  const [latestUpdate, setLatestUpdate] = useState<Position[]>();
  // ⛔️ Argument of type '(prevEmployees: Employee[]) => (string | Employee)[]' is not assignable to parameter of type 'SetStateAction<Employee[]>'.

  const layers = [
    new TripsLayer({
      id: "trips-layer",
      data: [{ waypoints: data }],
      getPath: (d) => d.waypoints.map((p: any) => p.coordinates),
      // deduct start timestamp from each data point to avoid overflow
      getTimestamps: (d) => d.timestamp,
      getColor: [253, 128, 93],
      opacity: 0.8,
      widthMinPixels: 5,
      rounded: true,
      fadeTrail: true,
      trailLength: 200,
      currentTime: 100,
    }),
    new ScenegraphLayer({
      id: "scenegraph-layer",
      data: [data[data.length - 1]],
      pickable: true,
      scenegraph: "/public/Pointer.gltf",

      getPosition: (d) => d.coordinates,

      getOrientation: (d) => [0, 100, 90],
      _animations: {
        "*": { speed: 5 },
      },
      sizeScale: 4,
      _lighting: "pbr",
    }),
  ];
  console.log(data[data.length - 1]);
  return (
    <div className="w-full h-screen flex justify-center items-center relative bg-neutral-900 ">
      <div className="w-full h-full relative shadow-xl ">
        <DeckGL
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
          layers={layers}
          style={{ borderRadius: "10px" }}
        >
          <Map
            mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: -100,
              latitude: 40,
              zoom: 3.5,
            }}
            mapStyle="mapbox://styles/bajwaghazanfar/ckb3w6zif0zi11ikln1ck0vi5"
          />
        </DeckGL>
      </div>
    </div>
  );
}
