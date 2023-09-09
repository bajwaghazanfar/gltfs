import { useState, useEffect } from "react";
import { io } from "socket.io-client";

export const useWebSocket = (url: string) => {
  const socket = io(url);

  return socket;
};
