import React, { createContext, useEffect } from "react";
import io from "socket.io-client";

const SOCKET_URL = "http://localhost:4000";
export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = io(SOCKET_URL); // Initialize socket connection

  useEffect(() => {
    // Clean up socket on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
