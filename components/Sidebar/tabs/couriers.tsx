import { useStore } from "@/store/store";
import {
  ArrowLeftIcon,
  FlagIcon,
  MapPinIcon,
  QueueListIcon,
  TruckIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const Couriers: React.FC<Props> = ({ open, setOpen }) => {
  const couriers = useStore((store) => store.team.couriers);

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
                  className="w-auto bg-white outline-none p-3 rounded-lg shadow-2xl"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <ArrowLeftIcon className="h-6 w-6 text-slate-800 " />
                </button>
              </div>

              <div className="w-full h-[90%] bg-white flex flex-col justify-start items-start rounded-m shadow-2xl overflow-y-auto">
                {couriers != null && couriers.length > 0
                  ? couriers.map((map) => (
                      <div className="w-full h-[200px]  flex flex-col border-solid border-slate-300 border-b-2 hover:bg-slate-100 transition-all ease-in-out cursor-pointer ">
                        <div className="w-full h-fit flex items-center justify-start gap-5 p-2">
                          <UserCircleIcon className=" w-8 h-8 text-slate-800" />
                          <p className="font-medium text-slate-500  ">
                            {map.name}
                          </p>
                        </div>
                        <div className="w-full -fit flex items-center justify-start gap-5 p-2">
                          <FlagIcon className=" w-8 h-8 text-slate-800" />
                          <p className="font-medium text-slate-500  ">
                            {map.trips === null
                              ? "No Trip Assigned"
                              : map.trips}
                          </p>
                        </div>
                        <div className="w-full -fit flex items-center justify-start gap-5 p-2">
                          <QueueListIcon className=" w-8 h-8 text-slate-800" />
                          <p className="font-medium text-slate-500  ">
                            {map.type}
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
