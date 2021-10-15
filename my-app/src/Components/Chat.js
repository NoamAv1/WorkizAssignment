import React from "react";
import Room from "./Room";
import Message from "./Message";
import './Chat.css';


const Chat = () => {
  // const rooms = React.useMemo(() => getRooms(), [rooms !== getRooms()]);
  const [rooms, setRooms] = React.useState([]);

  const [seletctedRoom, setSelectedRoom] = React.useState({});
  const [selectedRoomId, setSelectedRoomId] = React.useState(-1);

  const getRooms = () => {
    fetch("http://localhost:3001/api/get_chat_rooms")
      .then((res) => res.json())
      .then((res) => {
        setRooms(res.chat_rooms);
        setSelectedRoomId(res.chat_rooms[0]);
      });
  };

  const getRoom = (roomdId) => {
    if (roomdId !== -1) {
      fetch(`http://localhost:3001/api/get_chat/${roomdId}`)
        .then((res) => res.json())
        .then((res) => {
          setSelectedRoom(res);
        });
    }
  };

  React.useEffect(() => {
    getRooms();
  }, []);

  React.useEffect(() => {
    const room = getRoom(selectedRoomId);
    setSelectedRoom(room);
  }, [selectedRoomId]);

  return (
    <div className={"chat-container"}>
      <div>
        {rooms.map((room) => (
          <Room id={room} onRoomClick={setSelectedRoomId} getRoom={getRoom} />
        ))}
      </div>
      <div>
        {seletctedRoom?.body?.map((rm) => (
          <Message {...rm} fromName={seletctedRoom.fromName} />
        ))}
      </div>
    </div>
  );
};

export default Chat;
