import React from 'react';
import './Message.css';

const Message = (props) => {
const { fromName, fromNumber, receivedAt, body, direction} = props;

    return (
        <div className={direction === 'incoming' ?  'message-in' : 'message-out'}>
            <div>{`${fromName} ${Date(receivedAt)}`}</div>
            <div>{body}</div>
        </div>
    );
}

export default Message;