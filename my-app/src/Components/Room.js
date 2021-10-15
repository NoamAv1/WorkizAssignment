import React from "react";
import "./Room.css";

const Room = (props) => {
  const { onRoomClick, id, getRoom } = props;

//   const fetchNewMessages = () => {
//     fetch('http://localhost:3001/api/ping_message', {
//         body: {
//             room_id: id
//         }
//     })
//     .then((res) => res.json())
//   }

//   React.useEffect(() => {
//     let timer = setTimeout(() => fetchNewMessages(), 5000);
//     // getRoom(id);
//     return () => {
//       clearTimeout(timer);
//     };
//   });

  return <div className={'room'} onClick={() => onRoomClick(id)}>{id}</div>;
};

export default Room;
