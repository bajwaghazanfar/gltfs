import { create } from "zustand";
import { combine } from "zustand/middleware";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import { Courier, InitialState, Team, User } from "@/types/user";
import axios from "axios";
import DeckGL, { FlyToInterpolator } from "@deck.gl/core/typed";
import { produce } from "immer";

const initialState: InitialState = {
  socket: io("localhost:8080"),
  team: null,
  activeUsers: 0,
  ready: false,
  positions: [],
  activeTab: "",
  user: null,
  viewState: {
    longitude: -1.8607920255706445,
    latitude: 52.45411656838058,
    zoom: 13,
    pitch: 0,
    bearing: 0,
    transitionDuration: 8000,
    transitionInterpolator: null,
  },
  modal: {
    active: false,
    duration: 0,
    distance: 0,
  },
  layers: [],
  hiddenLayers: [],
  mapHover: {
    layerID: "",
    active: false,
    data: null,
  },
};

const mutations = (setState: any, getState: any) => {
  // socket
  //   .on("connect", () => {
  //     setState({ ready: true });
  //     toast.success("You are now connected to all your couriers");
  //   })
  //   .on("disconnect", () => {
  //     setState({ ready: false });
  //     toast.error("You are now disconnected from all your couriers");
  //   })
  //   .on("listen_notification", (data) => {
  //     toast(data.message, {
  //       icon: "🚚",
  //     });
  //   });

  return {
    actions: {
      //Socket Actions
      joinRoom(room: number) {
        initialState.socket.emit(`join_room`, room);
      },
      updateTripPath(data: any) {
        setState(
          produce((state: InitialState) => {
            const trip = state.team?.trips.find(
              (el) => el.trip_id == data.trip
            );
            trip.active = true;
            trip?.paths.push({ coordinates: data.coordinates });
          })
        );
      },
      //End Socket Actions
      resetModal() {
        setState(
          produce((state: InitialState) => {
            (state.modal.active = false),
              (state.modal.distance = 0),
              (state.modal.duration = 0);
          })
        );
      },
      updateModal(active: boolean, distance: number, duration: number) {
        setState(
          produce((state: InitialState) => {
            (state.modal.active = active),
              (state.modal.distance = distance),
              (state.modal.duration = duration);
          })
        );
      },
      addNewLayer(layer: any) {
        setState(
          produce((state: InitialState) => {
            const objWithIdIndex = state.layers.findIndex(
              (obj) => obj.id === layer.id
            );
            if (objWithIdIndex > -1) {
              state.layers.splice(objWithIdIndex, 1);
              state.layers.push(layer);
            } else {
              state.layers.push(layer);
            }
          })
        );
      },
      removeLayer(id: string) {
        setState(
          produce((state: InitialState) => {
            const index = state.layers.map((e) => e.id).indexOf(id);
            if (index === 0) {
              state.layers.splice(index, 1);
            }
          })
        );
      },
      hideAllLayers() {
        setState(
          produce((state: InitialState) => {
            state.hiddenLayers = state.layers;
            state.layers = [];
          })
        );
      },
      showAllLayers() {
        setState(
          produce((state: InitialState) => {
            state.hiddenLayers.map((map) => {
              state.layers.push(map);
            });
            state.hiddenLayers = [];
          })
        );
      },
      addNewCourier(courier: Courier) {
        setState(
          produce((state: InitialState) => {
            state.team.couriers.push(courier);
          })
        );
      },
      snapToTrip(
        longitude: number,
        latitude: number,
        pitch: number,
        zoom: number
      ) {
        setState(
          produce((state: InitialState) => {
            state.viewState = {
              ...state.viewState,
              longitude,
              latitude,
              pitch,
              zoom,
              transitionDuration: 5000,
              transitionInterpolator: new FlyToInterpolator(),
            };
          })
        );
      },
      loginUser: async () => {
        try {
          const apiResponse = await axios.get("/api/checkAuth", {
            withCredentials: true,
          });

          if (apiResponse.data.success) {
            setState(
              produce((state: InitialState) => {
                state.user = apiResponse.data.user;
                // state.activeTab = `${data.coordinates}`;
              })
            );
          } else {
            setState(
              produce((state: InitialState) => {
                state.user = null;
                // state.activeTab = `${data.coordinates}`;
              })
            );
          }
        } catch (error) {
          console.log(error);
        }
        // if (token != undefined) {
        //   const decoded: User = jwt_decode(token);
        //   setState(
        //     produce((state: InitialState) => {
        //       state.user = decoded;
        //       // state.activeTab = `${data.coordinates}`;
        //     })
        //   );
        // } else {
        //   setState(
        //     produce((state: InitialState) => {
        //       state.user = null;
        //       // state.activeTab = `${data.coordinates}`;
        //     })
        //   );
        // }
      },

      getTeam: async (id: number) => {
        try {
          const response = await axios.post(
            "http://localhost:8080/dashboard/get-team",
            { id: id },
            { withCredentials: true }
          );

          setState({
            team: response.data.data,
          });
        } catch (error) {
          console.error(error);
        }
      },
      sendNotification(message: string, room: number | string) {
        initialState.socket.emit(`send_notification`, {
          message,
          room,
        });
      },
      broadcastData(position: any, user: User | null) {
        initialState.socket.emit(`stream_position`, {
          coordinates: position,

          user: {
            name: user?.name,
            type: user?.type,
            uuid: user?.uuid,
          },
          room: user?.teamID,
          trip: user?.trips,
        });
      },
    },
  };
};

//We created our first store!
export const useStore = create(combine(initialState, mutations));
