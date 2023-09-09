import { create } from "zustand";
import { combine } from "zustand/middleware";

import { io } from "socket.io-client";
import toast from "react-hot-toast";
import { User } from "@/types/user";
import axios from "axios";

type InitialState = {
  team: null;
  activeUsers: number;
  ready: boolean;
  positions: [];
};
const initialState: InitialState = {
  team: null,
  activeUsers: 0,
  ready: false,
  positions: [],
};

const mutations = (setState: any, getState: any) => {
  const socket = io("localhost:8080");

  // this is enough to connect all our server events
  // to our state managment system!
  socket
    .emit(`join_room`, 11)
    .on("connect", () => {
      setState({ ready: true });
      toast.success("You are now connected to all your couriers");
    })
    .on("disconnect", () => {
      setState({ ready: false });
      toast.error("You are now disconnected from all your couriers");
    })
    .on("listen_notification", (data) => {
      toast(data.message, {
        icon: "🚚",
      });
    })
    .on("listen_position", (data) => {
      setState((state: InitialState) => {
        const positions = [...state.positions, data]; // copy the array

        return { positions };
      }),
        //   setState({ positions: data.coords });
        toast(`${data.user.name} has started tracking thier position! `, {
          icon: "🧭",
        });
    });

  return {
    actions: {
      sendNotification(message: string, room: number | string) {
        socket.emit(`send_notification`, {
          message,
          room,
        });
      },
      getTeam: async () => {
        try {
          const response = await axios.post(
            "http://localhost:8080/dashboard/get-team",
            { id: 11 },
            { withCredentials: true }
          );
          setState({
            team: response.data.data,
            activeUsers: initialState.activeUsers + 1,
          });
        } catch (error) {
          console.error(error);
        }
      },
      broadcastData(
        // position: GeolocationPosition | null | undefined,
        position: any,
        user: User | null
      ) {
        console.log(position);
        socket.emit(`stream_position`, {
          //   coordinates: [position?.coords.longitude, position?.coords.latitude],
          //   timestamp: position?.timestamp,
          coordinates: [position.coords[0], position.coords[1]],

          user: {
            name: user?.name,
            type: user?.type,
            uuid: user?.uuid,
          },
          room: user?.teamID,
        });
      },
    },
  };
};

//We created our first store!
export const useStore = create(combine(initialState, mutations));
