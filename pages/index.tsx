import React from "react";
import dynamic from "next/dynamic";
import * as style from "../styles/Home/Home.module.scss";
import { useWebSocket } from "@/hooks/Websocket/useWebsocket";
import { BsFillGearFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar/Navbar";
const socket = useWebSocket("localhost:8080");

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="w-full h-screen bg-landing bg-cover bg-no-repeat  flex flex-col justify-center items-center">
        <div className="w-full h-full flex justify-center items-start flex-col">
          <div className="w-full h-auto flex flex-col justify-center items-start xl:w-1/2 ">
            <div className="w-auto h-auto  flex-col flex gap-5 p-5  md:ml-[100px] xl:ml-[200px]">
              <h1 className="text-slate-300 text-3xl  md:text-6xl xl:text-8xl">
                Fleet Management Made Better
              </h1>
              <p className="text-slate-300 text-sm md:text-m xl:text-2xl">
                We provide the optimal solutions to manage your fleets and car
                maintanence for both individuals and corporate
              </p>
              <button className="w-fit pt-2 pl-7 pr-7 pb-2 bg-sky-500 text-white rounded-xl cursor-pointer">
                <p className="text-white font-bold text-m">Book Demo</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-auto flex flex-col justify-center items-center">
        <div className="w-full h-full pt-8 pb-8 pl-5 pr-5 flex flex-col justify-start items-center gap-5">
          <div className="w-full h-aut lg:w-[60%]  flex flex-col gap-5">
            <h1 className="font-bold text-2xl text-center lg:text-4xl">
              Leading the mobillity market in the United Kingdom
            </h1>
            <p className="font-medium text-center text-m text-slate-600">
              m ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse
            </p>
          </div>
          <div className="w-full h-auto flex flex-col gap-5 lg:grid grid-cols-2">
            <div className="w-full lg:w-full flex justify-end items-end  ">
              <img
                src="https://images.pexels.com/photos/8921708/pexels-photo-8921708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="w-full rounded-lg 2xl:w-[50%]"
              />
            </div>

            <div className="w-full h-auto flex flex-col gap-5 lg:w-1/2 justify-center items-start ">
              <div className="lg:w-3/5 gap-5 flex flex-col">
                <h1 className="font-medium text-3xl text-left text-sky-800">
                  Streamline your car rental business and boost productivity
                </h1>
                <p className="font-medium text-left text-m text-slate-600">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum."
                </p>
              </div>
              <div className="w-full h-auto flex justify-start items-start">
                <button className="w-fit pt-2 pl-7 pr-7 pb-2 bg-none  text-white rounded-xl cursor-pointer border-solid border-2 border-sky-500">
                  <p className="text-sky-500 font-bold text-m">Book Demo</p>
                </button>
              </div>
              {/* <div className="w-full h-auto flex ">
                <motion.div
                  initial={{ x: "0px" } as any}
                  animate={{ x: "100px" } as any}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-fit h-fit p-2 flex justify-between items-center gap-3 shadow-xl"
                >
                  <div className="p-2 w-fit h-fit bg-sky-100 rounded-lg">
                    <BsFillGearFill className="text-sky-500 text-3xl" />
                  </div>
                  <div>
                    <h3 className="text-sky-600 font-bold text-lg">
                      Analysis & Reports
                    </h3>
                    <p className="font-light text-left text-s text-slate-600">
                      Lorem ipsum dolor sit amet, consectetur consectet
                    </p>
                  </div>
                </motion.div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-auto flex flex-col justify-center items-cente bg-sky-950">
        <div className="w-full h-full pt-8 pb-8 pl-5 pr-5 flex flex-col justify-start items-center gap-5">
          <div className="w-full h-auto flex flex-col gap-5 lg:grid grid-cols-2">
            <div className="w-full h-auto flex flex-col gap-5 lg:w-full justify-center items-end">
              <div className="lg:w-1/2 gap-5 flex flex-col justify-end items-end ">
                <h1 className="font-medium text-3xl text-left text-white">
                  Streamline your car rental business and boost productivity
                </h1>
                <p className="font-medium text-left text-m text-white">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum."
                </p>
                <div className="w-full h-auto flex justify-start items-start">
                  <button className="w-fit pt-2 pl-7 pr-7 pb-2 bg-none  text-white rounded-xl cursor-pointer border-solid border-2 border-sky-500">
                    <p className="text-sky-500 font-bold text-m">Book Demo</p>
                  </button>
                </div>
              </div>

              {/* <div className="w-full h-auto flex ">
                <motion.div
                  initial={{ x: "0px" } as any}
                  animate={{ x: "100px" } as any}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-fit h-fit p-2 flex justify-between items-center gap-3 shadow-xl"
                >
                  <div className="p-2 w-fit h-fit bg-sky-100 rounded-lg">
                    <BsFillGearFill className="text-sky-500 text-3xl" />
                  </div>
                  <div>
                    <h3 className="text-sky-600 font-bold text-lg">
                      Analysis & Reports
                    </h3>
                    <p className="font-light text-left text-s text-slate-600">
                      Lorem ipsum dolor sit amet, consectetur consectet
                    </p>
                  </div>
                </motion.div>
              </div> */}
            </div>
            <div className="w-full lg:w-full flex justify-start items-start  ">
              <img
                src="https://images.pexels.com/photos/8921708/pexels-photo-8921708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="w-full rounded-lg 2xl:w-[50%]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
