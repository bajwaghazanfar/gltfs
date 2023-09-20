import {
  ArrowLeftIcon,
  UserCircleIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Trips } from "./tabs/trips";
import { Couriers } from "./tabs/couriers";
import { CourierActions } from "./tabs/courier_actions";
import { TripActions } from "./tabs/trips_actions";
export default function Sidebar() {
  const [open, setOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("");

  const handleTabChange = () => {
    if (activeTab === "Trips") {
      return <Trips open={open} setOpen={setOpen} />;
    } else if (activeTab === "Couriers") {
      return <Couriers open={open} setOpen={setOpen} />;
    } else if (activeTab === "CourierActions") {
      return <CourierActions open={open} setOpen={setOpen} />;
    } else if (activeTab === "TripActions") {
      return <TripActions open={open} setOpen={setOpen} />;
    }
  };
  return (
    <div className="w-full h-screen  flex justify-between items-start gap-5  ">
      <div className="w-[fit-content] h-screen   bg-white flex flex-col justify-start items-start rounded-r-lg rounded-br-lg shadow-2xl">
        <div className="w-full h-full p-5">
          <div className="w-full h-[100px] ">
            <img
              src="https://1000logos.net/wp-content/uploads/2016/11/Caterpillar-Logo.png"
              className="w-full h-[100px] object-cover"
            />
          </div>

          <div className="w-ful h-full flex flex-col justify-start items-start gap-5">
            <h1 className="font-extrabold text-center text-slate-800">
              Fleet Actions
            </h1>
            <button
              className="group w-full h-100px bg-slate-200 p-3 rounded-lg hover:bg-black hover:shadow-2xl transition-all ease-in-out duration-200"
              onClick={() => {
                setOpen(!open);
                setActiveTab("Trips");
              }}
            >
              <p className="font-bold text-slate-500 group-hover:text-[#f4c211] text-left">
                All Trips
              </p>
            </button>

            <button
              className="group w-full h-100px bg-slate-200 p-3 rounded-lg hover:bg-black hover:shadow-2xl transition-all ease-in-out duration-200"
              onClick={() => {
                setOpen(!open);
                setActiveTab("Couriers");
              }}
            >
              <p className="font-bold text-slate-500 group-hover:text-[#f4c211] text-left">
                All Couriers
              </p>
            </button>

            <button
              className="group w-full h-100px bg-slate-200 p-3 rounded-lg hover:bg-black hover:shadow-2xl transition-all ease-in-out duration-200"
              onClick={() => {
                setOpen(!open);
                setActiveTab("TripActions");
              }}
            >
              <p className="font-bold text-slate-500 group-hover:text-[#f4c211] text-left">
                Trip Actions
              </p>
            </button>

            <button
              className="group w-full h-100px bg-slate-200 p-3 rounded-lg hover:bg-black hover:shadow-2xl transition-all ease-in-out duration-200"
              onClick={() => {
                setOpen(!open);
                setActiveTab("CourierActions");
              }}
            >
              <p className="font-bold text-slate-500 group-hover:text-[#f4c211] text-left">
                Courier Actions
              </p>
            </button>
          </div>
        </div>
      </div>

      {handleTabChange()}
    </div>
  );
}
