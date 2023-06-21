import { createContext } from "react";
import socketIo from "socket.io-client"

const socket = socketIo('http://localhost:8000')

const SocketContext = createContext(socket)

const SocketProvider = ({children}) => {
  return (
    <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
  )
}

export {SocketContext, SocketProvider}