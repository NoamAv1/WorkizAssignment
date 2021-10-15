import React from "react";
import Room from "./Room";
import Message from "./Message";

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
        console.log(res.chat_rooms[0] ,'res.chat_rooms[0]');
        setSelectedRoomId(res.chat_rooms[0]);
      });
  };

  const getRoom = (roomdId) => {
    console.log(roomdId, 'inget room ')
    if(roomdId !== -1 ){
        console.log('getRoom', roomdId);
        fetch(`http://localhost:3001/api/get_chat/${roomdId}`)
        .then((res) => {
            setSelectedRoom(res);
        });
    }
  };

  React.useEffect(() => {
    getRooms();
  }, []);


  React.useEffect(() => {
    console.log(selectedRoomId, "selectedRoomId");
    const room = getRoom(selectedRoomId);
    console.log(room, 'room' );
    setSelectedRoom(room);
    // console.log(getRoom(selectedRoomId, 'getRoom(selectedRoomId'));
  }, [selectedRoomId]);


  return (
    <div className={"chat-container"}>
      <div>
        {rooms?.forEach((room) => (
          <Room {...room} onRoomClick={setSelectedRoomId} />
        ))}
      </div>
      <div>
        {seletctedRoom?.body?.forEach((rm) => (
          <Message {...rm} fromName={seletctedRoom.fromName} />
        ))}
      </div>
    </div>
  );
};

export default Chat;
