import React from 'react';

const Room = (props) => {
    const {onRoomClick, roomtId } = props;
    return (
        <div onClick={() => onRoomClick(roomtId)}>
            {roomtId}
        </div>
    );
}

export default Room;