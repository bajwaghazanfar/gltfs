import React, { useEffect, useState } from "react";

import { Layout } from "@/components/Dashboard/Layout";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useAuthContext } from "@/context/AuthContext";
import { getGeoLocation } from "@/hooks/GeoLocation/getGeoLocation";
import { useStore } from "@/store/store";
import { FaLocationCrosshairs } from "react-icons/fa6";

const a = [
  {
    waypoints: [
      {
        coords: [-1.8607955793858177, 52.454110192240336],
        timestamp: 0,
      },
      {
        coords: [-1.8603557455112378, 52.45342367784741],
        timestamp: 5000,
      },

      {
        coords: [-1.8583221573540762, 52.45408335622949],
        timestamp: 10000,
      },
      {
        coords: [-1.8583493975153431, 52.454070881118795],
        timestamp: 15000,
      },
      {
        coords: [-1.858059608878418, 52.45492736419688],
        timestamp: 20000,
      },
      {
        coords: [-1.8559676234813156, 52.4537634592201],
        timestamp: 25000,
      },
      {
        coords: [-1.85399349817692, 52.45292020290499],
        timestamp: 30000,
      },
      {
        coords: [-1.8532103781055966, 52.45210288590763],
        timestamp: 35000,
      },
      {
        coords: [-1.8471385374123424, 52.44926481870231],
        timestamp: 40000,
      },
    ],
  },
];
export default function Dashboard() {
  const router = useRouter();
  const [navigate, setNavigate] = useState<boolean>(false);
  const { showErr } = router.query;
  const { position, error } = getGeoLocation();
  const { user } = useAuthContext();
  const actions = useStore((store) => store.actions);
  useEffect(() => {
    if (showErr != undefined) {
      toast.error(`${showErr}`);
    }
  }, [router.query]);

  useEffect(() => {
    if (user != undefined) {
      actions.sendNotification(`${user.name} has joined the room`, user.teamID);

      // socket.emit(`join_room`, user.teamID);
      // setInterval(() => {
    }
  }, [user]);

  useEffect(() => {
    if (navigate) {
      const array = a[0].waypoints;

      var index = 0;
      var interval = setInterval(function () {
        const element = array[index++];
        actions.broadcastData(element, user);
        if (index == array.length) {
          clearInterval(interval);
        }
      }, 10000);

      // setInterval(() => {
      //   actions.broadcastData(position, user);
      // }, 5000);
    }
  }, [navigate]);
  return (
    <Layout>
      <div className="w-full h-screen flex justify-center items-center ">
        <button
          className="w-full h-auto p-6 bg-sky-950 text-white flex flex-col gap-5 justify-center items-center rounded-xl shadow-2xl md:w-[300px]"
          onClick={() => {
            setNavigate(!navigate);
          }}
        >
          <FaLocationCrosshairs className="text-6xl " />
          <p className="font-extrabold text-xl">
            {navigate ? "Stop Navigating" : "Start Navigating"}
          </p>
        </button>
      </div>
    </Layout>
  );
}
