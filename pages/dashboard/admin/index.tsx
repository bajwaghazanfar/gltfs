import React, { useEffect, useState } from "react";

import { Layout } from "@/components/Dashboard/Layout";
import { Card } from "@/components/Dashboard/layout/card";
import { BiSolidTruck } from "react-icons/bi";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { Spinner, Table } from "flowbite-react";
import { useWebSocket } from "@/hooks/Websocket/useWebsocket";
import axios from "axios";
import { useAuthContext } from "@/context/AuthContext";
const DeckMap = dynamic(() => import("@/components/Dashboard/Map/DeckMap"), {
  ssr: false,
});
import dynamic from "next/dynamic";
import { useStore } from "@/store/store";
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
  const { user } = useAuthContext();
  const team = useStore((store) => store.team);
  const activeUsers = useStore((store) => store.activeUsers);
  const positions = useStore((store) => store.positions);
  const actions = useStore((store) => store.actions);

  useEffect(() => {
    if (user != undefined) {
      actions.getTeam();
    }
  }, [user]);
  console.log(positions);
  return team != undefined ? (
    <Layout>
      <div className="w-full h-auto flex justify-between gap-5 flex-wrap items-center justify-center ">
        <Card
          bg="bg-red-900"
          number={2}
          title="Total Couriers"
          icon={<BiSolidTruck className="text-white text-4xl text-right " />}
        />
        <Card
          bg="bg-green-900"
          number={activeUsers}
          title="Active Couriers"
          icon={
            <HiOutlineStatusOnline className="text-white text-4xl text-right animate-ping" />
          }
        />
        <Card
          bg="bg-slate-900"
          number="2"
          title="Signing up"
          icon={<BiSolidTruck className="text-white text-4xl text-right " />}
        />
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 x ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Courier Name
              </th>
              <th scope="col" className="px-6 py-3">
                Courier Email
              </th>
              <th scope="col" className="px-6 py-3">
                Courier Type
              </th>
            </tr>
          </thead>
          <tbody>
            {team.couriers.map((map) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {map.name}
                </th>
                <td className="px-6 py-4">{map.email}</td>
                <td className="px-6 py-4">{map.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="w-full h-3/5">
          <DeckMap data={positions} />
        </div>
      </div>
    </Layout>
  ) : (
    <Spinner />
  );
}
