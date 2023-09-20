import { Socket } from "socket.io-client";

export type User = {
  uuid: string;
  name: string;
  type: string;
  teamID: number;
  trips: string;
};

export type Courier = {
  email: string;
  id: number;
  name: string;
  teamid: number;
  trips: string | null;
  type: string;
  userid: string;
};
export type Trip = {
  asignee: string;
  end_coordinate: [number, number];
  start_coordinate: [number, number];
  end_name: string;
  id: number;
  start_name: string;
  trip_id: string;
  tripname: string;
  vehicle: string;
  paths: any;
  active: boolean;
};
export type Team = {
  adminid: string;
  couriers: [Courier] | [];
  id: number;
  trips: [Trip];
};

export type ViewState = {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
  transitionDuration: number | null;
  transitionInterpolator: any;
};
export type InitialState = {
  socket: Socket;
  team: Team | null;
  activeUsers: number;
  ready: boolean;
  positions: [];
  activeTab: string;
  user: User | null;
  viewState: ViewState;
  layers: any;
  hiddenLayers: [];
  modal: {
    duration: number;
    distance: number;
    active: boolean;
  };
  mapHover: {
    layerID: string;
    active: boolean;
    data: any;
  };
};
