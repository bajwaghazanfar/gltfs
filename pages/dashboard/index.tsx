import React, { useEffect, useState } from "react";

import { Layout } from "@/components/Dashboard/Layout";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useAuthContext } from "@/context/AuthContext";
import { getGeoLocation } from "@/hooks/GeoLocation/getGeoLocation";
import { useStore } from "@/store/store";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { data } from "../../../response";
import { data2 } from "../../../response2";

export default function Dashboard() {
  const router = useRouter();

  const { showErr } = router.query;

  const { position, error } = getGeoLocation();
  const { sendNotification, broadcastData } = useStore(
    (store) => store.actions
  );
  const user = useStore((store) => store.user);

  useEffect(() => {
    if (showErr != undefined) {
      toast.error(`${showErr}`);
    }
  }, [router.query]);
  console.log(user);
  useEffect(() => {
    if (user != undefined) {
      sendNotification(
        `${user.name} has started tracking thier position! `,
        user.teamID
      );
    }
  }, [user]);
  // useEffect(() => {
  //   if (error === undefined && position != undefined) {
  //     const coords = [position.coords.longitude, position.coords.latitude];
  //     broadcastData(coords, user);
  //   }
  // }, [position, error]);

  useEffect(() => {
    if (user != undefined) {
      const coords = data.routes[0].geometry.coordinates;
      const array = coords;

      var index = 0;
      var interval = setInterval(function () {
        const element = array[index++];
        broadcastData(element, user);
        if (index == array.length) {
          clearInterval(interval);
        }
      }, 5000);
    }
  }, [user]);
  return (
    <div className="w-full h-screen flex justify-center items-center ">
      {error != null
        ? "You have denied access, you must enable access in your browser settings to track your position"
        : "You are tracking your position"}
      {/* <button
        className="w-full h-auto p-6 bg-sky-950 text-white flex flex-col gap-5 justify-center items-center rounded-xl shadow-2xl md:w-[300px]"
      
      >
        <FaLocationCrosshairs className="text-6xl " />
        <p className="font-extrabold text-xl">
         
        </p>
      </button> */}
    </div>
  );
}
