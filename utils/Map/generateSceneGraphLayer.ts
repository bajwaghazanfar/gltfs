import { PolyTruck } from "@/constants/PolyTruck";

import { Trip } from "@/types/user";

import { ScenegraphLayer } from "@deck.gl/mesh-layers/typed";

type Props = {
  longitude: number;
  latitude: number;
};
export const generateSceneGraphLayer = (trip: [Trip]) => {
  const layer = new ScenegraphLayer({
    id: `scenegraph_layer_truck`,
    data: trip,
    pickable: true,
    scenegraph: PolyTruck,
    getPosition: (d) => d.paths[d.paths.length - 1].coordinates,
    visible: true,

    getOrientation: (d) => {
      const last_location = d.paths[d.paths.length - 1].coordinates;
      const lat1 = last_location[1];
      const lon1 = last_location[0];
      const lat2 = d.end_coordinate[1];
      const lon2 = d.end_coordinate[0];

      const deltaLon = lon2 - lon1;
      const angle = Math.atan2(
        Math.sin(deltaLon),
        Math.cos(lat1) * Math.tan(lat2) - Math.sin(lat1) * Math.cos(deltaLon)
      );

      const angleDegrees = angle * (180 / Math.PI);

      return [0, angleDegrees, 90];
    },
    _animations: {
      "*": { speed: 5 },
    },
    sizeScale: 9,
    _lighting: "pbr",
  });
  return layer;
};
