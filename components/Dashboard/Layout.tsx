import { useWebSocket } from "@/hooks/Websocket/useWebsocket";
import dynamic from "next/dynamic";
import React from "react";
import { Navigation } from "./layout/navigation";
import { Sidebar } from "../Sidebar";

const DeckMap = dynamic(() => import("../Map/DeckMap"), {
  ssr: false,
});

export const Layout: React.FC = ({ children }) => {
  return (
    <div className="w-full h-full overflow-hidden">
      <div className="absolute z-50">
        <Sidebar />
      </div>
      <DeckMap />

      {/* <Navigation />
      <div className=" grid grid-cols-[400px_minmax(900px,_1fr)_100px]">
        <Sidebar />
        {children}
      </div> */}
    </div>
  );
};
