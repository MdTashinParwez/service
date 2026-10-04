// import { io } from "socket.io-client";

// const socket = io("http://localhost:8000", {
//     withCredentials: true,
//     autoConnect: false,
// });

// export default socket;
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const socket = io(SOCKET_URL, {
  withCredentials: true,
  autoConnect: false,
});

export default socket;