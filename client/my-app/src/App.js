import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };
  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      // alert(data.message);
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
      <input
        placeholder="room num. "
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      ></input>
      <input
        placeholder="message.."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      ></input>
      <button onClick={sendMessage}>send message</button>
      <h1>Message: </h1>
      {messageReceived}
    </div>
  );
}

export default App;
