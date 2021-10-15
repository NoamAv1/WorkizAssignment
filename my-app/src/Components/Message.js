import React from 'react';

const Message = (props) => {
const { fromName, fromNumber, receivedAt, body, direction} = props;

    return (
        <div className={direction === 'incoming' ?  'message incoming' : 'message outgoing'}>
            <div>{`${fromName} ${receivedAt}`}</div>
            <div>{body}</div>
        </div>
    );
}

export default Message;