import { useWebSocket } from "@/hooks/Websocket/useWebsocket";
import dynamic from "next/dynamic";
import React from "react";
import { Navigation } from "./layout/navigation";

const DeckMap = dynamic(() => import("./Map/DeckMap"), {
  ssr: false,
});

export const Layout: React.FC = ({ children }) => {
  const socket = useWebSocket("localhost:8080");
  return (
    <div className="w-full h-full p-10 flex gap-3 flex-col">
      <Navigation />
      {children}
    </div>
  );
};
