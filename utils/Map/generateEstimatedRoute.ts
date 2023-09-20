import { PolyTruck } from "@/constants/PolyTruck";
import { useStore } from "@/store/store";
import { Route } from "@/types/mapbox";
import { Trip } from "@/types/user";
import { TripsLayer } from "@deck.gl/geo-layers/typed";
import { IconLayer } from "@deck.gl/layers/typed";
import { ScenegraphLayer } from "@deck.gl/mesh-layers/typed";

type Props = {
  routes: [Route];
  layerID: string;
};
export const generateEstimatedRoute = (routes: Props) => {
  const data = routes;

  const layer = new TripsLayer({
    id: "estimated_route",
    data: routes,
    getPath: (d) => d.geometry.coordinates.map((p) => p),
    // getTimestamps: (d) => d.timestamps,
    getColor: [197, 218, 251],
    opacity: 1,
    widthMinPixels: 8,
    capRounded: true,
    trailLength: 200,
    currentTime: 100,
    pickable: true,
    visible: true,
  });

  return layer;
};
