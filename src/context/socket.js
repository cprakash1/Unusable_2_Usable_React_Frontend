import io from "socket.io-client";

// Create a socket instance and configure it with your server URL
// const socket = io(process.env.REACT_APP_BASE_URL); // Replace with your server's URL
const socket = io("https://unusable-2-usable-react-backend.onrender.com"); // Replace with your server's URL

export default socket;
