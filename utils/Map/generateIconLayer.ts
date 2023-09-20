import { useStore } from "@/store/store";
import { IconLayer } from "@deck.gl/layers/typed";

type Props = {
  longitude: number;
  latitude: number;
};
export const generateMarker = (
  longitude: number,
  latitude: number,
  id: string
) => {
  const ICON_MAPPING = {
    marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
  };
  const data = [{ coordinates: [longitude, latitude] }];
  const layer = new IconLayer({
    id: `icon-layer_${id}`,
    data,
    pickable: true,
    // iconAtlas and iconMapping are required
    // getIcon: return a string
    iconAtlas:
      "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png",
    iconMapping: ICON_MAPPING,
    getIcon: (d) => "marker",

    sizeScale: 15,
    getPosition: (d) => d.coordinates,
    getSize: (d) => 5,
    getColor: (d) => [Math.sqrt(d.exits), 140, 0],
    visible: true,
  });
  return layer;
};
