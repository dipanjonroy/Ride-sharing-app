import { createContext, useEffect } from "react";
import {io} from "socket.io-client";

export const socketContext = createContext();

const SocketProvider = ({ children }) => {
  const socket = io(`${import.meta.env.VITE_SERVER_URL}`);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket-server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server.");
    });
  }, []);

  return (
    <socketContext.Provider value={{ socket }}>
      {children}
    </socketContext.Provider>
  );
};

export default SocketProvider;
