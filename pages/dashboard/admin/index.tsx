import React, { useEffect, useState } from "react";

import { Spinner, Table } from "flowbite-react";
import { useAuthContext } from "@/context/AuthContext";
const DeckMap = dynamic(() => import("@/components/Map/DeckMap"), {
  ssr: false,
});
import dynamic from "next/dynamic";
import { useStore } from "@/store/store";
import Modal from "@/components/Modal";
import toast from "react-hot-toast";

const Sidebar = dynamic(() => import("@/components/Sidebar"), {
  ssr: false,
});
type Couriers = {
  email: string;
  id: number;
  name: string;
  password: string;
  teamid: number;
  type: string;
  userid: string;
};
type Team = {
  adminid: string;
  couriers: [Couriers];
  teamname: string;
};

export default function Admin() {
  const { team, user, socket } = useStore((store) => store);
  const { joinRoom, updateTripPath } = useStore((store) => store.actions);

  const actions = useStore((store) => store.actions);

  useEffect(() => {
    if (user != undefined) {
      actions.getTeam(user.teamID);

      joinRoom(user.teamID);
      socket
        .on("connect", () => {
          toast.success("You are now connected to all your couriers");
        })
        .on("disconnect", () => {
          toast.error("You are now disconnected from all your couriers");
        })
        .on("listen_notification", (data) => {
          toast(data.message, {
            icon: "🚚",
          });
        })
        .on("listen_position", (data) => {
          updateTripPath(data);
        });
    }
  }, [user]);

  return team != undefined ? (
    <div className="w-full h-full overflow-hidden">
      <div className="absolute z-50 ">
        <Sidebar />
      </div>
      <div className="absolute z-50  right-0">
        <Modal />
      </div>
      <DeckMap trips={team.trips} type="admin" coords={null} />
    </div>
  ) : (
    <Spinner />
  );
}
