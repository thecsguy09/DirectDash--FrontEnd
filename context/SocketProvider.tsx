"use client";
import { nanoid } from "nanoid";
import React, { createContext, useContext, useMemo, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext<any>({});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = useMemo(() => {
    return io(String(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL));
  }, []);
  const [peerState, setpeerState] = useState<any>();
  const userId = useMemo(() => nanoid(10), []);

  return (
    <SocketContext.Provider value={{ socket, userId, peerState, setpeerState }}>
      {children}
    </SocketContext.Provider>
  );
};