import {useState} from "react"
import './App.css';
import Chat from "./Chat"
import io from "socket.io-client";
const socket=io.connect("http://localhost:3001");
function App() {
  const[username,setUsername]=useState("");
  const[room,setRoom]=useState("");
  const[showChat,setShowChat]=useState("");
  const joinRoom=()=>{
    if(username!==""&& room!==""){
      socket.emit("join_room",room);
      setShowChat(true);

    }
  }
  return (
    <div className="App">
      {!showChat ? (
      <div className="joinChatContainer">
      <h3>Join A chat</h3>
      <input type="text" placeholder="John.." onChange={(event)=>{setUsername(event.target.value)}}/>
      <input type="text" placeholder="Room id.." onChange={(event)=>{setRoom(event.target.value)}}/>
      <button onClick={joinRoom}>Join A room</button>
      </div>
      ):(
      <Chat socket={socket} username={username} room={room}/>
      )}
    
    </div>
  );
}

export default App;
