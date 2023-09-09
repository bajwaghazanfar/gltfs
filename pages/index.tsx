import React from "react";
import dynamic from "next/dynamic";
import * as style from "../styles/Home/Home.module.scss";
import { useWebSocket } from "@/hooks/Websocket/useWebsocket";

const socket = useWebSocket("localhost:8080");

export default function Home() {
  return <div className="w-full h-full  "></div>;
}
