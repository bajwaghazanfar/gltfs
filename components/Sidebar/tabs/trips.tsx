import { useStore } from "@/store/store";
import { generateLineLayer } from "@/utils/Map/generateLineLayer";
import { generateSceneGraphLayer } from "@/utils/Map/generateSceneGraphLayer";
import {
  ArrowLeftIcon,
  FlagIcon,
  MapPinIcon,
  TruckIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const Trips: React.FC<Props> = ({ open, setOpen }) => {
  const { trips } = useStore((store) => store.team);
  const { snapToTrip, addNewLayer } = useStore((store) => store.actions);

  console.log(trips);
  return (
    <div>
      {/* Actions */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="w-[350px] h-screen flex flex-col justify-start items-start "
            initial={{ left: "-200px", opacity: 0 }}
            animate={{ left: "0px", opacity: 1 }}
            exit={{ left: "30px", opacity: 0 }}
          >
            <div className="w-full h-full p-5">
              <div className="w-full h-[100px] ">
                <button
                  className="w-auto bg-white outline-none p-3 rounded-lg shadow-2xl  "
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <ArrowLeftIcon className="h-6 w-6 text-slate-800 " />
                </button>
              </div>

              <div className="w-full h-[90%] bg-white flex flex-col justify-start items-start rounded-lg shadow-2xl p-1 overflow-y-auto ">
                {trips != null && trips.length > 0
                  ? trips.map((map) => (
                      <div
                        className="w-full h-[200px]  flex flex-col border-solid border-slate-300 border-b-2 hover:bg-slate-100 transition-all ease-in-out cursor-pointer "
                        onClick={() => {
                          snapToTrip(
                            map.paths[map.paths.length - 1].coordinates[0],
                            map.paths[map.paths.length - 1].coordinates[1],
                            10,
                            17
                          );
                        }}
                      >
                        <div className="w-full h-fit flex items-center justify-start gap-5 p-2">
                          <UserCircleIcon className=" w-8 h-8 text-slate-800" />
                          <p className="font-medium text-slate-500  ">
                            #{map.asignee}
                          </p>
                        </div>
                        <div className="w-full -fit flex items-center justify-start gap-5 p-2">
                          <FlagIcon className=" w-8 h-8 text-slate-800" />
                          <p className="font-medium text-slate-500  ">
                            {map.end_name}
                          </p>
                        </div>
                        <div className="w-full -fit flex items-center justify-start gap-5 p-2">
                          <TruckIcon className=" w-8 h-8 text-slate-800" />
                          <p className="font-medium text-slate-500  ">
                            {map.vehicle}
                          </p>
                        </div>
                        <div className="w-full h-fit flex items-end justify-end gap-5 p-2">
                          <div className="w-auto h-8 p-3 bg-green-400 flex items-center justify-center rounded-3xl">
                            <p className="font-bold text-slate-900 text-center">
                              ON TIME
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  : ""}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
