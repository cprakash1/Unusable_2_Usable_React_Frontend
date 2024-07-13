import io from "socket.io-client";

// Create a socket instance and configure it with your server URL
// const socket = io(process.env.REACT_APP_BASE_URL); // Replace with your server's URL
const socket = io("https://unusable-2-usable-react-backend.onrender.com", {
  reconnection: true, // Enable reconnection
  reconnectionAttempts: Infinity, // Number of attempts before giving up (Infinity for no limit)
  reconnectionDelay: 1000, // Time to wait between reconnection attempts (in ms)
  reconnectionDelayMax: 5000, // Maximum time to wait between attempts (in ms)
}); // Replace with your server's URL

export default socket;
