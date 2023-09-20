import { useStore } from "@/store/store";
import { convertMetersToMiles } from "@/utils/Map/convertMetersToMiles";
import { convertSecondsToTime } from "@/utils/Map/convertSecondsToTime";
import { TruckIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function Modal() {
  const { modal } = useStore((store) => store);

  console.log(modal);
  return (
    <AnimatePresence>
      {modal.active && (
        <motion.div
          initial={{ left: "-200px", opacity: 0 }}
          animate={{ left: "0px", opacity: 1 }}
          exit={{ left: "30px", opacity: 0 }}
          className="w-[fit-content] h-auto flex flex-col justify-start items-start  shadow-2xl p-3"
        >
          <div className="w-auto h-full bg-white rounded-xl p-5">
            <div className="w-full h-auto flex justify-between items-center">
              <div className="p-3 bg-white flex justify-start items-start w-auto">
                <TruckIcon className="w-5 h-5 text-slate-900" />
              </div>
              <div className="w-full h-auto flex justify-start items-start flex-col   ">
                <p className="text-slate-900 font-bold">
                  {convertSecondsToTime(modal.duration)}
                </p>
                <p className="text-slate-900 font-normal">
                  {convertMetersToMiles(modal.distance)} miles
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
