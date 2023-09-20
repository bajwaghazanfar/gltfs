/// app.js
import React, { useEffect, useRef, useState } from "react";
import DeckGL from "@deck.gl/react/typed";

import { Map } from "react-map-gl";
import { MAPBOX_ACCESS_TOKEN } from "@/constants/MapBoxAccessToken";

import { ArrowsRightLeftIcon, TruckIcon } from "@heroicons/react/24/solid";
import { calculateSpeed } from "@/utils/Map/calculateSpeed";
import { Trip } from "@/types/user";
import { useStore } from "@/store/store";
import { generateLineLayer } from "@/utils/Map/generateLineLayer";
import { generateSceneGraphLayer } from "@/utils/Map/generateSceneGraphLayer";
import { AnimatePresence, motion } from "framer-motion";
import { generateMarker } from "@/utils/Map/generateIconLayer";
type Coords = {
  longitude: number;
  latitude: number;
};
type Props = {
  trips: [Trip] | null;
  type: string;
  coords: Coords | null;
};

export default function DeckMap({ trips, type, coords }: Props) {
  const { viewState, layers } = useStore((store) => store);
  const { addNewLayer } = useStore((store) => store.actions);
  const [hoverInfo, setHoverInfo] = useState(null);
  const deckRef = useRef(null);

  const onHover = (event) => {
    setHoverInfo(event);
  };

  useEffect(() => {
    if (type === "admin") {
      const lineLayer = generateLineLayer(trips);
      const scenegraphLayer = generateSceneGraphLayer(trips);
      addNewLayer(lineLayer);
      addNewLayer(scenegraphLayer);
    }
  }, [trips]);

  useEffect(() => {
    if ((type === "courier" && coords != null) || coords != undefined) {
      const iconLayer = generateMarker(
        coords?.longitude,
        coords?.latitude,
        "courier_pos"
      );

      addNewLayer(iconLayer);
    }
  }, [trips]);

  return (
    <div className="w-full h-screen flex justify-center items-center relative bg-neutral-900 ">
      <div className="w-full h-full relative shadow-xl ">
        <DeckGL
          initialViewState={viewState}
          controller={true}
          layers={layers}
          useDevicePixels={false}
          ref={deckRef}
          onHover={onHover}
        >
          <Map
            mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox://styles/bajwaghazanfar/clmc4bgto019m01pb32c88kf6"
          />
          <AnimatePresence>
            {hoverInfo != null &&
              hoverInfo.object &&
              hoverInfo.layer.id === "scenegraph_layer_truck" && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ ease: "easeOut", duration: 0.1 }}
                  style={{
                    position: "absolute",
                    zIndex: 1,
                    pointerEvents: "none",
                    left: hoverInfo.x,
                    top: hoverInfo.y,
                  }}
                >
                  <div className="w-[300px] h-auto bg-white rounded-sm shadow-2xl flex flex-col p-3">
                    <div className="w-full h-auto flex justify-start items-center gap-3">
                      <img
                        src="https://seeklogo.com/images/C/cat-machinery-logo-0D2946DA1A-seeklogo.com.png"
                        className="w-[30px] h-auto object-cover"
                      />
                      <p className="font-medium text-slate-500 text-center text-sm">
                        #9867582
                      </p>
                      <TruckIcon className="w-[30px] h-auto text-slate-600" />
                    </div>

                    <div className="w-full h-auto flex justify-between items-center">
                      <div className="w-auto h-auto flex flex-col justify-start items-start">
                        <p className="text-slate-600 tracking-widest font-bold text-xs">
                          FROM
                        </p>
                        <h3 className="text-slate-600 tracking-widest font-bold text-m">
                          {hoverInfo.object.start_name}
                        </h3>
                        <p className="text-slate-600  font-bold text-xs">
                          11/09/2023 16:19
                        </p>
                      </div>
                      <div className="w-full h-auto flex justify-center items-center">
                        <ArrowsRightLeftIcon className="text-slate-800 w-6 h-6" />
                      </div>
                      <div className="w-auto h-auto flex flex-col justify-end items-end">
                        <p className="text-slate-600 tracking-widest font-bold text-xs text-right">
                          To
                        </p>
                        <h3 className="text-slate-600 tracking-widest font-bold text-m text-right">
                          {hoverInfo.object.end_name}
                        </h3>
                        <p className="text-slate-600  font-bold text-xs text-right">
                          12/09/2023 00:00
                        </p>
                      </div>
                    </div>
                    {/* <div className="w-full ">
                      <p className="text-slate-600  font-bold text-xs text-left">
                        {calculateSpeed(hoverInfo.object.paths)} mp/h
                      </p>
                    </div> */}
                  </div>
                </motion.div>
              )}
          </AnimatePresence>
        </DeckGL>
      </div>
    </div>
  );
}
